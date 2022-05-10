const userApi = require('./api/userApi');
const taskApi = require('./api/taskApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/user', userApi);
app.use('/api/task', taskApi);

app.listen(3000);
console.log('success listen at port: 3000...');
