/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
	order_id INTEGER NOT NULL REFERENCES orders (id),
	product_id INTEGER NOT NULL REFERENCES products (id),
	timestamp timestamp default current_timestamp
);