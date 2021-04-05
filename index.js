import express from 'express';
import bodyParser from 'body-parser';
import collectionRoutes from './routes/collection.js';
import setRoutes from './routes/sets.js';
import imageRoutes from './routes/image.js';
import cors from 'cors';
import emailRoute from './routes/email.js';
import { pool } from './models/db.js'


const app = express();
const PORT = 5000;


;(async function(){
    const database = await pool.connect();
    //console.log('db', database);
    app.locals.db = database
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
})()

app.use(bodyParser.json());

app.use(cors());
app.use('/', collectionRoutes);
app.use('/', setRoutes);
app.use('/', imageRoutes);
app.use('/', emailRoute)
