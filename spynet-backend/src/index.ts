import express from 'express';
import dotenv from 'dotenv';
import AppDataSource from './datasource';
import recipeRouter from './routes/recipeRoute';
import ingredientRouter from './routes/ingredientsRoute';
import UserRouter from './routes/userRoute';
import LocationRouter from './routes/locationRoute';

// remember to install Cors (npm i cors), then require it, not import
const cors = require('cors');

const app = express();
// remember to use Cors
app.use(cors()); // middleware

dotenv.config();

// import datasource
const appDataSource = AppDataSource;

app.get('/', (req, res) => {
    res.send('DV300 Backend');
});

// get all users
app.get('/users', async (req, res) => {
    // const users = await appDataSource.manager.find(Lecturer);

    // console.log(users);
    // res.send(users);
})

app.get('/users/:id', async (req, res) => {
    var id = parseInt(req.params.id);

    // const users = await appDataSource.getRepository(Lecturer).findOneBy({ id: id });

    // res.send(users);
})

// IMPORT ENDPOINTS
app.use('/recipes', recipeRouter);
app.use('/ingredients', ingredientRouter);
app.use('/users', UserRouter)
app.use('/locations', LocationRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000');
});