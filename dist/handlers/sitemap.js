"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sitemap_1 = require("../services/sitemap");
const auth_1 = __importDefault(require("../utilities/auth"));
const sitemap = new sitemap_1.SitemapQueries();
const currentOrderByUser = async (req, res) => {
    try {
        const order = await sitemap.currentOrderByUser(req.params?.userId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const sitemapRoutes = (app) => {
    app.get('/user/:userId/orders', auth_1.default, currentOrderByUser);
};
exports.default = sitemapRoutes;
