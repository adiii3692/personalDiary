import React, { useState } from "react";
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
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "@/components/markdownPreview";

type Card = {
    title: string;
    items: string[];
};


const CardsList = () => {

    //Sample Markdown
    const [markdown, setMarkdown] = useState<string>("# Sample, **Markdown!**");

    // State for each card's items
    const [recipes, setRecipes] = useState<string[]>(['Pasta', 'Pizza', 'Salad']);
    const [entries, setEntries] = useState<string[]>(['Day 1', 'Day 2', 'Day 3']);
    const [wishlist, setWishlist] = useState<string[]>(['Book', 'Headphones', 'Shoes']);

    // Card data
    const cards: Card[] = [
        { title: 'Recipe', items: recipes },
        { title: 'Entrie', items: entries },
        { title: 'Wishlist', items: wishlist },
    ];

    return(
        <>
            <div className="grid w-full h-[50%] grid-cols-1 md:grid-cols-3 gap-6 my-8 mx-8" data-testid="card-component">
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
                        {item}
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