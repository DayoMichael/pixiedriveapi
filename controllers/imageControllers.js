//import {pool} from '../models/db.js';
import {success, error} from '../models/responseApi.js'
import {imgquery} from '../models/queries.js'


export const controller = {
    post: async (req, res) => {
        const{set_id} = req.params;
        try{
            const { name, path} = req.body;
            let request = req.app.locals.db
            const newImage = await request.query(imgquery.post, 
            [name, path, set_id]);
            res.status(200)
            .json(success("Collection created", newImage.rows[0], res.statusCode ))
            console.log(req.body)
        } catch(err){
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    },

    get: async (req, res) => {
        const{set_id} = req.params
        try {
            let request = req.app.locals.db
            const allImages= await request.query(imgquery.getall,[set_id]);
            res.status(200)
            .json(success("success", {data: allImages.rows }, res.statusCode))
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    
    },

    getone: async (req, res) => {
        const{image_id} = req.params
        try{
            let request = req.app.locals.db
            const image = await request.query(imgquery.getone,[image_id])
            res.status(200)
            .json(success("success", image.rows[0], res.statusCode))
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
    
        }
    },

    put: async (req,res)=>{
        const{image_id} = req.params; //WHERE
        try{
            const {name, path} = req.body; //SET
            let request = req.app.locals.db
            const updateCollection = await request.query(imgquery.put, [name, path, image_id]);
    
            res.status(200)
            .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    }, 

    delete: async (req,res)=>{
        const{image_id, set_id} = req.params; //WHERE
        try{
          // const {name} = req.body; //SET
          let request = req.app.locals.db
           const deletecollection = await request.query(imgquery.delete, [image_id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    }

}