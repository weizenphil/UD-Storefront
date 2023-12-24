/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
		user_id INTEGER NOT NULL REFERENCES users (id),
    timestamp timestamp default current_timestamp
);