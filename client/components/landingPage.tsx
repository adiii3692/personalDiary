import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useRouter } from "next/navigation";

const LandingPage = () =>{

    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const router = useRouter()

    const logUser = async () => {
        const user = {
            username: username,
            password: password
        }

        //The api endpoint to access
        const url : string = `${process.env.NEXT_PUBLIC_API_URL}`+`login`
        console.log('URL: ',url)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify(user)
            });
            if (!response.ok && response.status!=500) {
              throw new Error(`Response status: ${response.status}`);
            }
            
            const userJson = await response.json();
            console.log(userJson);
            if (userJson.validated){
                console.log("User ID: ",userJson.foundUser.id)
                localStorage.setItem("user_id",userJson.foundUser.id)
                router.refresh()
            }

          } catch (error) {
            console.log(error);
          }
    }

    return(
        <Card className="quicksand-bold w-[40%] h-[40%] my-8" data-testid="login-form">
            <CardHeader className="h-[20%] text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>Kindly authenticate yourself</CardDescription>
            </CardHeader>
            <CardContent className="h-[75%]">
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex w-full justify-center">
                <Button className="w-[50%]" onClick={logUser} type="submit">Login</Button>
            </CardFooter>
        </Card>
    )
}

export default LandingPage;