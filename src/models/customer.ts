import postgres from "../db";
import bcrypt from 'bcrypt';

export type Customer = {
    id?: number;
    name: string;
    email: string;
    password: string;
    account: number;
}

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class CustomerStore {
    authenticate(email: string, password: string) {
        throw new Error('Method not implemented.');
    }
   
   
    async index(): Promise<Customer[]> {
        try {
            const conn = await postgres.connect()
            const query = `SELECT * FROM customer`
            const result = await conn.query(query)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error(`Cannot get customer ${err}`)
        }
    }
    async show(id: string): Promise<Customer> {
        try {
            const conn = await postgres.connect()
            const query = `SELECT * FROM customer where id='${id}'`
            const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot find customer with id = ${id}. Error: ${err}`)
        }
    }
    async create(customer: Customer): Promise<Customer> {
        try {
            const conn = await postgres.connect()
            
            const query = 'INSERT INTO customer (name, email, password, account) VALUES($1, $2, $3, $4) RETURNING *'
            const hash = bcrypt.hashSync(customer.password + pepper, parseInt(saltRounds));
            const result = await conn.query(query, [customer.name, customer.account, customer.email, hash])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot create customer: ${err}`)
        }
    }
    async delete(id: string) {
        try {
            const conn =await postgres.connect()
            const query = 'DeleteFROM customer WHERE id=${id}'
            const result = await conn.query(query)
            conn.release();
            return result.rows[0]
        
        }
        catch(err) {
            throw new Error(`Cannot delete customer ${id}.Error: ${err}`)
        }
    }
}
async (email: string, password: string): Promise<Customer|null> => {
    const conn = await postgres.connect();
    const sql = `SELECT * FROM customer WHERE email = '${email}'`
    const result = await conn.query(sql);
    
    if (result.rows.length){
        
        const customer = result.rows[0]
        if (bcrypt.compareSync(password+pepper, customer.password)){
            return customer
        }
    }
    else{
        
        return null;
    }
    return null;
}

exports.CustomerStore = CustomerStore;