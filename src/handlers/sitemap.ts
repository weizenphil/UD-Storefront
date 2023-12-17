import { Request, Response, Application } from 'express'
import { SitemapQueries } from '../services/sitemap'
import verifyAuthToken from '../utilities/auth'

const sitemap = new SitemapQueries()

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await sitemap.currentOrderByUser(req.params?.userId)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const sitemapRoutes = (app: Application) => {
  app.get('/user/:userId/orders', verifyAuthToken, currentOrderByUser)
}

export default sitemapRoutes