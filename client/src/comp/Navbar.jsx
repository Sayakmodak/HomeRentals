import React, { useEffect, useState } from "react";
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
import RegisterHotelModal from "./RegisterHotelModal";
import { HomeIcon } from "lucide-react";


export default function Navbar() {
  const location = useLocation();
  // Detect if on home page
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
      <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8 border-red-600">
        {navLinks.map((elm, i) => (
          <Link
            key={i}
            to={elm.path}
            className={`group flex flex-col items-center justify-center gap-0.5 text-lg ${
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
        <button
          className={`text-lg border rounded-full px-1.5 ${
            isScrolled && isHome
              ? "text-gray-700 border-gray-500"
              : "text-white"
          }`}
          onClick={() => setModalOpen(true)}
        >
          List Your Hotel
        </button>
      </div>

      {modalOpen && <RegisterHotelModal onClose={()=> setModalOpen(false)} />}

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
