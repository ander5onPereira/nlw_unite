import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Home } from './pages/home'
import { Attendee } from './pages/attendee'
import { Events } from './pages/events'
import { App } from './app'
import { ErrorPage } from './pages/errorPage'

const router=createBrowserRouter([
  {
    path:'/nlw_unite',
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/nlw_unite',
        element:<Home/>
      },
      {
        path:'/nlw_unite/participantes',
        element:<Attendee/>
      },
      {
        path:'/nlw_unite/events',
        element:<Events/>
      }
    ]
  },
  
])
export function Router(){
  return <RouterProvider router={router}/>
}
