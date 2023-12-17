"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const sitemap_1 = __importDefault(require("./handlers/sitemap"));
const app = (0, express_1.default)();
let port = 3000;
if (process.env.ENV === 'test') {
    port = 3001;
}
const adress = `127.0.0.1:${port}`;
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('This is the overall route!');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, sitemap_1.default)(app);
app.listen(port, () => {
    console.info(`starting app on: http://${address}`);
});
exports.default = app;
