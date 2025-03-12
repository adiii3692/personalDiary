"use client";
import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

// Hook Imports
import useLog from "@/hooks/use-log";

// Component Imports
import CardCarousel from "@/components/entryCarousel";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Entry(){
    // Router
    const router = useRouter()
    // Use Hooks' functions to verify user's logged in state
    const {userLogin, logoutUser} = useLog()

    // Redirect to "/" if the user is not logged in
    useEffect(() => {
        if (userLogin === false) {
            router.push("/");
        }
    });

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return(
        <div className="flex flex-col min-h-screen">

            {/* Header */}
            <Header userLogin={userLogin} setUserLogin={logoutUser}/>

            {/* Main Section */}
            <main className="flex-grow flex-col">
                <div className="flex justify-center items-center my-8">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                
                <div className="w-full my-8">
                    <CardCarousel />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}