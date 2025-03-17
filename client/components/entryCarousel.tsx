import * as React from "react"
 
// Component Imports
import { Button } from "./ui/button"
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
import Image from "next/image"

//  Author Interface
interface Author{
  id: number,
  username: string,
  password: string
}

//  Entrie Interface
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

const CardCarousel = () => {
    const [entrieArray, setEntrieArray] = React.useState<Entrie[]>([])

    //Sample Markdown
    const [markdown, setMarkdown] = React.useState<string>("# Sample, **Markdown!**");

    const fetchEntries = async () => {
      const url : string = `${process.env.NEXT_PUBLIC_API_URL}`+'entries'
      try {
          const response = await fetch(url);
          if (!response.ok && response.status!=500) {
            throw new Error(`Response status: ${response.status}`);
          }
          
          const entriesJson = await response.json();
          console.log(entriesJson.entries);
          setEntrieArray(entriesJson.entries)
        } catch (error) {
          console.log(error);
        }
    }

    const updateEntrie = async (entrieId:number) => {
      const url : string = `${process.env.NEXT_PUBLIC_API_URL}`+'entries/'+`${entrieId}/`+`${localStorage.getItem('user_id')}`

      const entrie = {
        title:
      }

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
        
        const entriesJson = await response.json();
        console.log(entriesJson.entries);
        setEntrieArray(entriesJson.entries)
      } catch (error) {
        console.log(error);
      }
    }

    React.useEffect(()=>{
          fetchEntries()
      },[])

    React.useEffect(()=>{
            console.log("Entries array: ",entrieArray)
        },[entrieArray])

    return (
        <div className="flex-grow flex-col w-full justify-center items-center">
          {entrieArray.map((entrie,index)=> (
            <Dialog  key={index}>
              <DialogTrigger asChild>
                  <div className="flex w-full">
                    <div className="w-15/100 p-5 bg-[#C5A880]">
                      <Button>{new Date(entrie.createdAt).toLocaleDateString("en-US", { 
                          year: "numeric", 
                          month: "short", 
                          day: "numeric"
                        })}
                      </Button>
                    </div>
                    <div className="flex-1 flex-col p-5 bg-[#0F172A] text-white">
                      <div>{entrie.title}</div>
                    </div>
                  </div>
              </DialogTrigger>
              {/* Update Form */}
              <DialogContent className="sm:max-w-[425px] quicksand-bold">
                <DialogHeader className="justify-center items-center">
                    <DialogTitle>Update Entrie</DialogTitle>
                    <DialogDescription>
                      Update an 'Entrie' item
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-col gap-4 py-4">
                    {/* Title */}
                    <div className="grid grid-cols-4 items-center gap-4 my-4">
                      <Label htmlFor="title" className="text-right">
                          Title
                      </Label>
                      <Input id="title" defaultValue={entrie.title} className="col-span-3" />
                    </div>
                    {/* Content */}
                    <div className="grid grid-cols-4 items-center gap-4 my-4">
                      <Label htmlFor="content" className="text-right">
                          Content
                      </Label>
                      <Textarea id="content" className="col-span-3" defaultValue={entrie.content} onChange={(e)=>{
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
                    <div className="grid grid-cols-4 items-center gap-4 my-4">
                        <Label htmlFor="imageUrl" className="text-right">
                        ImageURL:
                        </Label>
                        <Input id="imageUrl" defaultValue={entrie.imageUrl} className="col-span-3" />
                    </div>
                    <div className="flex items-center justify-center my-4">
                      {(entrie.imageUrl)?<Image src={entrie.imageUrl} alt="Entrie Image" width={25} height={25} style={{ width: '50%', height: '50%' }}/>:<></>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
          </Dialog>
          ))}
        </div>  
        )
  }

export default CardCarousel