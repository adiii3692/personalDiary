"use client";
import React from "react";
import CardsList from "@/components/cards"; 
import LandingPage from "@/components/landingPage";

//Component Imports
import Header from '@/components/header'
import Footer from "@/components/footer";

//Import hooks
import useLog from "@/hooks/use-log";

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
