import express from 'express'
import cors from 'cors'
import router from './routes/route.js'

const app = express()
app.use(cors)
app.use(express.json())
app.post('/', router)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))