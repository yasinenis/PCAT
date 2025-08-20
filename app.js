import express from 'express';
import mongoose from 'mongoose';

import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';

import ejs from 'ejs';

import * as photoController from './controllers/photoControllers.js';
import * as pageController from './controllers/pageControllers.js';

const app = express();

// connect DB
await mongoose
  .connect(
    'mongodb+srv://yasinenis201:57rLxAWiJWgonMS1@cluster0.rqocgnx.mongodb.net/?retryWrites=true&w=majority&appName=pcat-db'
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });
console.log('Database connected succesfully.');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // helps us to read data in url
app.use(express.json()); // converts url data to json

app.use(fileUpload());

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at ${port} port..`);
});
