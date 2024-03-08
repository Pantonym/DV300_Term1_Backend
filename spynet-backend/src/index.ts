import express from 'express';
import dotenv from 'dotenv';
// import AppDataSource from './datasource';

// remember to install Cors (npm i cors), then require it, not import
const cors = require('cors');

const app = express();
// remember to use Cors
app.use(cors()); // middleware

dotenv.config();

// import datasource
// const appDataSource = AppDataSource;

app.get('/', (req, res) => {
    res.send('Send, Help!');
});

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
// app.use('/inventory', inventoryRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000');
});