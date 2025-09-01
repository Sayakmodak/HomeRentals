import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Layout from "./mainLayout/Layout";
import Contact from "./pages/Contact";
import HomePage from "./comp/HomePage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import UserProfile from "./pages/UserProfile";
import HotelList from "./pages/HotelList";
import HotelDetail from "./pages/HotelDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddRoom from "./pages/admin/AddRoom";
import ListRoom from "./pages/admin/ListRoom";
import AllHotelsList from "./pages/admin/AllHotelsList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/hotels",
        element: <HotelList />,
      },
      {
        path: "/hotel/:id",
        element: <HotelDetail />,
      },
    ],
  },
  {
    path: "/owner",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "edit-hotel",
        element: <AllHotelsList />,
      },
      {
        path: "edit-hotel/:id",
        element: <AddRoom />,
      },
      {
        path: "list-room",
        element: <ListRoom />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
