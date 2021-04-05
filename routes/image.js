import express from  'express';
import {controller} from '../controllers/imageControllers.js';
import {middleware} from '../models/middleware.js';



//console.log(success)
const app = express();
const router = express.Router();
/*const apiinfo= {"first_page_url": "http://galleryservice.test?page=1",
"from": 1,
"last_page": 1,
"last_page_url": "http://galleryservice.test?page=1",
"next_page_url": null,
"path": "http://galleryservice.test",
"per_page": 20,
"prev_page_url": null,
"to": 3,
"total": 3}*/

app.use(express.json())
// all routes in here are starting with / users

//Post/Create a image
router.post('/sets/:set_id/images', middleware("collections"), controller.post);

//Get all images
router.get('/images/:set_id',controller.get);


//Get a image
router.get('/images/:image_id',controller.getone)

//Update a collection
router.put("/images/:image_id", middleware("collections"), controller.put)

//delete a collection
router.delete("/images/:images_id", controller.delete)


export default router;