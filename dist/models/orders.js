"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get order ${id}. Error: ${err}`);
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.status, order.user_id]);
            const order_result = result.rows[0];
            conn.release();
            return order_result;
        }
        catch (err) {
            throw new Error(`Cannot add oder with status ${order.status}. Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const order = await this.show(orderId);
            if (order.status == 'closed')
                throw new Error(`Cannot add product ${productId} to a closed order ${OrderStore}`);
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order_result = result.rows[0];
            conn.release();
            return order_result;
        }
        catch (err) {
            throw new Error(`Cannot add product ${productId} to order ${orderId}. Error: ${err}`);
        }
    }
    async update(order) {
        try {
            const sql = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.status, order.user_id, order.id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get order ${order.id}. Error: ¢{err}`);
        }
    }
}
exports.OrderStore = OrderStore;
