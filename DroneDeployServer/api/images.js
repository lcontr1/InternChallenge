const express = require('express')
const router = express.Router()
const { getAllImages, getImagesByID } = require('../db/helpers/authors')
const client = require('../db/client')

//get all images /api/images
router.get('/images', async(req, res, next) => {
    try{
        const images = await getAllImages()
        res.send(images)
    }catch(error) {
        next(error)
    }
})

//get image by id /api/images/imageID
router.get('/:imagesID', async(req, res, next) => {
    try{
        const image = await getImagesByID(req.params.image_id)
        res.send(image)
    }catch(error){
        next(error)
    }
})


module.exports = router