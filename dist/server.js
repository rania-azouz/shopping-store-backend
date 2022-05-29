"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const customers_1 = __importDefault(require("./handlers/customers"));
const app = (0, express_1.default)();
const port = 5000;
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
app.use('/', express_1.default.static((0, path_1.join)(__dirname, 'public')));
(0, customers_1.default)(app);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
