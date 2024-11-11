const express = require('express')
const router = express.Router()
const { getAllImages, getImagesById } = require('../db/sqlHelpers/images')
const client = require('../db/client')


//not sure this file is correct
//get all images /api/images
router.get('/', async (req, res, next) => {
    try {
      const images = await getAllImages();
      res.send(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get a specific image by ID
  router.get('/:image_id', async (req, res, next) => {
    try {
      const image = await getImagesById(req.params.image_id);
      if (image) {
        res.send(image);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error'   
   });
    }
  });

module.exports = router;