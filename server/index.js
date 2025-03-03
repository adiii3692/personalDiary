//Imports
import createRequire from 'create-require'
const require = createRequire(import.meta.url)
const express = require('express')
import cors from 'cors'
require('dotenv').config()
const bodyParser = require('body-parser')
import { pool, testConnection } from './db.js'
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

//PORT
const PORT = process.env.PORT

//Express Middleware
const app = express()
app.use(cors())
app.use(bodyParser.json({limit:'5mb'}))

//Prisma connection
const prisma = new PrismaClient()

//Test function to verify prisma connection
async function testPrismaConnection(){
    const getUsers = await prisma.user.findMany()
    console.log("All Users: ",getUsers)
}

//Run App and Check Postgres Connection
app.listen(PORT,()=>{
    // testConnection();
    testPrismaConnection()
    console.log('Listening to PORT: '+PORT);
});

//Base directory to verify if api is running
app.get('/',(request,response)=>{
    return response.send('Personal Diary is working on PORT: '+PORT);
})

//Route to login
app.post('/login',async(request,response)=>{
    try {
        if (!request.body.username ||
            !request.body.password){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const username=request.body.username;
        const password = request.body.password;

        const storedUsername = await pool.query('SELECT * FROM login WHERE username=$1',[username]);
        //Check if valid username
        if (storedUsername.rows.length==0){
            return response.json({message:"Enter a valid username",validated:false});
        }
        //Get the hashed password
        const retrievedPassword = storedUsername.rows[0].password;
        //Verify password:
        const verifyPassword = await bcrypt.compare(password,retrievedPassword);

        //If incorrect password
        if (!verifyPassword){
            return response.json({message:"Invalid Password",validated:false});
        }
        return response.status(200).json({message:"Logged In!",validated:true,user:storedUsername.rows[0]});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Directory to get recipes
app.get('/recipes',async (request,response)=>{
    try {
        const  recipes = await pool.query('SELECT * FROM recipes')
        return response.json({message:"Got recipes",recipes:recipes.rows})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });  
    }
})

//Directory to make a recipe

//Directory to get wishlist
app.get('/wishlist',async (request,response)=>{
    try {
        const  wishlist = await pool.query('SELECT * FROM wishlist')
        return response.json({message:"Got wishlist",wishlist:wishlist.rows})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message }); 
    }
})

