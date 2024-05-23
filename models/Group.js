const Mongoose = require('mongoose');

const GroupSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
});

const Group = Mongoose.model('Group', GroupSchema);

module.exports = Group;
