import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import 'dotenv/config'
import {connectCloudinary} from './config/cloudinary.js'
import campaignRoutes from './routes/campaignRoutes.js'
import userRoutes from './routes/userRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'

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

app.use('/api/subscription', subscriptionRoutes);
// app.use("api/payment", paymentRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})