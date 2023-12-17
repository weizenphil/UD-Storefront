"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const supertest_1 = __importDefault(require("supertest"));
const sitemap_1 = require("../sitemap");
const orders_1 = require("../../models/orders");
dotenv_1.default.config();
const store = new sitemap_1.SitemapQueries();
const orderStore = new orders_1.OrderStore();
describe('4. Unit testing the Dasboard Models', () => {
    it('4.1 Should have an currentOrderByUser method', () => {
        expect(store.currentOrderByUser).toBeDefined();
    });
    it('4.2 Should return a list of orders made by a user', async () => {
        const result = await store.currentOrderByUser('1');
        expect(result).toBeTruthy();
    });
});
describe('5. Unit testing the Dashboard Endpoints', () => {
    let userToken;
    it('5.1 Should authenticate user and return token on this endpoint /authenticate', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/authenticate')
            .send({ username: 'wmuza', password: process.env.POSTGRES_PASSWORD })
            .set('Accept', 'application/json');
        userToken = response.body.token;
        expect(userToken).toBeTruthy();
        expect(response.status).toEqual(200);
    });
    it('5.2 Gets the /user/:userId/orders endpoint', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/user/1/orders')
            .set('Authorization', `Basic ${userToken}`);
        expect(response.status).toEqual(200);
    });
});
