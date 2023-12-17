# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: './products/' [GET]
- Show (args: product id): './products/:id' [GET]
- Create (args: Product) [token required]: './products/' [POST]

#### Users
- Index [token required]: './users' [GET]
- Show (args: id) [token required]: './users/:id' [GET]
- Create (args: User)[token required]: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: './orders/:userId/orders' [GET]

## Data Shapes
#### Product
-  id
- name
- price

Table: Product (id:serial[primary key], name:varchar(100)[not null], price:numeric[not null])

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
)

#### User
- id
- firstName
- lastName
- password
- added: username

Table: User (id:serial[primary key], firstname: varchar (50)[not null], lastname:varchar(50)[not null], password:varchar(100)[not null], username: varchar(100)[NOT null])

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL
)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id BIGINT REFERENCES users(id)
)


Table: Order Product (
  order_id: integer(not null) REFERENCES orders (id),
  product_id: integer(not null) REFERENCES products (id),
  quantity: integer(not null)
)

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_ID BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
)