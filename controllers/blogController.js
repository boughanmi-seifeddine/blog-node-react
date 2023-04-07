const Blog = require('./../models/blogModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {validationResult} = require("express-validator");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
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
exports.getMyBlogs = catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Blog.find({user:req.user.id}), req.query)
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
exports.createBlog = catchAsync(async (req, res, next) => {
    // Finds the validation errors in this request before it goes to mongoose model
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(JSON.stringify(errors.array().map((err) => err.msg)), 404));
    }
    // Extract variables to not save the entire request body
    const {author, title, content, imageCover, categories, user} = req.body
    const newBlog = await Blog.create({
        author,
        title,
        content,
        imageCover,
        categories,
        user: (req.user.role === 'admin' && user) ? user : req.user.id
    })
    res.status(201).json({
        status: 'success',
        data: newBlog
    });
});
exports.getBlog = catchAsync(async (req, res, next) => {
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
exports.updateBlog = catchAsync(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }
    if (req.user.role !== 'admin' && req.user.name !== blog.author) {
        return next(new AppError('your are not the owner of this blog', 404));
    }
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }
    if (req.user.role !== 'admin' && req.user.name !== blog.author) {
        return next(new AppError('your are not the owner of this blog', 404));
    }
    await Blog.deleteOne({_id: blog._id});
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
});