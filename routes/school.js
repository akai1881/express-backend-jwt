// const express = require('express');
const Router = require('express');

const router = new Router();
const SchoolController = require('./../controllers/schoolController.js');

router.get('/', SchoolController.getAll);
router.get('/:id', SchoolController.getOne);
// router.get('/students/:id', SchoolController.getAllStudent);
router.post('/', SchoolController.create);
router.patch('/:id', SchoolController.update);
router.delete('/:id', SchoolController.delete);

module.exports = router;
