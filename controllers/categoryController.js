const Category = require('../models/CategoryModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllCategories =  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Category.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const categories = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
            categories
        }
    });
});
