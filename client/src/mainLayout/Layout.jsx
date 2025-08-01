import Navbar from '@/comp/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout