const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authmiddleware');
const { requireRole } = require('../middlewares/permissionsmiddleware');
const { getUsers } = require('../controller/userscontroller');

router.get('/', authMiddleware, requireRole('administrador'), getUsers);

module.exports = router;