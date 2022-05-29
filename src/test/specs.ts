import {Customer, CustomerStore} from "../models/customer"
const store = new CustomerStore()
describe("Test Database Models for functionality", () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it("Expect retrieval of list of customers", async () => {
        const res = await store.index();
        expect(res).toEqual([]);
    });
});