const { errorResponse } = require('../helpers/response');

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Usuario no autenticado', 401);
    }

    const userRole = (req.user.rol || '').toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

    if (!normalizedAllowedRoles.includes(userRole)) {
      return errorResponse(
        res,
        'Acceso denegado: no tienes permisos para esta funcionalidad',
        403
      );
    }

    next();
  };
};

module.exports = {
  requireRole,
};