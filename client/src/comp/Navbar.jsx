import React from "react";
import { HomeIcon, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

/*
const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  // console.log(user);

  console.log(window.location.pathname);
  const path = "/"; 
  if(path === "/"){

  }else{
    
  }
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent border-red-600">
      <div className="border-blue-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 mb-20">
        <div className='flex justify-center items-center'>
          <HomeIcon className='text-white'/>
          <h2 className='text-white'>HomeRentals</h2>
        </div>
        <div className="flex gap-10">
          <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300">Home</Link>
          <Link to="" className="text-white text-lg font-semibold hover:text-gray-300">Hotels</Link>
          <Link to="" className="text-white text-lg font-semibold hover:text-gray-300">About</Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.profileImg || "https://github.com/shadcn.png"} alt="@shadcn" />
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
*/

const Navbar = () => {
  console.log(window.location.pathname);
  const user = useSelector((state) => state.auth.user);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  const ref = React.useRef(null);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current.scrollTop > 10);
    };
    ref.current.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="overflow-y-scroll">
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        } ${window.location.pathname === "/" ? "" : "bg-indigo-500"}`}
      >
        {/* {/* Logo  */}
        <Link to="/" className="flex items-center gap-1 text-lg">
          <HomeIcon
            className="text-white"
          />
          <h2
            className="text-white">
            HomeRentals</h2>
        </Link>

        {/* {/* Desktop Nav  */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((elm, i) => (
            <Link
              key={i}
              to={elm.path}
              className={`group flex flex-col gap-0.5 text-lg ${
                   isScrolled
                    ? "text-gray-700"
                    : "text-white"
              }`}
            >
              {elm.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* {/* Desktop Right  */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* {/* Mobile Menu Button  */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* {/* Mobile Menu  */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((elm, i) => (
            <Link key={i} to={elm.path} onClick={() => setIsMenuOpen(false)}>
              {elm.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.profileImg || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
              {user === "seller" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
