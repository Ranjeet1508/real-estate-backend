const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { userRoute } = require('./routes/userRouter');
const { propertyRoute } = require('./routes/propertyRouter');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: "*"
}))

app.get('/', (req, res) => {
    res.send("welcome to the backend of real estate")
})

app.use('/auth', userRoute);
app.use('/property', propertyRoute);


app.listen(PORT, async() => {
    try {
        await connection;
        console.log(`server started at port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})