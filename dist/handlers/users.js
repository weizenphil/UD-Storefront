"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const auth_1 = __importDefault(require("../utilities/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params?.id);
        res.json(user);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    try {
        const user_result = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: user_result }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const user_result = await store.authenticate(user);
        const token = jsonwebtoken_1.default.sign({ user: user_result }, process.env.TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', auth_1.default, index);
    app.get('/users/:id', auth_1.default, show);
    app.post('/users', create);
    app.post('/authenticate', authenticate);
};
exports.default = userRoutes;
