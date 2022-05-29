import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

let localPoolConfig = {
    host:'localhost',
    user:'postgres',
    password:'password',
    database:'bookstore_database'
};


const poolConfig = process.env.DATABASE_URL?{
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
} :localPoolConfig;

const pool = new Pool(poolConfig);


export default pool;



