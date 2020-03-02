const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const JWT_KEY = 'hr983y498r3hf304dfg'

const config = require('./db');

const CityRouter = require('./routers/CityRouter');
const RegisterRouter = require('./routers/RegisterRouter');
const ItemRouter = require('./routers/ItemRouter');
const CategoryRouter = require('./routers/CategoryRouter');
const LoginRouter = require('./routers/LoginRouter');
const CartItemRouter = require('./routers/CartItemRouter');
const CartRouter = require('./routers/CartRouter');
const OrderRouter = require('./routers/OrderRouter');
const GeneralRouter = require('./routers/GeneralRouter');
const GeneralSchema = require('./models/general.model');
const CitySchema = require('./models/city.model');
const CategorySchema = require('./models/category.model');
const UploadRouter = require('./routers/UploadRouter');

mongoose.connect(config.DB, { useNewUrlParser: true }, function (err, db) {   //here db is the client obj
  if (err) {
    console.log('Can not connect to the database ' + err);
  }// throw err;
  else {
    //For first time
    //Create generalColl collection in mongoDb 
    //if none exists, with a starting value of 0 for a items counter and orders counter 
    db.createCollection("generalColl", function (err, result) {
      if (err) {
        return console.log('generalColl', err);
      }
      else {
        GeneralSchema.findOne({}, function (err, response) {
          if (err) {
            console.log('GeneralSchema.exists ' + err);
          } else {
            if (response === null)//generalColl doesn't exist
            {
              const generalData = new GeneralSchema();
              generalData.ordersCounter = 0;//init
              generalData.itemsCounter = 0;
              generalData.save();

              console.log('Added new city ');

              const cityData = new CitySchema();
              cityData.name = 'Jerusalem';
              cityData.save();

              console.log('Added new Category');
              const CategoryData = new CategorySchema();
              CategoryData.name = 'Fruits & Vegetable'
              CategoryData.save();

            }
          }
        });
      }
    });
  }
});
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// todo general/get in this list?
app.use(function (req, res, next) {
  console.log('in fun ' + req.path);
  if ((req.path === '/login') ||
    (req.path === '/firstPage') ||
    (req.path === '/register/addStep1') ||
    (req.path === '/city/get') ||
    (req.path === '/general/get') ||
    (req.path === '/api/upload') ||
    (req.path === '/register/addStep2')) {
  //  console.log('in login');
    next();
  }
  else if (!req.headers.authorization) {
   // console.log('in authorization - ' + req.header.authorization);
    return res.status(403).json(
      {
        error: 'No credentials sent!',
        isAuthenticated: false
      });
  } else {
    try {
      console.log('in jwt');
      const token = jwt.verify(req.headers.authorization.replace('Bearer ', ''), JWT_KEY);
      next();
    }
    catch (ex) {
      const e = ex;
      return res.status(401).json({
        error: 'Bad credentials',
        isAuthenticated: false
      });
    }
  }
});


app.use('/city', CityRouter);
app.use('/register', RegisterRouter);
app.use('/item', ItemRouter);
app.use('/category', CategoryRouter);
app.use('/login', LoginRouter);
app.use('/cartItem', CartItemRouter);
app.use('/cart', CartRouter);
app.use('/order', OrderRouter);
app.use('/general', GeneralRouter);
app.use('/upload', UploadRouter);

app.get('/', function (req, res) {
  res.send('Happy to see u');
});



app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
});





// File upload settings  
const PATH =
//  './uploads';
'../client/src/assets/images';


let storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      console.log('cb');
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      let currentFileName = file.fieldname + '_' + file.originalname;//+ '-' + Date.now();
      cb(null, currentFileName);
    }
  });

let upload = multer({
  storage: storage
});

app.get('/api', function (req, res) {
  res.end('File catcher');
});

// POST File
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log( 'File is available!');
    // return res.send({
    return res.json({
      success: true
    })
  }
});
