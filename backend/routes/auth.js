const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"
const userId = ""

router.post('/createUser', async (req, res) => {
    console.log(req.body.name, req.body.email, req.body.password)
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.json(user)
})

router.post('/login', async (req, res) => {
    console.log(req.body.email, req.body.password)
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ error: "Username and Password is wrong" })
        }
        console.log(user.password, password)
        if (!(user.password === password)) {
            res.status(400).json({ error: "Username and Password is wrong" })
        } else {

            const data = {
                user: {
                    id: user.id
                }
            }
            const jwtData = jwt.sign(data, JWT_SECRET)
            // res.set('Set-Cookie', jwtData)
            res.json({ jwtData })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

router.get('/check', async (req, res) => {
    try {
        const token = req.header("cookie")
        if (!token) {
            req.status(403).send("Cookie not valid")
        }
        const JWT = token.split('=')[1]

        try {
            var decoded = await jwt.verify(JWT, JWT_SECRET);
            req.user = decoded.user
        } catch (error) {
            res.status(401).send({ error: "Access Denied " + error })
        }

        const user = await User.findById(req.user.id).select("-password")
        console.log(user)
        res.json(user)
    } catch (error) {
        res.status(401).send({ error: "Access Denied " + error })
    }
})

router.post('/get-owner', async (req, res) => {

console.log(req.body.id)
    // try {
    //     const token = req.header("cookie")
    //     if (!token) {
    //         req.status(403).send("Cookie not valid")
    //     }
    //     const JWT = token.split('=')[1]

    //     try {
    //         var decoded = await jwt.verify(JWT, JWT_SECRET);
    //         req.user = decoded.user
    //     } catch (error) {
    //         res.status(401).send({ error: "Access Denied " + error })
    //     }

        const user = await User.findById(req.body.id).select("name").select("_id")
        res.json(user)

    // } catch (error) {
    //     res.status(401).send({ error: "Access Denied " + error })
    // }

})



module.exports = router