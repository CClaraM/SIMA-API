const { verifyToken } = require('../helpers/jwt');
const { User, Role } = require('../models');
const { errorResponse } = require('../helpers/response');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return errorResponse(res, 'Token no proporcionado', 401);
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return errorResponse(res, 'Formato de token inválido', 401);
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id_usuario) {
      return errorResponse(res, 'Token inválido: id_usuario no encontrado', 401);
    }

    const user = await User.findByPk(decoded.id_usuario, {
      attributes: ['id_usuario', 'email', 'estado', 'id_rol'],
      include: [
        {
          model: Role,
          as: 'rol',
          attributes: ['id_rol', 'nombre', 'descripcion'],
        },
      ],
    });

    if (!user) {
      return errorResponse(res, 'Usuario no encontrado', 401);
    }

    if (user.estado !== 'ACTIVO') {
      return errorResponse(res, 'Usuario sin acceso al sistema', 403);
    }

    req.user = {
      id_usuario: user.id_usuario,
      email: user.email,
      estado: user.estado,
      id_rol: user.id_rol,
      rol: user.rol ? user.rol.nombre : null,
      rol_detalle: user.rol || null,
    };

    next();
  } catch (error) {
    return errorResponse(res, 'No autorizado', 401, error.message);
  }
};

module.exports = authMiddleware;