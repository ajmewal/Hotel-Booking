
const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const conn = require('./db.js')
const imageDownloader = require('image-downloader')
const multer = require('multer')
var fs = require('fs');
const Places = require('./models/Place')
var jwt = require('jsonwebtoken');

const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"

const { hostname } = require('os');
const { default: mongoose } = require('mongoose');

app.use(express.json())
conn()
app.use(express.static('public'))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/api/auth', require('./routes/auth'))

app.post('/upload-by-image', async (req, res) => {

  console.log(req.body.links)
  const newName = Date.now() + '.jpg';
  await imageDownloader.image({
    url: req.body.links,
    dest: __dirname + '/public/uploads/' + newName
  });
  res.json('/uploads/' + newName)

})

const photosMiddleware = multer({ dest: "public/uploads/" })

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  let file = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    file.push('http://localhost:5000' + newPath.replace('public', ''))

  }
  res.json(file)
})


app.post('/deleteimage', async (req, res) => {
try {
  console.log(req.body.links[0].split('\\').slice(-2))
  const fileName = req.body.links[0].split('\\').slice(-1)
   console.log(__dirname + "\\public\\uploads\\" + fileName)
  fs.unlink(__dirname + "\\public\\uploads\\" + fileName,(err => {
    if (err){ console.log(err)}
}))
  res.json({Success:'File Deleted Successfully'})
} catch (error) {
  res.status(401).json({ error: "Access Denied " + error })
}

})

app.get('/places', async (req, res) => {
  res.json(await Places.find())
})


app.post('/add-places', async (req, res) => {

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
  const { title, address, addPhoto, description, perks, extrainfo, checkin, checkout, maxguest,price } = req.body
  console.log(title, address, addPhoto, description, perks, extrainfo, checkin, checkout, maxguest,price)
  const mxguest = parseInt(maxguest)

  const placeDoc = await Places.create({
    owner : decoded.user.id,
    title :title,
    address :address,
    photos :addPhoto,
    description :description,
    perks :perks,
    extraInfo :extrainfo,
    checkIn :checkin,
    checkOut :checkout,
    maxGuests :mxguest,
    price:price
  })
  
  res.json(placeDoc)
})

app.post('/deletePlace', async (req,res)=>{
  console.log(req.body.links)
  const ObjectID = new  mongoose.Types.ObjectId(req.body.links)
  const data = await Places.findOneAndDelete({ _id: ObjectID});
  if(data===null){
    console.log(data)
  }
  res.json("d")
})



app.get('/get-places', async (req,res)=>{
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
  const place = await Places.find({"owner": decoded.user.id})

  res.json(place)

})

app.get('/place/:id', async (req,res)=>{
  // try {
  //   const token = req.header("Cookie")
  //   console.log(token)
  //   if (!token) {
  //     res.status(403).send("Cookie not valid")
  //   }
  //   const JWT = token.split('=')[1]
  //   var decoded = await jwt.verify(JWT, JWT_SECRET);
  //   req.user = decoded.user
  // } catch (error) {
  //   res.status(401).send({ error: "Access Denied " + error })
  // }

  const place = await Places.findOne({_id: req.params.id})

  res.json(place)

  // res.send("hello")

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})