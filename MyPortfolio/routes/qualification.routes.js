const express = require('express');
const router = express.Router();
const qualifications = require('../controllers/qualification.controller');
const verifyJWT = require('../middlewares/auth.middleware');

router.get('/', verifyJWT, qualifications.findAll);
router.get('/:id', verifyJWT, qualifications.findOne);
router.post('/', verifyJWT, qualifications.create);
router.put('/:id', verifyJWT, qualifications.update);
router.delete('/:id', verifyJWT, qualifications.delete);
router.delete('/', qualifications.deleteAll);

module.exports = router;