"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../models/customer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const secret = process.env.TOKEN_SECRET;
const store = new customer_1.CustomerStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield store.index();
    res.json();
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield store.show(req.params.id);
    res.json(customer);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        account: req.body.account,
    };
    const newCustomer = yield store.create(customer);
    res.json(newCustomer);
    var token = jsonwebtoken_1.default.sign({ customer: newCustomer }, secret);
    res.json(token);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerAuth = (req.body.email, req.body.password);
    res.json(customerAuth);
    if (customerAuth) {
        var token = jsonwebtoken_1.default.sign({ customer: customerAuth }, secret);
        res.json(token);
    }
    else {
        res.json(customerAuth);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.body.id);
    res.json(deleted);
});
const customer_routes = (app) => {
    app.get('/', index);
    app.get('/show/:id', auth_1.default, show);
    app.post('/create', create);
    app.delete('/delete', remove);
    app.post('/login', login);
};
exports.default = customer_routes;
