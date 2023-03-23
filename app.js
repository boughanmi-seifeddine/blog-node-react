const express = require('express');
const morgan = require('morgan');
const app = express()
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const userRouter = require('./routes/userRoutes');
// 3) ROUTES
app.use('/api/v1/users', userRouter);
module.exports = app;