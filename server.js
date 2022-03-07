const express = require('express')
require('dotenv').config()
const colors = require('colors')
const postRouter = require('./routes/postRoutes')
const adminRouter = require('./routes/adminRoutes')
const connectDb = require('./config/db')

const port = process.env.PORT || 5000;
connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRouter)
app.use('/api/admin', adminRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})