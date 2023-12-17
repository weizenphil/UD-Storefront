"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get product ${id}. Error: ${err}`);
        }
    }
    async create(product) {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.name, product.price]);
            const product_result = result.rows[0];
            conn.release();
            return product_result;
        }
        catch (err) {
            throw new Error(`Cannot add product ${product.name}. Error: ${err}`);
        }
    }
    async update(product) {
        try {
            const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.name, product.price, product.id]);
            const product_result = result.rows[0];
            conn.release();
            return product_result;
        }
        catch (err) {
            throw new Error(`Cannot update product ${product.id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
