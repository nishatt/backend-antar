require("module-alias/register");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// db connection
const db = require('@config/database');

const indexRouter = require('@routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
// app.use('/users', usersRouter);


module.exports = app;
