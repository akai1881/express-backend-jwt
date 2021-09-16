// const express = require('express');
const Router = require('express');
const { v4: uuidv4 } = require('uuid');
const StudentController = require('../controllers/studentController.js');
const router = new Router();

router.get('/', StudentController.getAll);

router.get('/:id', StudentController.getOne);

router.post('/', StudentController.create);

router.patch('/:id', StudentController.update);

router.delete('/:id', StudentController.delete);

// router.patch('/:id', (req, res) => {
//   const { id } = req.params;

//   const body = req.body;

//   const foundIndex = students.findIndex((s) => s.id === id);

//   if (foundIndex === -1) {
//     return res.status(404).json({ msg: 'Student not found' });
//   }

//   const student = students[foundIndex];

//   const updatedStudent = {
//     ...student,
//     ...body,
//     id: student.id,
//   };

//   students[foundIndex] = updatedStudent;

//   res.status(200).json({ msg: 'Updated student', data: updatedStudent });
// });

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;

//   students = students.filter((s) => s.id !== id);

//   res.status(200).json({ msg: 'Student was deleted' });
// });

module.exports = router;
