const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');//, OPTIONS');
    next();
  });
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi, this is GitHub Integration API by Alex');
});

require('./routes/auth')(app);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
