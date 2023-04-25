const express = require('express');
const { connection } = require('./configs/db')
const { router } = require('./routes/api.router')

require('dotenv').config()

const app = express();

app.use(express.json())

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Base API endpoint')
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Cannot connect to DB');
    }
    console.log(`Server running on port ${process.env.PORT}`)
})