import {pool} from '../models/db.js';
import {success} from '../models/responseApi.js'

export const controller = {
    post: async (req, res) => {
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
    },

    get: async (req, res) => {
        try {
            const allSets = await pool.query("SELECT * FROM collectionsets");
            res.status(200)
            .json(success("success", { data: allSets.rows }, res.statusCode))
        }catch (err) {
            console.error(err.message)
        }
    },

    getone: async (req, res) => {
        const{set_id} = req.params
        try{
            const set = await pool.query("SELECT * FROM collectionsets WHERE set_id = $1",[set_id])
            res.status(200)
            .json(success("success", set.rows[0], res.statusCode))
        }catch (err) {
            console.error(err.message)
    
        }
    },

    put: async (req,res)=>{
        const{collections_id , set_id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
    
           const updateset = await pool.query("UPDATE collectionsets SET name = $1 WHERE collections_id = $2 AND set_id = $3 RETURNING *", [name, collections_id, set_id]);
    
           res.status(200)
           .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    },

    delete: async (req,res)=>{
        const{set_id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           const deleteset = await pool.query("DELETE FROM collectionsets WHERE set_id = $1", [set_id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            console.error(err.message)
        }
    }
}
