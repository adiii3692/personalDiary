"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import CardsList from "@/components/cards"; 
import LandingPage from "@/components/landingPage";
import { redirect } from "next/navigation";

//Component Imports
import Header from '@/components/header'
import Footer from "@/components/footer";

//Import hooks
import useLog from "@/hooks/use-log";

type Card = {
  title: string;
  items: string[];
};

export default function Home() {

  //Use Hooks' functions to verify user's logged in state
  const {userLogin, logoutUser} = useLog()

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <Header userLogin={userLogin} setUserLogin={logoutUser}/>

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
      <Footer />
    </div>
  );
}
