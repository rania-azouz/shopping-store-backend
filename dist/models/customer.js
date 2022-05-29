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
exports.CustomerStore = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class CustomerStore {
    authenticate(email, password) {
        throw new Error('Method not implemented.');
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_1.default.connect();
                const query = `SELECT * FROM customer`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get customer ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_1.default.connect();
                const query = `SELECT * FROM customer where id='${id}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find customer with id = ${id}. Error: ${err}`);
            }
        });
    }
    create(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_1.default.connect();
                const query = 'INSERT INTO customer (name, email, password, account) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(customer.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(query, [customer.name, customer.account, customer.email, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot create customer: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_1.default.connect();
                const query = 'DeleteFROM customer WHERE id=${id}';
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot delete customer ${id}.Error: ${err}`);
            }
        });
    }
}
exports.CustomerStore = CustomerStore;
(email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.connect();
    const sql = `SELECT * FROM customer WHERE email = '${email}'`;
    const result = yield conn.query(sql);
    if (result.rows.length) {
        const customer = result.rows[0];
        if (bcrypt_1.default.compareSync(password + pepper, customer.password)) {
            return customer;
        }
    }
    else {
        return null;
    }
    return null;
});
exports.CustomerStore = CustomerStore;
