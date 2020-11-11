const express = require('express');

const schema = require('../middleware/schema');
const salaryController = require('../controller/salary');

const router = express.Router();
router.post('/create', schema.midSalary, salaryController.createSalary);
router.get('/view/create', salaryController.viewInsertSalary);

module.exports = router;
