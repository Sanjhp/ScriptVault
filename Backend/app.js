import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectionDB from './db/connectDb.js';
import path from 'path';
import  userRouter  from "./routes/userRoutes.js"
const PORT = process.env.PORT || 5000

connectionDB()
const app = express()

app.use(express.json())
const __dirname = path.resolve()
app.use('/api/public', express.static(path.join(__dirname, './public')))
app.use(cors())

// Routes 
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is runing PORT:${PORT}`)
})