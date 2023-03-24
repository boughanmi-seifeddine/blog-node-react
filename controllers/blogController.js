const Blog = require('./../models/blogModel');
exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().select('-__v');
    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: blogs
    });
};
exports.createBlog = async (req, res) => {
    const newBlog = await Blog.create(req.body)
    res.status(201).json({
        status: 'success',
        data: newBlog
    });
};
exports.getBlog = async (req, res) =>   {
    // Blog.findOne({ _id: req.params.id })

    const blog = await Blog.findById(req.params.id);



    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
};
exports.updateBlog = async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    });
};

exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: {
            blog
        }
    });
};