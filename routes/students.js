// const express = require('express');
const Router = require('express');
const { v4: uuidv4 } = require('uuid');
const router = new Router();

let students = [];

router.get('/', (req, res) => {
  res.set({
    'Content-Type': 'text/html',
  });
  res.status(200).send('<img src="/static/images/earth.jpeg" />');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ msg: 'Student with given id not found' });
  }

  res.status(200).json({ data: student });
});

router.post('/', (req, resp) => {
  const { name, age } = req.body;

  const newStudent = {
    name,
    age,
    id: uuidv4(),
  };

  students.push(newStudent);

  resp.status(200).json({ message: 'OK', data: newStudent });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const body = req.body;

  const foundIndex = students.findIndex((s) => s.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ msg: 'Student not found' });
  }

  const student = students[foundIndex];

  const updatedStudent = {
    ...student,
    ...body,
    id: student.id,
  };

  students[foundIndex] = updatedStudent;

  res.status(200).json({ msg: 'Updated student', data: updatedStudent });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  students = students.filter((s) => s.id !== id);

  res.status(200).json({ msg: 'Student was deleted' });
});

module.exports = router;
