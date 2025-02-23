const mongoose = require("mongoose");
const addWordSchema = mongoose.Schema(
    {
        weekId: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        learningTitle: {
            type: String,
            required: true
        },
        learningDes: {
            type: String,
            required: true
        },
        HSKname: {
            type: String,
            required: true
        },
        detailsexample: {
            type: String,
            required: true
        },
        Issave: {
            type: Boolean,
            required: true
        }
    }
)
const addwordModels = mongoose.model("addword", addWordSchema);
module.exports = addwordModels;