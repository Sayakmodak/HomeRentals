import './App.css'
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup'
import Layout from './mainLayout/Layout';
import Contact from './pages/Contact';
import HomePage from './comp/HomePage';

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        index: true,
        element: <Hero/> 
      },
      {
        path: "/login",
        element: <Signup/> 
      }
    ]
  },
])*/


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
      // {
      //   path: "/contact",
      //   element: <Contact/> 
      // },
    ]
  }
]);


function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
