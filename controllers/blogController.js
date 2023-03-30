const Blog = require('./../models/blogModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllBlogs =  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Blog.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const blogs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs
        }
    });
});
exports.createBlog =  catchAsync(async (req, res, next) => {
    const newBlog = await Blog.create(req.body)
    res.status(201).json({
        status: 'success',
        data: newBlog
    });
});
exports.getBlog =  catchAsync(async (req, res, next) =>   {
    // Blog.findOne({ _id: req.params.id })

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});
exports.updateBlog =  catchAsync(async (req, res, next) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});

exports.deleteBlog =  catchAsync(async (req, res, next) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: {
            blog
        }
    });
});