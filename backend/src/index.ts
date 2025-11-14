import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/authRoute'


dotenv.config()
const app = express()
const port = process.env.port

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log("server is running")
})