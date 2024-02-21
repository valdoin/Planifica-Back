const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    username:{
        type: String,
        required: true, 
    },
    password:{
        type: String,
        required:true,
    },
    disponibilities: [
        { type: Date }
    ]
})

const User = Mongoose.model("User", UserSchema);
module.exports = User;