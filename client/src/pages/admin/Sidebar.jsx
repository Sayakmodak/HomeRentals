import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarItems = [
    { page: "Dashboard", path: "/owner/dashboard" },
    { page: "Add Room", path: "/owner/add-room" },
    { page: "List Room", path: "/owner/list-room" },
  ];

  return (
    <div>
      <nav className="bg-white shadow-md border border-gray-200 h-screen fixed top-5 left-0 min-w-[250px] py-6 px-4 overflow-auto mt-10">
        {
          sidebarItems.map((page, id)=> {
            return (
              <ul key={id}>
                <li>
                  <NavLink
                    to={page.path}
                    className={({ isActive }) =>
                      `flex items-center py-3 px-4 md:px-8 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600" : "hover:bg-gray-100/90 border-white text-gray-700"}`
                    }
                  >
                    {page.page}
                  </NavLink>
                </li>
              </ul>
            );
          })
        }
        

        {/* <div class="mt-4">
          <h6 class="text-blue-600 text-sm font-semibold px-4">Information</h6>
          <ul class="mt-2 space-y-1">
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Add Room
              </a>
            </li>
            
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Promote
              </a>
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <h6 class="text-blue-600 text-sm font-semibold px-4">Income</h6>
          <ul class="mt-2 space-y-1">
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Earnings and taxes
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Refunds
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Declines
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Payouts Details
              </a>
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <h6 class="text-blue-600 text-sm font-semibold px-4">Actions</h6>
          <ul class="mt-2 space-y-1">
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-slate-700 font-medium text-[15px] block hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                Logout
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </div>
  );
}

export default Sidebar
