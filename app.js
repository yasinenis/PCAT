import express from 'express';

import ejs from 'ejs';

import Photo from './models/Photo.js';

import mongoose from 'mongoose';

const app = express();

// connect DB
await mongoose.connect('mongodb://localhost/pcat-test-db');
console.log('Database connected succesfully.');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // helps us to read data in url
app.use(express.json()); // converts url data to json

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);      // for catch id in console
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at ${port} port..`);
});
