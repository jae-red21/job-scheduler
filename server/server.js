import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectDB from './db/db.js'

connectDB();
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))