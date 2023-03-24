const express = require('express');
const morgan = require('morgan');
const app = express()

// 1) MIDDLEWARES
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);
module.exports = app;