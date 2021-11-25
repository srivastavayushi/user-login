const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors')

// import routes
const authRoute = require('./routes/auth');

dotenv.config();

// Connect to DB
mongoose.connect( process.env.DB_CONNECT, ()=>{
    console.log('Connected to db')
});


//Middlewares
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);


app.listen(process.env.PORT, ()=>console.log(`server running on ${process.env.PORT}`))