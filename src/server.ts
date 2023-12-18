import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import sitemapRoutes from './handlers/dashboard'

const app: express.Application = express()

let port = 3000

if (process.env.ENV === 'test') {
    port = 3001;
}

const adress = `127.0.0.1:${port}`

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', function (req: Request, res: Response) {
    res.send('This is the overall route!')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)
sitemapRoutes(app)

app.listen(port, () => {
    console.info(`starting app on: http://${adress}`)
})

export default app