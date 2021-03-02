import {pool} from '../models/db.js';
import {success} from '../models/responseApi.js'

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

export const controller = {
    post: async (req, res) => {
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
        
    },
    get: async (req, res) => {
        try {
            const allCollections = await pool.query("SELECT * FROM collections");
            res.status(200)
            .json(success("success", { "current_page": 1, data: allCollections.rows , apiinfo}, res.statusCode))
        }catch (err) {
            console.error(err.message)
        }
    },

    getone: async (req, res) => {
        const{id} = req.params
        try{
            const collection = await pool.query("SELECT * FROM collections WHERE collections_id = $1",[id])
            res.status(200)
            .json(success("success", collection.rows[0], res.statusCode))
        }catch (err) {
            console.error(err.message)
    
        }
    },

    put: async (req,res)=>{
        const{id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
    
           const updateCollection = await pool.query("UPDATE collections SET name = $1 WHERE collections_id = $2", [name, id]);
    
           res.status(200)
           .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    },

    delete: async (req,res)=>{
        const{id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           const deletecollection = await pool.query("DELETE FROM collections WHERE collections_id = $1", [id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    }
};