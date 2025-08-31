import React from 'react'
import AdminNavBar from './AdminNavBar';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div>
      <AdminNavBar />
      <div className='flex  border-green-500'>
      <Sidebar />
      <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
