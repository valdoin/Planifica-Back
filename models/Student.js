const Mongoose = require('mongoose');

const StudentSchema = new Mongoose.Schema({
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    tutor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    }
})

const Student = Mongoose.model('Student', StudentSchema);

module.exports = Student;
