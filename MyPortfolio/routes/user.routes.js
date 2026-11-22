const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');
const { verifyJWT, isAdmin } = require('../middlewares/auth.middleware');

// Admin-only user management routes
router.get('/', verifyJWT, isAdmin, users.findAll);
router.post('/', verifyJWT, isAdmin, users.create);
router.delete('/:id', verifyJWT, isAdmin, users.delete);
router.delete('/', verifyJWT, isAdmin, users.deleteAll);

// Authenticated routes (adjust if you want GET/PUT /:id strictly Admin-only)
router.get('/:id', verifyJWT, users.findOne);
router.put('/:id', verifyJWT, users.update);

module.exports = router;