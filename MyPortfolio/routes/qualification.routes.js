const express = require('express');
const router = express.Router();
const qualifications = require('../controllers/qualification.controller');
const { verifyJWT, isAdmin } = require('../middlewares/auth.middleware');

// Public read routes
router.get('/', qualifications.findAll);
router.get('/:id', qualifications.findOne);

// Admin-only write/delete routes
router.post('/', verifyJWT, isAdmin, qualifications.create);
router.put('/:id', verifyJWT, isAdmin, qualifications.update);
router.delete('/:id', verifyJWT, isAdmin, qualifications.delete);
router.delete('/', verifyJWT, isAdmin, qualifications.deleteAll);

module.exports = router;