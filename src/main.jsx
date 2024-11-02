import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PostsPage from './pages/PostsPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "register",
    element: <RegisterPage/>,
  },
  {
    path: "posts",
    element: <PostsPage/>,
  },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
