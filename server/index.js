//Imports
import createRequire from 'create-require'
const require = createRequire(import.meta.url)
const express = require('express')
import cors from 'cors'
require('dotenv').config()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

//PORT
const PORT = process.env.PORT

//Salting for hashing
const salt = bcrypt.genSaltSync(parseInt(process.env.saltRound));

//Express Middleware
const app = express()
app.use(cors())
app.use(bodyParser.json({limit:'5mb'}))

//Prisma connection
const prisma = new PrismaClient()

//Test function to verify prisma connection
async function testPrismaConnection(){
    const getUsers = await prisma.user.findMany({
        include: {
            entries: true,
            recipes: true,
            wishlist: true,
        }
    })
    console.log("New User Hopefully: ",getUsers)
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

        //Search by username first
        const getUser = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })

        //Verify username
        if (getUser==null){
            return response.status(500).json({message: "Incorrect Username",validated:false})
        }   
        

        //Verify Password
        const verifyPassword = await bcrypt.compare(password,getUser.password);
        if (!verifyPassword){
            return response.status(200).json({message: "Inocrrect Password",validated:false})
        }

        //Success message if found
        return response.status(200).json({message: "Found User",foundUser:getUser,validated: true})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: "Incorrect Username or Password" });
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

