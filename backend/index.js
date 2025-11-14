require('dotenv').config({ path: './mong.env' });
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')

const app = express();
app.use(cors())
app.use(express.json())


const PORT = 5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})



