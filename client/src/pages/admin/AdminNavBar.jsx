import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  const user = useSelector((state)=> state.auth.user);

  return (
    <div className="">
      <header className="flex border-b border-gray-300 py-3 px-4 sm:px-10 bg-white min-h-[65px] tracking-wide relative z-50 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-screen-xl mx-auto w-full">
          <Link to="/" className="flex items-center gap-1 text-lg">
            <HomeIcon className={`text-gray-700 w-6 h-6`} />
            <h2 className={`text-gray-700 w-6 h-6`}>HomeRentals</h2>
          </Link>

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
        </div>
      </header>
    </div>
  );
}

export default AdminNavBar
