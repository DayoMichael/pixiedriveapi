import express from  'express';
import {pool} from '../db.js';
import {success} from '../responseApi.js'

//console.log(success)
const app = express();
const router = express.Router();
const apiinfo= {"first_page_url": "http://galleryservice.test?page=1",
"from": 1,
"last_page": 1,
"last_page_url": "http://galleryservice.test?page=1",
"next_page_url": null,
"path": "http://galleryservice.test",
"per_page": 20,
"prev_page_url": null,
"to": 3,
"total": 3}

app.use(express.json())
// all routes in here are starting with / users

//Post/Create a collection
router.post('/', async (req, res) => {
    try{
        const { name } = req.body;
        const newCollection = await pool.query("INSERT INTO collections (name) VALUES ($1) RETURNING * ", 
        [name]);
        res.status(200)
        .json(success("Collection created", newCollection.rows[0], res.statusCode ))
        console.log(req.body)
    } catch(err){
        console.error(err.message)
    }
    //console.log('POST ROUTE REACHED');
    //console.log(req.body);

    //users.push();
    //res.send('Post route reached')
});

//Get all collections
router.get('/',async (req, res) => {
    try {
        const allCollections = await pool.query("SELECT * FROM collections");
        res.status(200)
        .json(success("success", { "current_page": 1, data: allCollections.rows , apiinfo}, res.statusCode))
    }catch (err) {
        console.error(err.message)
    }
    //console.log(users);
    //res.send(users);
});


//Get a collection
router.get('/:id', async (req, res) => {
    const{id} = req.params
    try{
        const collection = await pool.query("SELECT * FROM collections WHERE collections_id = $1",[id])
        res.status(200)
        .json(success("success", collection.rows[0], res.statusCode))
    }catch (err) {
        console.error(err.message)

    }
})

//Update a collection
router.put("/:id", async (req,res)=>{
    const{id} = req.params; //WHERE
    try{
       const {name} = req.body; //SET

       const updateCollection = await pool.query("UPDATE collections SET name = $1 WHERE collections_id = $2", [name, id]);

       res.status(200)
       .json(success("success", "Data Updated", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})

//delete a collection
router.delete("/:id", async (req,res)=>{
    const{id} = req.params; //WHERE
    try{
       const {name} = req.body; //SET
       const deletecollection = await pool.query("DELETE FROM collections WHERE collections_id = $1", [id]);
       res.status(200)
       .json(success("success", "Data Deleted", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})


export default router;