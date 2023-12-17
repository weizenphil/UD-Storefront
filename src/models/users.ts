import client from "../database"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
    id?: string
    password?: string
    firstname?: string
    lastname?: string
    username?: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users. Error: ${err}`)
        }
    }

    async show(id:string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get user ${id}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *'

            const conn = await client.connect()
            const saltRounds = parseInt(process.env.SALT_ROUNDs as string)
            const hash = bcrypt.hashSync(user.password as string, saltRounds)

            const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash])
            const user_result= result.rows[0]

            conn.release()

            return user_result
        } catch (err) {
            throw new Error(`Cannot add user ${user.username}. Error: ${err}`)
        }
    }

    async authenticate(user: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT username, password FROM users WHERE username=($1)'

            const result = await conn.query(sql, [user.username])
            
            const user_result = result.rows[0]

            conn.release()

            const checkingPassword = bcrypt.compareSync(
                user.password as string,
                user_result.password
            )

            if(!checkingPassword) throw new Error('Password is incorret')

            return user_result
        } catch (err) {
            throw new Error(`Cannot add users. Error: ${err}`)
        }
    }

}