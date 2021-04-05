//import {pool} from '../models/db.js';
import {success, error} from '../models/responseApi.js';
import {colquery} from '../models/queries.js';


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
            let request = req.app.locals.db
            const newCollection = await request.query(colquery.post, 
            [name]);
            res.status(200)
            .json(success("Collection created", newCollection.rows[0], res.statusCode ))
            console.log(req.body)
        } catch(err){
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
        
    },
    get: async (req, res) => {
        try {
            let request = req.app.locals.db
            const allCollections = await request.query(colquery.getall);
            res.status(200)
            .json(success("success", { "current_page": 1, data: allCollections.rows , apiinfo}, res.statusCode))
            
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    },

    getone: async (req, res) => {
        const{id} = req.params
        try{
            let request = req.app.locals.db
            const collection = await request.query(colquery.getone,[id])
            res.status(200)
            .json(success("success", collection.rows[0], res.statusCode))
        }catch (err) {
            res.status(500)
            .json(error(err.message, res.statusCode))
            console.error(err.message) 
    
        }
    },

    put: async (req,res)=>{
        const{id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           let request = req.app.locals.db
           const updateCollection = await request.query(colquery.put, [name, id]);
    
           res.status(200)
           .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, 500 ))
            console.error(err.message)
        }
    },

    delete: async (req,res)=>{
        const{id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           let request = req.app.locals.db
           const deletecollection = await request.query(colquery.delete, [id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    }
};