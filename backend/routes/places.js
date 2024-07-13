const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const Places = require('../models/Place')
const { default: mongoose } = require('mongoose');

const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"
const userId = ""

router.post('/places', async (req, res) => {
    const data = req.body.category
    console.log(data)
    res.json(await Places.find())
  })
  

router.post('/add-places', async (req, res) => {

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
const { title, address, addPhoto, description, perks, extrainfo, checkin, checkout, maxguest, price } = req.body
console.log(title, address, addPhoto, description, perks, extrainfo, checkin, checkout, maxguest, price)
const mxguest = parseInt(maxguest)

const placeDoc = await Places.create({
    owner: decoded.user.id,
    title: title,
    address: address,
    photos: addPhoto,
    description: description,
    perks: perks,
    extraInfo: extrainfo,
    checkIn: checkin,
    checkOut: checkout,
    maxGuests: mxguest,
    price: price
})

res.json(placeDoc)
})

router.post('/deletePlace', async (req, res) => {
console.log(req.body.links)
const ObjectID = new mongoose.Types.ObjectId(req.body.links)
const data = await Places.findOneAndDelete({ _id: ObjectID });
if (data === null) {
    console.log(data)
}
res.json("d")
})



router.get('/get-places', async (req, res) => {
try {
    const token = req.header("Cookie")
    console.log(token)
    if (!token) {
    res.status(403).send("Cookie not valid")
    }
    const JWT = token.split('=')[1]
    var decoded = await jwt.verify(JWT, JWT_SECRET);
    req.user = decoded.user
    const place = await Places.find({ "owner": decoded.user.id })
    res.json(place)
} catch (error) {
    res.status(401).send({ error: "Access Denied " + error })
}


})

router.get('/place/:id', async (req, res) => {

const place = await Places.findOne({ _id: req.params.id })


res.json(place)


})

module.exports = router