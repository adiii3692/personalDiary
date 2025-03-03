//Imports
const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
import { testConnection } from './db'

//PORT
const PORT = process.env.PORT

//Express Middleware
const app = express()
app.use(cors())
app.use(bodyParser.json({limit:'5mb'}))

//Run App and Check Postgres Connection
app.listen(PORT,()=>{
    testConnection();
    console.log('Listening to PORT: '+PORT);
});

app.get('/',(request,response)=>{
    return response.send('App is working on PORT: '+PORT);
})