const express = require('express');

const auth = require('../middleware/auth');
const employeeController = require('../controller/employee');

const router = express.Router();
router.post('/create', auth.isAdmin, employeeController.createEmployee);
router.get('/find', auth.isAdmin, employeeController.findEmployee);
router.post('/update', auth.isAdmin, employeeController.updateEmployee);
router.post('/delete', auth.isAdmin, employeeController.deleteEmployee);
router.post('/find/date', auth.isAdmin, employeeController.findEmployeeByEntryDate);

module.exports = router;
