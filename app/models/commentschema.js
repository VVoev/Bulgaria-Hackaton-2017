const Schema = require("mongoose").Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        //required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = CommentSchema;
