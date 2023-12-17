"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const auth_1 = __importDefault(require("../utilities/auth"));
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params?.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id
    };
    try {
        const order_result = await store.create(order);
        res.json(order_result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const order = {
        quantity: parseInt(req.body.quantity),
        order_id: parseInt(req.params.id),
        product_id: parseInt(req.body.product_id)
    };
    try {
        const order_result = await store.addProduct(order.quantity, order.order_id, order.product_id);
        res.json(order_result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    const order = {
        id: req.body.id,
        status: req.body.status,
        user_id: req.body.user_id
    };
    try {
        const order_result = await store.update(order);
        res.json(order_result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', auth_1.default, index);
    app.get('/orders/:id', auth_1.default, show);
    app.post('/orders', auth_1.default, create);
    app.put('/orders', auth_1.default, update);
    app.post('/orders/:id/products', auth_1.default, addProduct);
};
exports.default = orderRoutes;
