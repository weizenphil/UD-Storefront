import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string | undefined = req.headers.authorization
        const token = authHeader?.split('')[1]
        const decoded = jwt.verify(
            token as string,
            process.env.TOKEN_SECRET as string
        )

        next()
    } catch (error) {
        res.status(401).send('Authentication failed')
    }
}

export default verifyAuthToken