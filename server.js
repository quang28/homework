const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const PORT = 3000;
const productRoute = require('./routes/product')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Template engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
app.use(morgan('combined'));

dotenv.config();

//connect DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.get('/', (req, res) => {
  res.render('home', {
    layout: 'index',
    style: 'home.css'
  });
  });

  app.get('/create', (req, res) => {
    res.render('createProduct', {
      layout: 'index',
      style: 'addProduct.css'
    });
    });
  
app.use("/api/product",productRoute);

app.listen(PORT,() => {
    console.log(`App is listening at port ${PORT}`) ; 
})
