const express = require('express');
const router = express.Router();
const { sendReportEmail } = require('../controllers/emailController'); 

router.post('/send', sendReportEmail);

module.exports = router;