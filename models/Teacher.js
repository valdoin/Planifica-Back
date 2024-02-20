const Mongoose = require('mongoose');

const TeacherSchema = new Mongoose.Schema({
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isProgrammer: {
        type: Boolean,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    disponibilities: [
        { type: String }
    ],
    
});

const Teacher = Mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
