const express = require('express');
const router = express.Router();
const qualifications = require('../controllers/qualification.controller');

router.get('/', qualifications.findAll);
router.get('/:id', qualifications.findOne);
router.post('/', qualifications.create);
router.put('/:id', qualifications.update);
router.delete('/:id', qualifications.delete);
router.delete('/', qualifications.deleteAll);

module.exports = router;