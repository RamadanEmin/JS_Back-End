const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema({
    author: String,
    content: {
        type: String,
        required: true
    }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;