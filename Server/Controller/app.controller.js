const LearningCreatemodels = require("../Models/learningCreate.models");
const AddWord = require("../Models/addword.models")
const learningCreate = async (req, res) => {
    const { learningtitle, learningdescription } = req.body;
    const userId = req.user._id;

    try {
        const maxWeekItem = await LearningCreatemodels.findOne({ userId })
            .sort({ eachweek: -1 })
            .limit(1);
        const maxWeekValue = maxWeekItem ? parseInt(maxWeekItem.eachweek, 10) : 0;
        const newWeekValue = maxWeekValue + 1;
        const newLearningItem = new LearningCreatemodels({
            eachweek: newWeekValue,
            learningtitle,
            learningdescription,
            havedata: false,
            userId
        });

        // Save the new entry to the database
        await newLearningItem.save();

        // Send a success response
        return res.status(201).json({
            message: "Created successfully",
            eachweek: newWeekValue
        });
    } catch (error) {
        // Handle errors and send a response
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            error: error.message
        });
    }
};

const getlearningCreate = async (req, res) => {
    const userId = req.user._id; // Extract user ID from the request
    try {
        const plans = await LearningCreatemodels.find({ userId: userId }); // Fetch plans for the specific user
        if (plans.length > 0) {
            return res.status(200).json(plans); // Respond with the list of plans
        } else {
            return res.json({
                message: 1
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getlearningCreateId = async (req, res) => {
    const { createdId } = req.params;

    try {
        const weekplan = await LearningCreatemodels.findById(createdId);
        if (weekplan) {
            return res.status(200).json([weekplan])
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addword = async (req, res) => {
    const { weekId, userId, learningTitle,learningDes,HSKname, detailsexample } = req.body;
    try {
        const newword = new AddWord({
            weekId,
            userId,
            learningTitle,
            learningDes,
            HSKname,
            detailsexample,
            Issave: "false"
        });
        const addWeekData = await LearningCreatemodels.findOneAndUpdate(
            { userId, _id: weekId },  // Filter condition
            { havedata: true },  // No update operation
            { new: true }  // Returns the updated document
        );

        await newword.save();

        return res.status(201).json({ message: "New word added successfully" });
    } catch (error) {
        console.error('Error while adding word:', error);
        return res.status(500).json({ error: error.message });
    }
};

const getallword = async (req, res) => {
    const userId = req.user._id
    try {
        const findAllWord = await AddWord.find({ userId: userId });
        if (findAllWord) {
            return res.status(200).json(findAllWord);
        }
        else {
            return res.status(404).json({
                message: "Any data not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const getwordId = async (req, res) => {
    const { id } = req.params; // Assuming 'id' is the wordId
    const userId = req.user._id; // Getting the userId from the authenticated user

    try {
        // Find the word by its id and userId
        const eachWord = await AddWord.findOne({ _id: id, userId: userId });

        if (eachWord) {
            return res.status(200).json([eachWord]);
        } else {
            return res.status(404).json({ error: 'Word not found' });
        }
    } catch (error) {
        console.error('Error finding word by ID and user ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const editWordExplain = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { updatedData } = req.body;

    try {
        // Update the document in the database
        const foundExplain = await AddWord.updateOne(
            { _id: id, userId: userId },
            { $set: { detailsexample: updatedData } }
        );
        if (foundExplain) {
            return res.status(200).json({
                message: "Data saved successfully"
            });
        }

    } catch (error) {
        console.error('Error updating word by ID and user ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteWeekPlan = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        const deletedId = await LearningCreatemodels.deleteMany({
            userId: userId,
            _id: id
        });
        const deletedAddword = await AddWord.deleteMany({
            userId: userId,
            weekId: id
        });
        if (deletedId && deletedAddword) {
            return res.status(200).json({
                message: "deleted successfull"
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const addbookmark = async (req, res) => {
    const { id, weekId } = req.params;
    const userId = req.user._id;
    try {
        await AddWord.updateOne({ _id: id, weekId: weekId, userId: userId }, {
            $set: {
                Issave: true
            }
        });
        return res.status(200).json({
            message: true
        })

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

const removeBookmark = async (req, res) => {
    const { id, weekId } = req.params;
    const userId = req.user._id;
    try {
        const result = await AddWord.updateOne(
            { _id: id, weekId: weekId, userId: userId },
            { $set: { Issave: false } }
        )
        return res.status(200).json({
            message: "Bookmark successfully removed."
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });
    }
};

const findBookmark = async (req, res) => {
    const { id, weekId } = req.params;
    const userId = req.user._id;
    try {
        const findBookmark = await AddWord.find({ _id: id, weekId: weekId, userId: userId, Issave: true });

        if (findBookmark.length > 0) { // Check if any bookmark was found
            return res.status(200).json({
                message: true
            });
        }
        else {
            return res.json({
                message: false
            })
        }
    } catch (error) {
        console.error("Error finding bookmark:", error); // Logging the error for debugging
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });
    }
};
const getWeek = async (req, res) => {
    const { id, weekId } = req.params;
    const userId = req.user._id;
    try {
        const findBookmark = await AddWord.find({ _id: id, weekId: weekId, userId: userId });

        if (findBookmark.length > 0) {
            const findWeek = await LearningCreatemodels.find({ userId: userId, _id: weekId });
            if (findWeek.length > 0) {
                return res.status(200).json({
                    message: findWeek.map((data) => data.eachweek),
                    findWeek: findWeek
                });
            }
        }
    } catch (error) {
        console.error("Error finding bookmark:", error); // Logging the error for debugging
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });
    }
};

















module.exports = {
    learningCreate,
    getlearningCreate,
    getlearningCreateId,
    addword,
    getallword,
    getwordId,
    editWordExplain,
    deleteWeekPlan,
    addbookmark,
    removeBookmark,
    findBookmark,
    getWeek,
};
