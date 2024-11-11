const client = require('../client')

const getAllImages = async() => {
    try {
        const { rows } = await client.query(
            `
            SELECT * FROM images;
            `
        )
        return rows
    } catch (error) {
        throw error
    }
}

const getImagesById = async(imageID) => {
    try {
        const { rows: [image] } = await client.query(
            `
            SELECT * FROM images
            WHERE "imageID" = ${image_id};
            `
        )
        return imageID;
    } catch (error) {
        throw error
    }
}

module.exports = {getAllImages, getImagesById }