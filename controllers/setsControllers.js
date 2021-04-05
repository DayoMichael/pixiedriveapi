//import {pool} from '../models/db.js';
import {success} from '../models/responseApi.js';
import {setquery} from '../models/queries.js'

export const controller = {
    post: async (req, res) => {
        const{collections_id} = req.params
        try{
            const { name } = req.body;
            let request = req.app.locals.db
            const newSet = await request.query(setquery.post, 
            [name, collections_id]);
            res.status(200)
            .json(success("Set created", newSet.rows, res.statusCode ))
            console.log(req.body)
        } catch(err){
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    },

    get: async (req, res) => {
        try {
            let request = req.app.locals.db
            const allSets = await request.query(setquery.getall);
            res.status(200)
            .json(success("success", { data: allSets.rows }, res.statusCode))
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    },

    getone: async (req, res) => {
        const{set_id} = req.params
        try{
            let request = req.app.locals.db
            const set = await request.query(setquery.getone,[set_id])
            res.status(200)
            .json(success("success", set.rows[0], res.statusCode))
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
    
        }
    },

    put: async (req,res)=>{
        const{collections_id , set_id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           let request = req.app.locals.db
           const updateset = await request.query(setquery.put, [name, collections_id, set_id]);
    
           res.status(200)
           .json(success("success", "Data Updated", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    },

    delete: async (req,res)=>{
        const{set_id} = req.params; //WHERE
        try{
           const {name} = req.body; //SET
           let request = req.app.locals.db
           const deleteset = await request.query(setquery.delete, [set_id]);
           res.status(200)
           .json(success("success", "Data Deleted", res.statusCode)) 
        }catch (err) {
            res.status(500).json(error(err.message, res.statusCode))
            console.error(err.message)
        }
    }
}
