const client = require('../client')
const util = require('../util')

//not sure if this page is correct
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

const getImagesById = async (image_id) => {
    try {
      const {
        rows: [image],
      } = await client.query(`
      SELECT * FROM character WHERE "image_id" = ${image_id};
   `);
      return image;
    } catch (error) {
      throw error;
    }
  };

module.exports = {getAllImages, getImagesById }