const mongoose = require('mongoose');

const learningCreateSchema = new mongoose.Schema({
    eachweek: { type: String, required: true },
    learningtitle: { type: String, required: true },
    learningdescription: { type: String, required: true },
    havedata: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true  // This automatically adds 'createdAt' and 'updatedAt' fields
});

const LearningCreatemodels = mongoose.model('LearningCreate', learningCreateSchema);

module.exports = LearningCreatemodels;
