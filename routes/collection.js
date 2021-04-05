import express from  'express';
import {controller} from '../controllers/collectionControllers.js'
import {middleware} from '../models/middleware.js';

//console.log(success)
const app = express();
const router = express.Router();

app.use(express.json())
// all routes in here are starting with / users

//Post/Create a collection
router.post('/collections',middleware("collections") , controller.post);

//Get all collections
router.get('/collections', controller.get );


//Get a collection
router.get('/collections/:id', controller.getone)

//Update a collection
router.put("/collections/:id", middleware("collections"), controller.put)

//delete a collection
router.delete("/:id", controller.delete)


export default router;