const express = require('express');
const morgan = require('morgan');
const app = express()

const userRouter = require('./routes/userRoutes');
// 3) ROUTES
app.use('/api/v1/users', userRouter);
module.exports = app;