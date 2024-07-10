const mongoose = require('mongoose')
const { Schema } = mongoose;

const placeSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: { type: String },
    address: { type: String },
    photos: [String],
    description: { type: String },
    perks: [String],
    extraInfo: { type: String },
    checkIn: { type: String },
    checkOut: { type: String },
    maxGuests: { type: Number },
    date: {
        type: Date,
        default: Date.now
    },
    reviewOwner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    review: [String],
    price: {type:Number},
    map:{type:String}

})

const Place = mongoose.model('place', placeSchema)

module.exports = Place