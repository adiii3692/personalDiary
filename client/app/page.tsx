"use client";
import React from "react";
import { useState } from "react";

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
    { title: 'Recipes', items: recipes },
    { title: 'Entries', items: entries },
    { title: 'Wishlist', items: wishlist },
  ];

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
            <a className="text-gray-800 hover:text-gray-600">
              Home
            </a>
            <a className="text-gray-800 hover:text-gray-600">
              My Entries
            </a>
            <a className="text-gray-800 hover:text-gray-600">
              My Wishlist
            </a>
            <a className="text-gray-800 hover:text-gray-600">
              My Recipes
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="p-8 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                {/* Card Title */}
                <h2 className="text-xl quicksand-bold mb-4 text-gray-800">{card.title}</h2>

                {/* List of Items */}
                <ul className="quicksand-medium space-y-2 mb-4">
                  {card.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Add Button */}
                <button className="w-full py-2 bg-blue-500 quicksand-semibold text-white rounded-md hover:bg-blue-600 transition-colors">
                  Add Items
                </button>
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
