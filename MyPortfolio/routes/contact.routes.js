const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contact.controller');
const { verifyJWT, isAdmin } = require('../middlewares/auth.middleware');

// Public contact form submission
router.post('/', contacts.create);

// Admin-only read/update/delete routes
router.get('/', verifyJWT, isAdmin, contacts.findAll);
router.get('/:id', verifyJWT, isAdmin, contacts.findOne);
router.put('/:id', verifyJWT, isAdmin, contacts.update);
router.delete('/:id', verifyJWT, isAdmin, contacts.delete);
router.delete('/', verifyJWT, isAdmin, contacts.deleteAll);

module.exports = router;