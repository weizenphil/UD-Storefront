"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapQueries = void 0;
const database_1 = __importDefault(require("../database"));
class SitemapQueries {
    async currentOrderByUser(id) {
        try {
            const sql = `SELECT name, status, quantity, price 
         FROM orders 
         INNER JOIN order_products ON orders.id = order_products.order_id 
         INNER JOIN products ON order_products.product_id = products.id
         WHERE user_id=($1)
         ORDER BY orders.timestamp DESC
        `;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get order ${id}. Error: ${err}`);
        }
    }
}
exports.SitemapQueries = SitemapQueries;
