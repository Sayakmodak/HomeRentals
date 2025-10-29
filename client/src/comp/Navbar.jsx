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
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "react-toastify";

export default function Navbar() {
  const location = useLocation();
  // Detect if on home page
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [logout, { data, isLoading, isSuccess, isError, error }] =
  useLogoutUserMutation();
  // console.log(data, error);

  const user = useSelector((state) => state.auth.user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  const handleLogOut = async () => {
    await logout();
  };

  // Detect window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "You have been logged out successfully");
    }
    if(error){
      toast.error(error.message || "Some error occured");
    }
  }, [isSuccess, isError])


  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      } ${!isHome ? "bg-indigo-500 text-white" : ""}`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 text-lg">
        <HomeIcon
          className={`${isScrolled && isHome ? "text-gray-700" : ""} ${
            isScrolled && !isHome ? "text-gray-700" : ""
          } ${!isScrolled && isHome ? "text-white" : ""} w-6 h-6`}
        />
        <h2
          className={`${isScrolled && isHome ? "text-gray-700" : ""} ${
            isScrolled && !isHome ? "text-gray-700" : ""
          } ${!isScrolled && isHome ? "text-white" : ""}`}
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
              isScrolled && isHome ? "text-gray-700" : ""
            } ${!isScrolled && isHome ? "text-white" : ""} ${
              isScrolled && !isHome ? "text-gray-700" : ""
            }`}
          >
            {elm.name}
            <div
              className={`${
                isScrolled && isHome ? "bg-gray-700" : ""
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}
        <button
          className={`text-lg border rounded-full px-1.5 ${
            !isScrolled && isHome ? "text-white border-white" : ""
          } ${isScrolled && isHome ? "text-blue-800 border-blue-800" : ""} 
            ${isScrolled && !isHome ? "text-gray-700 border-gray-800" : ""}`}
          onClick={() => setModalOpen(true)}
        >
          List Your Hotel
        </button>
      </div>

      {modalOpen && <RegisterHotelModal onClose={() => setModalOpen(false)} />}

      {user ? (
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
                <Link to={"/profile"}>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogOut}>
                  Logout
                </DropdownMenuItem>
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
      ) : (
        <div className=" border-red-500 flex gap-1">
          <Link to="/login">
            <button
              className={`text-lg border rounded-sm px-1.5 ${
                isScrolled && isHome
                  ? "text-gray-700 border-gray-500"
                  : "text-white"
              }`}
            >
              Login
            </button>
          </Link>
          <Link to={"/login"}>
            <button
              className={`text-lg border rounded-sm px-1.5 ${
                isScrolled && isHome
                  ? "text-gray-700 border-gray-500"
                  : "text-white"
              }`}
            >
              Signup
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
