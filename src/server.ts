import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import sitemapRoutes from './handlers/sitemap'

const app: express.Application = express()

let port = 3000

if (process.env.ENV === 'test') {
    port = 3001;
}

const adress = `127.0.0.1:${port}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('This is the overall route!')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)
sitemapRoutes(app)

app.listen(port, () => {
    console.info(`starting app on: http://${address}`)
})

export default app