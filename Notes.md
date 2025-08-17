# mongodb notes

> show dbs

> use example-db

// first document in db
> db.photo.insertOne(
    {title: "photo 1", description: "Photo description lorem ipsum", qty: 20}
)  

> db.photos.find()

> show collections

> db.createCollection("collection-name")

> db.photos.insertMany([
... {title: "Photo 2", desription: "Photo 2 description", qty:50},
... {title: "Photo 3", desription: "Photo 3 description", qty:150},
... ])

// show document that document title is "Photo 1"
db.photos.find({title: "Photo 1"});

// return photos where quantity less than 200
db.photos.find(
... {qty: {$lt: 200}}
... )

// same however added limit(2)
db.photos.find( { qty: { $lt: 200 } } ).limit(2)

// update
db.photos.updateOne( {title: "Photo 1"}, { $set: {qty: 222} })

// delete
db.photos.deleteOne({qty: {$lt: 500}})

// delete database 😶
db.dropDatabase()

// exit from mongo shell
quit()

# mongodb test.js
```javascript
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

async function dbOperations() {
  try {
    // connect DB
    await mongoose.connect('mongodb://localhost/pcat-test-db');
    console.log('Database connected succesfully.');

    // create schema
    const PhotoSchema = new Schema({
      title: String,
      description: String,
    });

    const Photo = mongoose.model('Photo', PhotoSchema);

    // create a photo
    /*Photo.create({
  title: 'Photo Title 2',
  description: 'Photo description 2 lorem ipsum',
    });*/

    try {
      // update photo
      const id = '68a18918ce0805bedfbf857a';
      const updatedPhoto = await Photo.findByIdAndUpdate(
        id,
        {
          title: 'Photo Title 1 (updated)',
          description: 'Photo description 1 updated',
        },
        { new: true }
      );
    } catch (err) {
      console.error('update photo error');
    }

    try {
      // delete a photo
      const id_delete = '68a18c392a16e2c8222331eb';

      const deletePhoto = await Photo.findByIdAndDelete(id_delete);
      console.log('photo is removed');
    } catch (err) {
      console.error('delete photo error', err);
    }

    try {
      // read a photo
      const photos = await Photo.find({});
      console.log(photos);
    } catch (err) {
      console.error('reading photo error', err);
    }
  } catch (err) {
    console.error('Database connect error', err);
  }
}

dbOperations();

```