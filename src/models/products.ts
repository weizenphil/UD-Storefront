import client from "../database";

export type Product = {
    id?: number | string
    name: string
    price: number | string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products. Error: ${err}`)
        }
    }

    async show(id:string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'

            const conn = await client.connect()

            const result = await conn.query(sql, [product.name, product.price])
            const product_result= result.rows[0]

            conn.release()

            return product_result
        } catch (err) {
            throw new Error(`Cannot add product ${product.name}. Error: ${err}`)
        }
    }

    async update(product: Product): Promise<Product> {
        try {
            const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *'

            const conn = await client.connect()

            const result = await conn.query(sql, [product.name, product.price, product.id])
            const product_result= result.rows[0]

            conn.release()

            return product_result
        } catch (err) {
            throw new Error(`Cannot update product ${product.id}. Error: ${err}`)
        }
    }
}