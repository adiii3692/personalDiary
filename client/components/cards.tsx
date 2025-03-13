import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "@/components/markdownPreview";

interface Author{
    id: number,
    username: string,
    password: string
}

interface Recipe{
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    content: string,
    authorId: number,
    author: Author
}

interface Wishlist{
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    content: string,
    imageUrl: string,
    authorId: number,
    author: Author
}

interface Entrie{
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    content: string,
    imageUrl: string,
    authorId: number,
    author: Author
}

type Card = {
    title: string;
    items: Recipe[] | Wishlist[] | Entrie[];
};

const CardsList = () => {

    const [recipeArray, setRecipeArray] = useState<Recipe[]>([])
    const [wishlistArray, setWishlistArray] = useState<Wishlist[]>([])
    const [entrieArray, setEntrieArray] = useState<Entrie[]>([])

    const fetchRecipes = async () => {
        const url : string = `${process.env.NEXT_PUBLIC_API_URL}`+'recipes'
        try {
            const response = await fetch(url);
            if (!response.ok && response.status!=500) {
              throw new Error(`Response status: ${response.status}`);
            }
            
            const recipeJson = await response.json();
            console.log(recipeJson.recipes);
            setRecipeArray(recipeJson.recipes)
          } catch (error) {
            console.log(error);
          }
    }

    const fetchWishlist = async () => {
        const url : string = `${process.env.NEXT_PUBLIC_API_URL}`+'wishlist'
        try {
            const response = await fetch(url);
            if (!response.ok && response.status!=500) {
              throw new Error(`Response status: ${response.status}`);
            }
            
            const wishlistJson = await response.json();
            console.log(wishlistJson.wishlist);
            setWishlistArray(wishlistJson.wishlist)
          } catch (error) {
            console.log(error);
          }
    }

    //Sample Markdown
    const [markdown, setMarkdown] = useState<string>("# Sample, **Markdown!**");

    // State for each card's items
    const [recipes, setRecipes] = useState<string[]>(['Pasta', 'Pizza', 'Salad']);
    const [entries, setEntries] = useState<string[]>(['Day 1', 'Day 2', 'Day 3']);
    const [wishlist, setWishlist] = useState<string[]>(['Book', 'Headphones', 'Shoes']);

    // Card data
    const cards: Card[] = [
        { title: 'Recipe', items: recipeArray },
        { title: 'Entrie', items: entrieArray },
        { title: 'Wishlist', items: wishlistArray },
    ];
    
    useEffect(()=>{
        fetchRecipes()
        fetchWishlist()
    },[])

    useEffect(()=>{
        console.log("Recipe array: ",recipeArray)
        console.log("Wishlist array: ",wishlistArray)
    },[recipeArray,wishlistArray])

    return(
        <>
            <div className="grid w-full h-[40%] grid-cols-1 md:grid-cols-3 gap-6 my-8" data-testid="card-component">
                {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    {/* Card Title */}
                    <div className="w-full justify-center items-center">
                    <h2 className="text-xl quicksand-bold mb-4 text-gray-800 text-center">{card.title}</h2>
                    </div>

                    {/* List of Items */}
                    <ul className="quicksand-medium space-y-2 mb-4">
                    {card.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-600">
                            {item.title}
                        </li>
                    ))}
                    </ul>

                    {/* Add Item Form and Button */}
                    <Dialog>
                        <DialogTrigger asChild>
                        {/* Button */}
                        <Button className="w-full py-2 quicksand-bold text-white rounded-md">Add Item</Button>
                        </DialogTrigger>
                        {/* Item Submit Form */}
                        <DialogContent className="sm:max-w-[425px] quicksand-bold">
                        <DialogHeader className="justify-center items-center">
                            <DialogTitle>Add Item</DialogTitle>
                            <DialogDescription>
                            Add a new '{card.title}' item
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-col  gap-4 py-4">
                            {/* Title */}
                            <div className="grid grid-cols-4 items-center gap-4 my-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" defaultValue="Title" className="col-span-3" />
                            </div>
                            {/* Content */}
                            <div className="grid grid-cols-4 items-center gap-4 my-4">
                            <Label htmlFor="content" className="text-right">
                                Content
                            </Label>
                            <Textarea id="content" className="col-span-3" value={markdown} onChange={(e)=>{
                                setMarkdown(e.target.value)
                            }}/>
                            </div>
                            {/* Markdown Preview */}
                            <div className="grid grid-cols-4 items-center gap-4 my-4">
                            <Label htmlFor="preview" className="text-right">
                                Preview
                            </Label>
                            <div className="col-span-3">
                                <MarkdownPreview markdown={markdown} />
                            </div>
                            </div>
                            {/* Recipe Section */}
                            { (card.title) === 'Recipe' ? (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4 my-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input id="description" defaultValue="Description" className="col-span-3" />
                                </div>
                            </>
                            ) : 
                            card.title === 'Entrie' ? (
                                <>
                                {/* Entrie Section */}
                                <div className="grid grid-cols-4 items-center gap-4 my-4">
                                    <Label htmlFor="imageUrl" className="text-right">
                                    ImageURL:
                                    </Label>
                                    <Input id="imageUrl" defaultValue="Image URL" className="col-span-3" />
                                </div>
                                </>
                            ) : 
                            card.title === 'Wishlist' ? (
                                <>
                                {/* Wishlist Section */}
                                <div className="grid grid-cols-4 items-center gap-4 my-4">
                                    <Label htmlFor="description" className="text-right">
                                    Description
                                    </Label>
                                    <Input id="description" defaultValue="Description" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4 my-4">
                                    <Label htmlFor="imageUrl" className="text-right">
                                    ImageURL:
                                    </Label>
                                    <Input id="imageUrl" defaultValue="Image URL" className="col-span-3" />
                                </div>
                                </>
                            ) : <></> }
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                ))}
            </div>
        </>
    )
};

export default CardsList;