"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get user ${id}. Error: ${err}`);
        }
    }
    async create(user) {
        try {
            const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const saltRounds = parseInt(process.env.SALT_ROUNDs);
            const hash = bcrypt_1.default.hashSync(user.password, saltRounds);
            const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash]);
            const user_result = result.rows[0];
            conn.release();
            return user_result;
        }
        catch (err) {
            throw new Error(`Cannot add user ${user.username}. Error: ${err}`);
        }
    }
    async authenticate(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT username, password FROM users WHERE username=($1)';
            const result = await conn.query(sql, [user.username]);
            const user_result = result.rows[0];
            conn.release();
            const checkingPassword = bcrypt_1.default.compareSync(user.password, user_result.password);
            if (!checkingPassword)
                throw new Error('Password is incorret');
            return user_result;
        }
        catch (err) {
            throw new Error(`Cannot add users. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
