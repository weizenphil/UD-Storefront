import app from '../../server'
import dotenv from 'dotenv'
import request from 'supertest'
import { DashboardQueries } from '../dashboard'
import { OrderStore } from '../../models/orders'

dotenv.config()

const store = new DashboardQueries()
const orderStore = new OrderStore()

describe('4. Unit testing the Dasboard Models', () => {
  it('4.1 Should have an currentOrderByUser method', () => {
    expect(store.currentOrderByUser).toBeDefined()
  })

  it('4.2 Should return a list of orders made by a user', async () => {
    const result = await store.currentOrderByUser('1')

    expect(result).toBeTruthy()
  })

})

describe('5. Unit testing the Dashboard Endpoints', (): void => {
  let userToken: string

  it('5.1 Should authenticate user and return token on this endpoint /authenticate', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'wmuza', password: process.env.POSTGRES_PASSWORD })
      .set('Accept', 'application/json')

    userToken = response.body.token

    expect(userToken).toBeTruthy()
    expect(response.status).toEqual(200)
  })

  it('5.2 Gets the /user/:userId/orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
      .get('/user/1/orders')
      .set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200)
  })

})