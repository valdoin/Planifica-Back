const Mongoose = require('mongoose')
const localDB = 'mongodb://mongo:27017/Soutenances'

const connectDB = async () => {
    await Mongoose.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
    })
    console.log("MongoDB connected")
}

module.exports = connectDB