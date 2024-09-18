require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); 

app.use('/api/email', emailRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
