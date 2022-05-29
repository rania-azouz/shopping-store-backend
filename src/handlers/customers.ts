import express, {Request, Response} from 'express'
import {Customer, CustomerStore } from "../models/customer"
import jwt from 'jsonwebtoken'
import verifyAuthToken from "../middleware/auth";

const secret = process.env.TOKEN_SECRET as string;
const store = new CustomerStore()

const index = async (req:Request, res: Response) => {
    const customers = await store.index()
    res.json()
}

const show = async (req:Request, res: Response) => {
    
    const customer = await store.show(req.params.id)
    res.json(customer)
}
const create = async (req: Request, res: Response)=> {
    
    const customer= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        account: req.body.account,
    }

    const newCustomer = await store.create(customer)
    res.json(newCustomer)
    var token = jwt.sign({customer: newCustomer}, secret)
    res.json(token)
}


const login =  async (req: Request, res: Response)=> {
    const customerAuth = (req.body.email, req.body.password)
    res.json(customerAuth)
    if (customerAuth) {
        var token = jwt.sign({customer:customerAuth }, secret);
        res.json(token)
    }
    else {
        res.json(customerAuth)
    }

}
const remove =async (req: Request, res: Response)=> {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const customer_routes = (app: express.Application) => {
    app.get('/', index)
    app.get('/show/:id', verifyAuthToken, show)
    app.post('/create', create)
    app.delete('/delete', remove)
    app.post('/login', login);
   
}


export default customer_routes
