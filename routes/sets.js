import express from  'express';
import {pool} from '../db.js';
import {success} from '../responseApi.js'

const router = express.Router();
const app = express();
app.use(express.json())

//Post/Create a collection
router.post('/collections/:collections_id/sets', async (req, res) => {
    const{collections_id} = req.params
    try{
        const { name } = req.body;
        const newSet = await pool.query("INSERT INTO collectionsets (name, collections_id) VALUES ($1, $2) RETURNING * ", 
        [name, collections_id]);
        res.status(200)
        .json(success("Set created", newSet.rows, res.statusCode ))
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
router.get('/sets',async (req, res) => {
    try {
        const allSets = await pool.query("SELECT * FROM collectionsets");
        res.status(200)
        .json(success("success", { data: allSets.rows }, res.statusCode))
    }catch (err) {
        console.error(err.message)
    }
    //console.log(users);
    //res.send(users);
});

//Get a set
router.get('/sets/:set_id', async (req, res) => {
    const{set_id} = req.params
    try{
        const set = await pool.query("SELECT * FROM collectionsets WHERE set_id = $1",[set_id])
        res.status(200)
        .json(success("success", set.rows[0], res.statusCode))
    }catch (err) {
        console.error(err.message)

    }
})

//Update a collection
router.put("/collections/:collections_id/sets/:set_id", async (req,res)=>{
    const{collections_id , set_id} = req.params; //WHERE
    try{
       const {name} = req.body; //SET

       const updateset = await pool.query("UPDATE collectionsets SET name = $1 WHERE collections_id = $2 AND set_id = $3 RETURNING *", [name, collections_id, set_id]);

       res.status(200)
       .json(success("success", "Data Updated", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})

//delete a collection
router.delete("/sets/:set_id", async (req,res)=>{
    const{set_id} = req.params; //WHERE
    try{
       const {name} = req.body; //SET
       const deleteset = await pool.query("DELETE FROM collectionsets WHERE set_id = $1", [set_id]);
       res.status(200)
       .json(success("success", "Data Deleted", res.statusCode)) 
    }catch (err) {
        console.error(err.message)
    }
})

export default router;