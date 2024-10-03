import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Roompage from './components/forms/roompage.jsx'
import { useContext } from 'react'




const router =createBrowserRouter([

  {
    path:"/",
    element:<App />
  },
  {
    path:"/:roomId",
    element:<Roompage  />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
