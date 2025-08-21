import React, { useEffect, useState } from "react";
import { Cross, Crosshair, CrossIcon, HomeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import homeJpg from "../assets/home.jpeg";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  // Detect window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect if on home page
  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      } ${!isHome ? "bg-indigo-500" : ""}`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 text-lg">
        <HomeIcon
          className={`${
            isScrolled && isHome ? "text-gray-700" : "text-white"
          } w-6 h-6`}
        />
        <h2
          className={`${isScrolled && isHome ? "text-gray-700" : "text-white"}`}
        >
          HomeRentals
        </h2>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((elm, i) => (
          <Link
            key={i}
            to={elm.path}
            className={`group flex flex-col gap-0.5 text-lg ${
              isScrolled && isHome ? "text-gray-700" : "text-white"
            }`}
          >
            {elm.name}
            <div
              className={`${
                isScrolled && isHome ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        {/* dialog */}
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                className={`${
                  isScrolled && isHome ? "text-gray-700" : "text-white"
                } bg-transparent rounded-full hover:bg-transparent hover:text-white`}
                variant={"outline"}
              >
                List your hotel
              </Button>
            </DialogTrigger>

            <div className="">
              <DialogContent className="flex justify-center border border-red-500">
                <img src={homeJpg} alt="" className="w-1/2 rounded-xl" />
                <div>
                  <DialogHeader className="mb-4">
                    <DialogTitle>Register your hotel</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="name-1">Hotel Name</Label>
                      <Input
                        id="name-1"
                        name="hotelName"
                        placeholder="Enter hotel name"
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="username-1">Contact</Label>
                      <Input
                        id="username-1"
                        name="contact"
                        placeholder="Phone number"
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="username-1">Address</Label>
                      <Input
                        id="username-1"
                        name="address"
                        placeholder="Address"
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="username-1">Hotel Category</Label>
                      <select name="" id="">
                        <option value="">Select Category</option>
                        <option value="">Luxury Stays</option>
                        <option value="">Budget Hotels</option>
                        <option value="">Boutique Hotels</option>
                        <option value="">Business Hotels</option>
                        <option value="">Family-Friendly Hotels</option>
                        <option value="">Pet-Friendly Hotels</option>
                      </select>
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>

        {/* <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
          <form action="" className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
            <img src={homeJpg} alt="" className="w-1/2 rounded-xl hidden md:block"/>

            <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
              <img src="" alt="" />
              <CrossIcon className="absolute top-4 right-4 h-4 w-4 cursor-pointer"/>
              <p className="text-2xl font-semibold mt-6">Register</p>
            </div>
          </form>
        </div> */}
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-9 w-9 p-0 rounded-full" variant={"outline"}>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.profileImg || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                  // className="h-10 w-10"
                />
                <AvatarFallback className="text-lg">CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
            {user?.role === "seller" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
