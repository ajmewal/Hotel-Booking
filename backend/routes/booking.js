const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const Bookings = require('../models/Bookings.js')
const { default: mongoose } = require('mongoose');


const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"
const userId = ""

router.post('/bookings', async (req, res) => {
    try {
        const token = req.header("Cookie")
        console.log(token)
        if (!token) {
            res.status(403).send("Cookie not valid")
        }
        const JWT = token.split('=')[1]
        var decoded = await jwt.verify(JWT, JWT_SECRET);
        req.user = decoded.user
    } catch (error) {
        res.status(401).send({ error: "Access Denied " + error })
    }

    const { place_id, checkIn, checkOut, adults, children, infants, pets, payment } = req.body
    console.log(place_id, checkIn, checkOut, adults, children, infants, pets, payment)

    const placeDoc = await Bookings.create({
        owner: decoded.user.id,
        place_id: place_id,
        checkIn: checkIn,
        checkOut: checkOut,
        adults: adults,
        children: children,
        infants: infants,
        pets: pets,
        payment: payment,

    })
    res.json(placeDoc)

})

router.post('/delete-bookings', async (req, res) => {
    try {
        const token = req.header("Cookie")
        // console.log(token)
        if (!token) {
            res.status(403).send("Cookie not valid")
        }
        const JWT = token.split('=')[1]
        var decoded = await jwt.verify(JWT, JWT_SECRET);
        req.user = decoded.user
        const data = await Bookings.find({ "owner": decoded.user.id }).select('owner')
        // console.log(data[0].owner === decode.user.id)
        if (data[0].owner.toString() !== decoded.user.id.toString()) {
            res.status(401).send({ error: "Access Denied " + error })
        } else {
            const ObjectID = new mongoose.Types.ObjectId(req.body.links)
            const data = await Bookings.findOneAndDelete({ _id: ObjectID });
            if (data === null) {
                console.log(data)
                res.json("Not Deleted")
            } else {
                console.log(data)
                res.json("Deleted Successfully")
            }
        }
    } catch (error) {
        res.status(401).send({ error: "Access Denied " + error })
    }

    // console.log(req.body.links)
})

router.get('/get-bookings', async (req, res) => {

    try {
        const token = req.header("Cookie")
        console.log(token)
        if (!token) {
            res.status(403).send("Cookie not valid")
        }
        const JWT = token.split('=')[1]
        var decoded = await jwt.verify(JWT, JWT_SECRET);
        req.user = decoded.user
    } catch (error) {
        res.status(401).send({ error: "Access Denied " + error })
    }
    const data = await Bookings.find({ "owner": decoded.user.id })

    res.json(data)


})

module.exports = router