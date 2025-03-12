"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import CardsList from "@/components/cards"; 
import LandingPage from "@/components/landingPage";
import { redirect } from "next/navigation";

type Card = {
  title: string;
  items: string[];
};

export default function Home() {

  //User Login State
  const [userLogin, setUserLogin] = useState<boolean>(false)

  const checkLogin = () => {
    if (localStorage.getItem("user_id")!=null){
      setUserLogin(true)
    }else{
      setUserLogin(false)
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("user_id")
    redirect('/')
  }

  useEffect(()=>{
    checkLogin()
  })

  return (
    <div className="flex flex-col min-h-screen">

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

          {(userLogin)?(
            <nav className="quicksand-medium">
              <Button onClick={logoutUser} name="logout" data-testid="logout">Logout</Button>
            </nav>
          ):<></>}
          
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex">
        {/* Check if logged in */}
        {(userLogin)?(
          <>
            {/* Cards */}
            <CardsList/>
          </>
        ):
          <div className="flex-grow flex w-full justify-center items-center">
            {/* Landing Page */}
            <LandingPage />
          </div>
        }
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 quicksand-bold">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            Made with &#x2665; and <span>☕️</span> by Aditya Nair &copy; 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
