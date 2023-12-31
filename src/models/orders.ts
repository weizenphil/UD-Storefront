import client from "../database";

export type Order = {
    id?: number
    status: string
    user_id: number
}

export type OrderProducts = {
    id?: number
    quantity: number
    order_id: number
    product_id: number
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get order ${id}. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'

            const conn = await client.connect()

            const result = await conn.query(sql, [order.status, order.user_id])
            const order_result= result.rows[0]

            conn.release()

            return order_result
        } catch (err) {
            throw new Error(`Cannot add oder with status ${order.status}. Error: ${err}`)
        }
    }

    async addProduct(
        quantity: number,
        orderId: number,
        productId: number
    ): Promise<OrderProducts> {
        try {
            const order = await this.show(orderId as unknown as number)

            if (order.status == 'closed')
                throw new Error(`Cannot add product ${productId} to a closed order ${OrderStore}`)

            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            
            const conn = await client.connect()

            const result = await conn.query(sql, [quantity, orderId, productId])
            const order_result= result.rows[0]

            conn.release()

            return order_result
        } catch (err) {
            throw new Error(`Cannot add product ${productId} to order ${orderId}. Error: ${err}`)
        }
    }

    async update(order: Order): Promise<Order> {
        try {
            const sql = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *'

            const conn = await client.connect()

            const result = await conn.query(sql, [order.status, order.user_id, order.id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get order ${order.id}. Error: ¢{err}`)
        }
    }
}