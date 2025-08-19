import Photo from '../models/Photo.js';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getAllPhotos(req, res) {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos });
}

export async function getPhoto(req, res) {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
}

export async function createPhoto(req, res) {
  //console.log(req.files.image);
  //await Photo.create(req.body);
  //res.redirect('/');
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
}

export async function updatePhoto(req, res) {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
}

export async function deletePhoto(req, res) {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
}
