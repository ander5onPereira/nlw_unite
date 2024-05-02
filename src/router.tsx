import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Home } from './pages/home'
import { Attendee } from './pages/attendee'
import { Events } from './pages/events'
import { App } from './app'
import { ErrorPage } from './pages/errorPage'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/participantes',
        element:<Attendee/>
      },
      {
        path:'/events',
        element:<Events/>
      }
    ]
  },
  
])
export function Router(){
  return <RouterProvider router={router}/>
}
