const express = require('express');

const auth = require('../middleware/auth');
const schema = require('../middleware/schema');
const salaryController = require('../controller/salary');

const router = express.Router();
router.post('/create', auth.isAdmin, schema.midSalary, salaryController.createSalary);
router.get('/find', auth.isAdmin, salaryController.findSalary);

module.exports = router;
