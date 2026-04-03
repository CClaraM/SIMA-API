const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authmiddleware');
const { requireRole } = require('../middlewares/permissionsmiddleware');
const { notImplemented } = require('../controller/permissionscontroller');

router.get('/', authMiddleware, requireRole('administrador'), notImplemented);
router.post('/', authMiddleware, requireRole('administrador'), notImplemented);
router.put('/:id', authMiddleware, requireRole('administrador'), notImplemented);
router.delete('/:id', authMiddleware, requireRole('administrador'), notImplemented);

module.exports = router;