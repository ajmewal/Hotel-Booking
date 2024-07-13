const mongoose = require('mongoose')
const { Schema } = mongoose;

const BookingScheme = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    checkIn: { type: Date },
    checkOut: { type: Date },
    adults: { type: Number },
    children: { type: Number },
    infants: { type: Number },
    pets: { type: Number },
    payment: { type: Number },
    date: {
        type: Date,
        default: Date.now
    },

})

const Booking = mongoose.model('booking', BookingScheme)

module.exports = Booking