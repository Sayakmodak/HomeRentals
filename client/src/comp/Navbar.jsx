import React from 'react'
import { HomeIcon, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';



const Navbar = () => {
  const user = "seller";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent border border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className='flex justify-center items-center'>
          <HomeIcon />
          <h2>HomeRentals</h2>
        </div>
        <div className="flex gap-10">
          <Link to="/" className="text-black text-lg font-semibold hover:text-gray-300">Home</Link>
          <Link to="" className="text-black text-lg font-semibold hover:text-gray-300">Hotels</Link>
          <Link to="" className="text-black text-lg font-semibold hover:text-gray-300">About</Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>

            {
              
              user === "seller" && (<><DropdownMenuSeparator /><DropdownMenuItem>
                Dashboard
              </DropdownMenuItem></>)
            }
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
