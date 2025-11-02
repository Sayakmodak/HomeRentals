import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Layout from "./mainLayout/Layout";
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
import EditHotel from "./pages/admin/EditHotel";
import { PrimeReactProvider } from "primereact/api";
import RoomDetailPage from "./pages/RoomDetailPage";
import ReservationPage from "./pages/ReservationPage";
import MyBooking from "./pages/MyBooking";


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
        path: "/hotel/:hotelId",
        element: <HotelDetail />,
      },
      {
        path: "/hotel/:hotelId/room/:roomId",
        element: <RoomDetailPage />,
      },
      {
        path: "/hotel/:hotelId/room/:roomId/reservation",
        element: <ReservationPage />,
      },
      {
        path: "/mybookings/:userId",
        element: <MyBooking />,
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
        path: "edit-hotel/:hotelId/addroom",
        element: <AddRoom />,
      },
      {
        path: "edit-hotel/:hotelId/update-hotel",
        element: <EditHotel />,
      },
      {
        path: "list-room",
        element: <ListRoom />,
      },
      {
        path: "update-room/hotel/:hotelId/room/:roomId",
        element: <AddRoom />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
