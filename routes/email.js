import express from  'express';
import {controller} from '../controllers/emailControllers.js';

const app = express();
const router = express.Router();

app.use(express.json())

//post request
router.post('/email', controller.post);

export default router;