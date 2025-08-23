import React from 'react'
import AdminNavBar from './AdminNavBar';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div>
      <AdminNavBar />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
