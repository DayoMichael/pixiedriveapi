import express from 'express';
import bodyParser from 'body-parser';
import collectionRoutes from './routes/collection.js';


const app = express();
const PORT = 5000;
// consr
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use('/collections', collectionRoutes);

//Routes
/*app.get('/',(req,res) => {
    console.log('[TEST]!');
    res.send('Hello from Homepage')

});
*/
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
