import Client from '../database'
import { Order } from '../models/orders'

export class DashboardQueries {
  async currentOrderByUser(id: string): Promise<Order> {
    try {
      const sql = `SELECT name, status, quantity, price 
         FROM orders 
         INNER JOIN order_products ON orders.id = order_products.order_id 
         INNER JOIN products ON order_products.product_id = products.id
         WHERE user_id=($1)
         ORDER BY orders.timestamp DESC
        `
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`)
    }
  }
}