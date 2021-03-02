import express from  'express';
import {pool} from '../db.js';
import {success} from '../responseApi.js'

//console.log(success)
const app = express();
const router = express.Router();
/*const apiinfo= {"first_page_url": "http://galleryservice.test?page=1",
"from": 1,
"last_page": 1,
"last_page_url": "http://galleryservice.test?page=1",
"next_page_url": null,
"path": "http://galleryservice.test",
"per_page": 20,
"prev_page_url": null,
"to": 3,
"total": 3}*/

app.use(express.json())
// all routes in here are starting with / users

//Post/Create a image
router.post('/sets/:set_id/images', async (req, res) => {
    const{set_id} = req.params;
    try{
        const { name, path} = req.body;
        const newImage = await pool.query("INSERT INTO images (name, path, set_id ) VALUES ($1, $2, $3) RETURNING * ", 
        [name, path, set_id]);
        res.status(200)
        .json(success("Collection created", newImage.rows[0], res.statusCode ))
        console.log(req.body)
    } catch(err){
        console.error(err.message)
    }
    //console.log('POST ROUTE REACHED');
    //console.log(req.body);

    //users.push();
    //res.send('Post route reached')
});

//Get all images
router.get('/images/:set_id',async (req, res) => {
    const{set_id} = req.params
    try {
        const allImages= await pool.query("SELECT * FROM images WHERE set_id = $1",[set_id]);
        res.status(200)
        .json(success("success", {data: allImages.rows }, res.statusCode))
    }catch (err) {
        console.error(err.message)
    }
    //console.log(users);
    //res.send(users);
});


//Get a image
router.get('/images/:image_id', async (req, res) => {
    const{image_id} = req.params
    try{
        const image = await pool.query("SELECT * FROM images WHERE image_id = $1",[image_id])
        res.status(200)
        .json(success("success", image.rows[0], res.statusCode))
    }catch (err) {
        console.error(err.message)

    }
})

//Update a collection
router.put("/images/:image_id", async (req,res)=>{
    const{image_id} = req.params; //WHERE
    try{
        const {name, path} = req.body; //SET
        
       const updateCollection = await pool.query("UPDATE images SET name = $1 , path = $2 WHERE image_id = $3", [name, path, image_id]);

       res.status(200)
       .json(success("success", "Data Updated", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})

//delete a collection
router.delete("/images/:images_id", async (req,res)=>{
    const{image_id, set_id} = req.params; //WHERE
    try{
      // const {name} = req.body; //SET
       const deletecollection = await pool.query("DELETE FROM images WHERE image_id = $1 ", [image_id]);
       res.status(200)
       .json(success("success", "Data Deleted", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})


export default router;