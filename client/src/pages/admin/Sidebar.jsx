import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarItems = [
    { page: "Dashboard", path: "/owner/dashboard" },
    { page: "Edit Your Listing", path: "/owner/edit-hotel"},
    { page: "List Room", path: "/owner/list-room" },
  ];

  return (
    <div className='border border-red-500 mt-[-25px]'>
      <nav className="hidden lg:block w-[250px] sm:w-[250px] space-y-8 border border-gray-200 dark:border-gray-700 p-5 sticky top-15  h-screen">
        {sidebarItems.map((page, id) => {
          return (
            <ul key={id}>
              <li>
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-4 md:px-8 gap-3 ${
                      isActive
                        ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
                        : "hover:bg-gray-100/90 border-b border-gray-300 text-gray-700"
                    }`
                  }
                >
                  {page.page}
                </NavLink>
              </li>
            </ul>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar


"hidden lg:block w-[250px] sm:w-[250px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0  h-screen"

"bg-white shadow-md border border-gray-200 fixed top-5 left-0 h-screen  min-w-[250px] py-6 px-4 overflow-auto mt-10"