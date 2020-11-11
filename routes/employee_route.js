const express = require('express');

const schema = require('../middleware/schema');
const employeeController = require('../controller/employee');

const router = express.Router();
router.post('/create', schema.midEmployee, employeeController.createEmployee);
router.get('/view/create', employeeController.viewInsert);
router.get('/view', employeeController.findEmployee);
router.post('/update', employeeController.updateEmployee);
router.get('/view/update/:id', employeeController.viewUpdate);
router.get('/view/delete/:id', employeeController.viewDelete);
router.post('/find/date', schema.midFindEmployeeByDate, employeeController.findEmployeeByEntryDate);
router.get('/view/date', employeeController.viewDate);
router.post('/search', employeeController.search);
router.get('/view/search', employeeController.viewSeacrh);

module.exports = router;
