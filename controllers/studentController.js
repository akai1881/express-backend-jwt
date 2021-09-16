require('dotenv').config();
const { Student, School } = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

class StudentController {
  static getAll = async (req, res) => {
    try {
      let { school, page, limit } = req.query;
      page = page || 1;
      limit = limit || 5;
      let offset = page * limit - limit;
      let students;

      if (school) {
        students = await Student.findAndCountAll({ where: { schoolId: school }, limit, offset });
        return res.json(students);
      }

      students = await Student.findAndCountAll({ limit, offset });

      return res.json(students);
    } catch (e) {
      console.log(e);
    }
  };

  static getOne = async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findOne({
        where: { id },
        include: {
          model: School,
          as: 'school',
          attributes: ['name', 'adress'],
        },
      });

      return res.json(student);
    } catch (e) {
      console.log(e);
    }
  };

  static signup = async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Введите или пароль' });
      }

      const oldStudent = await Student.findOne({ where: { email } });

      if (oldStudent) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

      const hashPassword = await bcrypt.hash(password, 3);

      const student = await Student.create({ email, password: hashPassword, firstName, lastName });
      const token = jwt.sign({ id: student.id, email }, SECRET_KEY, { expiresIn: '5h' });
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ where: { email } });

      if (!student) {
        return res.status(404).json({ message: 'Пользователь с таким email не найден' });
      }

      const comparePassword = await bcrypt.compareSync(password, student.password);

      if (!comparePassword) {
        return res.status(403).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign({ id: student.id, email }, SECRET_KEY, { expiresIn: '5h' });
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      let { email, firstName, lastName, schoolId } = req.body;

      const student = await Student.findOne({ where: { id } });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      email = email || student.email;
      firstName = firstName || student.firstName;
      lastName = lastName || student.lastName;
      schoolId = schoolId || student.schoolId;

      await Student.update({ email, firstName, lastName, schoolId }, { where: { id } });

      return res.json({ message: 'Student was updated' });
    } catch (e) {
      console.log(e);
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      await Student.destroy({ where: { id } });
      return res.json({ message: 'Student was deleted' });
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = StudentController;
