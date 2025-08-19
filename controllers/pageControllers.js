import Photo from '../models/Photo.js';

export function getAboutPage(req, res) {
  res.render('about');
}

export function getAddPage(req, res) {
  res.render('add');
}

export async function getEditPage(req, res) {
  const photo = await Photo.findOne({ _id: req.params.id }); // catched the chosen photo id
  res.render('edit', { photo });
}
