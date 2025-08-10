import './App.css'
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup'
import Layout from './mainLayout/Layout';
import Contact from './pages/Contact';
import HomePage from './comp/HomePage';
import { store } from './app/store'
import { Provider } from 'react-redux'
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Signup/> 
  },
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage/> 
      },
      {
        path: "/profile",
        element: <UserProfile/> 
      },
    ]
  }
]);


function App() {

  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </>
  )
}

export default App
