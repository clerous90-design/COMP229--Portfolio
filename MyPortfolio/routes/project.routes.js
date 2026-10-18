const express = require('express');
const router = express.Router();
const projects = require('../controllers/project.controller');

router.get('/', projects.findAll);
router.get('/:id', projects.findOne);
router.post('/', projects.create);
router.put('/:id', projects.update);
router.delete('/:id', projects.delete);
router.delete('/', projects.deleteAll);

module.exports = router;