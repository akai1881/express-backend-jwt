// const express = require('express');
const Router = require('express');
const { v4: uuidv4 } = require('uuid');
const StudentController = require('../controllers/studentController.js');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router = new Router();

router.get('/', StudentController.getAll);

router.get('/:id', authMiddleware, StudentController.getOne);

router.patch('/:id', authMiddleware, StudentController.update);

router.delete('/:id', StudentController.delete);

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 20 }),
  StudentController.signup
);

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 5, max: 20 }), StudentController.login);

module.exports = router;
