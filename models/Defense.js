const Mongoose = require('mongoose');

const DefenseSchema = new Mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    classroom: {
        type: String,
        required: true,
    },
    student: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    tutor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    candid: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    group: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    }
});

const Defense = Mongoose.model('Defense', DefenseSchema);

module.exports = Defense;
