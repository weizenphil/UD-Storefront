import { Request, Response, Application } from 'express'
import { DashboardQueries } from '../services/dashboard'
import verifyAuthToken from '../utilities/auth'

const sitemap = new DashboardQueries()

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await sitemap.currentOrderByUser(req.params?.userId as unknown as number)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const dashboardRoutes = (app: Application) => {
  app.get('/user/:userId/orders', verifyAuthToken, currentOrderByUser)
}

export default dashboardRoutes