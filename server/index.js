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
const verifConnection = async ()=>{ 
    const user = await prisma.user.findMany()
    console.log('Connection Check: ',user[0].username)
}

//Run App and Check Postgres Connection
app.listen(PORT,()=>{
    console.log('Listening to PORT: '+PORT);
    verifConnection();
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
        const  recipes = await prisma.recipe.findMany({
            include: {
                author: true
            }
        })
        return response.json({message:"Got recipes",recipes:recipes})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });  
    }
})

//Directory to make a recipe
app.post('/recipes/:id',async (request,response)=>{
    try {
        if (!request.body.title ||
            !request.body.description ||
            !request.body.content){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const title = request.body.title
        const description = request.body.description
        const content = request.body.content
        
        const userId = parseInt(request.params.id)

        const createRecipe = await prisma.recipe.create({
            data: {
                title: title,
                content: content,
                description: description,
                authorId: userId
            }
        })

        return response.status(200).json({message:`Created a Recipe for userId: ${userId}`,createdRecipe:createRecipe})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Directory to update a recipe
app.put('/recipes/:recipeId/:userId', async (request,response)=>{
    try {
        if (!request.body.title ||
            !request.body.description ||
            !request.body.content){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const title = request.body.title
        const description = request.body.description
        const content = request.body.content
        
        const recipeId = parseInt(request.params.recipeId)
        const userId = parseInt(request.params.userId)

        const updateRecipe = await prisma.recipe.update({
            where: {
                authorId: userId,
                id: recipeId
            },
            data: {
                title: title,
                description: description,
                content: content
            }
        })

        return response.status(200).json({message:`Updated recipe for userId: ${userId} and recipeId: ${recipeId}`,updatedRecipe:updateRecipe})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    } 
})

//Directory to get wishlist
app.get('/wishlist',async (request,response)=>{
    try {
        const  wishlist = await prisma.wishlist.findMany({
            include: {
                author: true
            }
        })
        return response.json({message:"Got wishlist",wishlist:wishlist})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message }); 
    }
})

//Directory to make a wishlist
app.post('/wishlist/:id',async (request,response)=>{
    try {
        if (!request.body.title ||
            !request.body.description){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const title = request.body.title
        const description = request.body.description
        const content = request.body.content
        const imageUrl = request.body.imageUrl
        
        const userId = parseInt(request.params.id)

        const createWishlist = await prisma.wishlist.create({
            data: {
                title: title,
                description: description,
                imageUrl: imageUrl,
                content: content,
                authorId: userId
            }
        })

        return response.status(200).json({message:`Created a Wishlist Item for userId: ${userId}`,createdWishlist:createWishlist})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Directory to update a wishlist
app.put('/wishlist/:wishlistId/:userId', async (request,response)=>{
    try {
        if (!request.body.title ||
            !request.body.description){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const title = request.body.title
        const description = request.body.description
        const content = request.body.content
        const imageUrl = request.body.imageUrl
        
        const wishlistId = parseInt(request.params.wishlistId)
        const userId = parseInt(request.params.userId)

        const updateWishlist = await prisma.wishlist.update({
            where: {
                authorId: userId,
                id: wishlistId
            },
            data: {
                title: title,
                description: description,
                content: content,
                imageUrl: imageUrl
            }
        })

        return response.status(200).json({message:`Updated wishlist for userId: ${userId} and wishlistId: ${wishlistId}`,updatedWishlist:updateWishlist})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    } 
})