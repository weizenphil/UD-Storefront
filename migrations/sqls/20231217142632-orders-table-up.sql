/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
		user_id BIGINT REFERENCES users(id),
    timestamp timestamp default current_timestamp
);