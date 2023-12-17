"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const supertest_1 = __importDefault(require("supertest"));
dotenv_1.default.config();
const store = new users_1.UserStore();
describe('1. Unit testing the user model', () => {
    it('1.1 should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('1.2 should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('1.3 should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('1.4 create method should add a user', async function () {
        const result = await store.create({
            username: 'wmuza',
            password: process.env.POSTGRES_PASSWORD,
            firstname: 'Wilbert',
            lastname: 'Muza'
        });
        expect(result.username).toEqual('wmuza');
    });
    it('1.5 index method should return a list of users', async function () {
        const result = await store.index();
        expect(result[0].firstname).toEqual('Wilbert');
    });
    it('1.6 show method should return the correct user', async function () {
        const result = await store.show('1');
        expect(result.lastname).toEqual('Muza');
    });
    it('1.7 authenticate method should be true', async function () {
        const result = await store.authenticate({
            username: 'wmuza',
            password: process.env.POSTGRES_PASSWORD
        });
        expect(result.username).toEqual('wmuza');
    });
});
describe('1.10 Unit testing the users Endpoints', () => {
    let userToken;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
    });
    it('1.11 Should authenticate user and return token on this endpoint /authenticate', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/authenticate')
            .send({ username: 'wmuza', password: process.env.POSTGRES_PASSWORD })
            .set('Accept', 'application/json');
        userToken = response.body.token;
        expect(userToken).toBeTruthy();
        expect(response.status).toEqual(200);
    });
    it('1.12 Create the users endpoint', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({
            username: 'wmuza',
            password: process.env.POSTGRES_PASSWORD,
            firstname: 'Wilbert',
            lastname: 'Muza'
        })
            .set('Authorization', `Basic ${userToken}`);
        expect(response.status).toEqual(200);
    });
    it('1.13 Gets the /users endpoint', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/users')
            .set('Authorization', `Basic ${userToken}`);
        expect(response.status).toEqual(200);
    });
    it('1.14 Gets the /users/:id endpoint', async () => {
        //Test the endpoint and see if it returns status code of 200
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/users/1')
            .set('Authorization', `Basic ${userToken}`);
        expect(response.status).toEqual(200);
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
