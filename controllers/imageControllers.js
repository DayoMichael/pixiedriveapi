import {pool} from '../models/db.js';
import {success} from '../models/responseApi.js'


export const controller = {
    post: async (req, res) => {
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
    },

    get: async (req, res) => {
        const{set_id} = req.params
        try {
            const allImages= await pool.query("SELECT * FROM images WHERE set_id = $1",[set_id]);
            res.status(200)
            .json(success("success", {data: allImages.rows }, res.statusCode))
        }catch (err) {
            console.error(err.message)
        }
    
    },

    getone: async (req, res) => {
        const{image_id} = req.params
        try{
            const image = await pool.query("SELECT * FROM images WHERE image_id = $1",[image_id])
            res.status(200)
            .json(success("success", image.rows[0], res.statusCode))
        }catch (err) {
            console.error(err.message)
    
        }
    },

    put: async (req,res)=>{
        const{image_id} = req.params; //WHERE
        try{
            const {name, path} = req.body; //SET
            
           const updateCollection = await pool.query("UPDATE images SET name = $1 , path = $2 WHERE image_id = $3", [name, path, image_id]);
    
           res.status(200)
           .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    }, 

    delete: async (req,res)=>{
        const{image_id, set_id} = req.params; //WHERE
        try{
          // const {name} = req.body; //SET
           const deletecollection = await pool.query("DELETE FROM images WHERE image_id = $1 ", [image_id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    }

}