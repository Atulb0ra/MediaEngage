import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const PORT = process.env.PORT || 5000
connectDB();
connectCloudinary();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("API WORKING...")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})