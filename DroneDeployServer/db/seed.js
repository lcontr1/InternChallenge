const client = require('./client')
//don't change this - you're great!

const { images } = require('./seedData')


//drop existing tables - For dropping/creating the tables, you’ll be using client.query, where client is our postgres setup coming from a client.js file in our DB folder
const dropTables = async () => {
    try{
        
        console.log('Starting to drop tables')
        await client.query(`
        DROP TABLE IF EXISTS images;
        
        `)
        console.log('Tables dropped!')
    }catch (error){
        console.log('Error dropping tables')
        throw error
    }
}

//creating tables with the correct data types and restrictions
const createTables = async () => {
   try { 
    console.log('building tables...')
    await client.query(`
    
    CREATE TABLE images (
        image_id VARCHAR(10) PRIMARY KEY,
                timestamp TIMESTAMP,
                latitude VARCHAR(20),
                longitude VARCHAR(20),
                altitude_m INTEGER,
                heading_deg INTEGER,
                file_name VARCHAR(50),
                camera_tilt_deg INTEGER,
                focal_length_mm INTEGER,
                iso INTEGER,
                shutter_speed VARCHAR(20),
                aperture VARCHAR(10),
                color_temp_k INTEGER,
                image_format VARCHAR(20),
                file_size_mb FLOAT,
                drone_speed_mps FLOAT,
                battery_level_pct INTEGER,
                gps_accuracy_m FLOAT,
                gimbal_mode VARCHAR(20),
                subject_detection VARCHAR(20),
                image_tags TEXT
    );
   
     
    `)
    console.log("tables built!")
    //write it as datakey - use "" if using camelCase then data type and if required write NOT NULL(doesnt need to be on a primary key). needs to go in order as seed data. foreign key has a REFERENCES to the table it is referencing and the name of the column (will also have a NOT NULL). 

    //if write something wrong when creating table then drop the table and recreate it
    } catch (error) {
        console.error(error)
    }

}


//populate the tables - Populating will rely on importing functions and routes that we have not made yet, so feel free to either name them and their files here, or put placeholders
//create comments
const createInitialImages = async () => {
    try {  
        console.log('starting images')
       for (const image of images) {
        console.log(image.image_id)
        const { rows } = await client.query(
            `
            INSERT INTO images(image_id,
                    timestamp,
                    latitude,
                    longitude,
                    altitude_m,
                    heading_deg,
                    file_name,
                    camera_tilt_deg,
                    focal_length_mm,
                    iso,
                    shutter_speed,
                    aperture,
                    color_temp_k,
                    image_format,
                    file_size_mb,
                    drone_speed_mps,
                    battery_level_pct,
                    gps_accuracy_m,
                    gimbal_mode,
                    subject_detection,
                    image_tags)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);
            `, [image.image_id, image.timestamp,image.latitude, image.longitude, image.altitude_m, image.heading_deg, image.file_name, image.camera_tilt_deg, image.focal_length_mm, image.iso, image.shutter_speed, image.aperture, image.color_temp_k, image.image_format, image.file_size_mb, image.drone_speed_mps, image.battery_level_pct, image.gps_accuracy_m, image.gimbal_mode, image.subject_detection, image.image_tags]
            )
           
       }
       console.log("created images")
    }catch (error) {
        throw error
    }
}


//Call all the functions to build my database - its an async function

const buildDb = async () => {
    try {
        console.log("starting the build")
        //Connect to the local database
        client.connect()

        //run our functions
        await dropTables()
        await createTables()

        await createInitialImages()

    } catch (error){
        console.log('Error buildDb')
        throw error
        //finally will always run, whether the catch triggers or not
    } finally {
        client.end()
    }

}

buildDb()