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
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../models/customer");
const store = new customer_1.CustomerStore();
describe("Test Database Models for functionality", () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it("Expect retrieval of list of customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.index();
        expect(res).toEqual([]);
    }));
});
