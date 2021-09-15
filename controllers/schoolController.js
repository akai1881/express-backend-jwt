const { School } = require('./../models/index.js');

class SchoolController {
  static getAll = async (req, res) => {
    try {
      const schools = await School.findAll();
      return res.json(schools);
    } catch (e) {
      console.log(e);
    }
  };

  static getOne = async (req, res) => {
    try {
      const { id } = req.params;

      const school = await School.findOne({
        where: { id },
      });

      return res.json(school);
    } catch (e) {
      console.log(e);
    }
  };

  static create = async (req, res) => {
    try {
      const { name, adress } = req.body;
      const school = await School.create({ name, adress });
      return res.json({ msg: 'success', data: school });
    } catch (e) {
      console.log(e);
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, adress } = req.body;
      const school = await School.update({ name, adress }, { where: { id } });
      return res.json({ msg: 'Updated', data: school });
    } catch (e) {
      console.log(e);
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;

      const school = await School.destroy({ where: { id } });

      return res.json({ msg: 'successfully deleted', data: school });
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = SchoolController;
