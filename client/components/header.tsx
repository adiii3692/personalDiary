"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link";

interface UserLogin {
    userLogin: boolean,
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({userLogin,setUserLogin}: UserLogin) => {
    return(
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="text-2xl quicksand-bold text-gray-800 hover:text-gray-700">
                MindScribe
            </a>

            {/* Navigation Menu */}
            <nav className="space-x-8 quicksand-medium">
                <Link href={'/'}><Button>Home</Button></Link>
                <Link href={'/entrie'}><Button>My Entries</Button></Link>
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
                <Button onClick={()=>setUserLogin(false)} name="logout" data-testid="logout">Logout</Button>
                </nav>
            ):<></>}
            
            </div>
        </header>
    )
}

export default Header;