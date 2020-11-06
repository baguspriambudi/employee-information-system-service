const express = require('express');

const auth = require('../middleware/auth');
const schema = require('../middleware/schema');
const employeeController = require('../controller/employee');

const router = express.Router();
router.post('/create', auth.isAdmin, schema.midEmployee, employeeController.createEmployee);
router.get('/find', employeeController.findEmployee);
router.post('/update', auth.isAdmin, schema.midEmployeeUpdate, employeeController.updateEmployee);
router.post('/delete', auth.isAdmin, schema.midEmployeeDelete, employeeController.deleteEmployee);
router.post('/find/date', employeeController.findEmployeeByEntryDate);
router.post('/search', employeeController.search);

module.exports = router;
