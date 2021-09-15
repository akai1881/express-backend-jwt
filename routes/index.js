const Router = require('express');
const router = new Router();

const studentRoutes = require('./../routes/students.js');
const schoolRoutes = require('./../routes/school.js');

router.use('/students', studentRoutes);
router.use('/school', schoolRoutes);

module.exports = router;
