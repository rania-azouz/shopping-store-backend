import express from 'express';
import {join } from 'path';
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import customers from './handlers/customers';

const app = express();
const port = 5000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'}
dotenv.config()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors(corsOptions))
app.use('/', express.static(join(__dirname,'public')));

customers (app)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
