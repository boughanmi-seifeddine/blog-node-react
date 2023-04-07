const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const opts = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
};
const blogSchema = new mongoose.Schema({
        author: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'users'
        },
        age: {
            type: Number
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Please provide a title for the blog'],
            maxlength: [40, 'A blog title must have less or equal then 40 characters'],
            minlength: [10, 'A blog title must have more or equal then 10 characters']
        },
        content: {
            type: String,
            trim: true,
            required: [true, 'Please provide a title for the blog'],
            minlength: [40, 'A blog content must have more or equal then 40 characters']
        },
        imageCover: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
        isPublished: {
            type: Boolean,
            default: false
        },
            categories: {
            type: Array,
            required: false,
        },
        slug: String,
        preview: String
    },
    opts
)
blogSchema.virtual('subname').get(function () {
    return this.author + ' here';
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function (next) {
    this.slug = slugify(this.title, {lower: true});
    this.preview = this.content.slice(0, 40) + '...'
   /* this.createdAt = this.createdAt || Date.now()
    this.updatedAt = this.updatedAt || Date.now()*/
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;