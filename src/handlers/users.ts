import { User, UserStore } from '../models/users'
import verifyAuthToken from '../utilities/auth'
import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'


const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params?.id)
    res.json(user)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username as string,
    password: req.body.password as string,
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string
  }
  try {
    const user_result = await store.create(user)
    var token = jwt.sign(
      { user: user_result },
      process.env.TOKEN_SECRET as string
    )
    res.json(token)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const user_result = await store.authenticate(user)
    const token = jwt.sign(
      { user: user_result },
      process.env.TOKEN_SECRET as string
    )

    res.json({ token })
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/authenticate', authenticate)
}

export default userRoutes