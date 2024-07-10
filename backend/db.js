const {mongoose,ObjectId} = require("mongoose")

const mongoUrl = "mongodb://localhost:27017/hotelBooking"


const connectMongoose =   async ()=>{
    await mongoose.connect(mongoUrl)
    console.log("connected")
}


module.exports = connectMongoose;