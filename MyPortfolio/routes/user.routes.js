const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');
const verifyJWT = require('../middlewares/auth.middleware');

router.get('/', verifyJWT, users.findAll);
router.get('/:id', verifyJWT, users.findOne);
router.post('/', verifyJWT, users.create);
router.put('/:id', verifyJWT, users.update);
router.delete('/:id', verifyJWT, users.delete);
router.delete('/', verifyJWT, users.deleteAll);

module.exports = router;