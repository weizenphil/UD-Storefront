"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const auth_1 = __importDefault(require("../utilities/auth"));
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params?.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const product_result = await store.create(product);
        res.json(product_result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    };
    try {
        const product_result = await store.update(product);
        res.json(product_result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_1.default, create);
    app.put('/products', auth_1.default, update);
};
exports.default = productRoutes;
