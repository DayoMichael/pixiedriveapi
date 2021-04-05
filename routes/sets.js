import express from  'express';
//import {pool} from '../models/db.js';
//import {success} from '../models/responseApi.js';
import {controller} from '../controllers/setsControllers.js';
import {middleware} from '../models/middleware.js';

const router = express.Router();
const app = express();
app.use(express.json())

//Post/Create a collection
router.post('/collections/:collections_id/sets', middleware("collections"),controller.post);


//Get all collections
router.get('/sets',controller.get);

//Get a set
router.get('/sets/:set_id', controller.getone)

//Update a collection
router.put("/collections/:collections_id/sets/:set_id", middleware("collections"), controller.put)

//delete a collection
router.delete("/sets/:set_id", controller.delete)

export default router;