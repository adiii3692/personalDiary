"use client";
import React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function Home() {
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

  //Sample Markdown
  const [markdown, setMarkdown] = useState<string>("# Hello, **Markdown!**");

  return (
    <>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-2xl quicksand-bold text-gray-800 hover:text-gray-700">
            MindScribe
          </a>

          {/* Navigation Menu */}
          <nav className="space-x-8 quicksand-medium">
            <Link href={'/'}><Button>Home</Button></Link>
            <Link href={'/'}><Button>My Entries</Button></Link>
            <Link href={'/'}><Button>My Wishlist</Button></Link>
            <Link href={'/'}><Button>My Recipes</Button></Link>
          </nav>

          {/* Profile Avatar */}
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/111661089?s=400&u=c7f42df01aace4d02710a5f2d2509ec143bdf7b4&v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="p-8 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" defaultValue="Title" className="col-span-3" />
                        </div>
                        {/* Content */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="content" className="text-right">
                            Content
                          </Label>
                          <Textarea id="content" className="col-span-3" value={markdown} onChange={(e)=>{
                            setMarkdown(e.target.value)
                          }}/>
                        </div>
                        {/* Markdown Preview */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="preview" className="text-right">
                            Preview
                          </Label>
                          <div className="col-span-3">
                            <MarkdownPreview markdown={markdown} />
                          </div>
                        </div>
                        { (card.title) === 'Recipe' ? (
                          <>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                              Description
                              </Label>
                              <Input id="description" defaultValue="Description" className="col-span-3" />
                            </div>
                          </>
                        ) : 
                          card.title === 'Entrie' ? 'Do Entrie Action' : 
                          card.title === 'Wishlist' ? 'Do Wishlist Action' : 'Default Action' }
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 quicksand-bold">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            Made with &#x2665; and <span>☕️</span> by Aditya Nair &copy; 2025
          </p>
        </div>
      </footer>
    </>
  );
}
