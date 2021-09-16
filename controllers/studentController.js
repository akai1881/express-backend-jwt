const { Student, School } = require('../models/index.js');

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

  static create = async (req, res) => {
    try {
      const { email, password, firstName, lastName, schoolId } = req.body;

      const student = await Student.create({ email, password, firstName, lastName, schoolId });

      return res.json(student);
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
