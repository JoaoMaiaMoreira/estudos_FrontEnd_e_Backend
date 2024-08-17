import{createBrowserRouter, RouterProvider}  from 'react-router-dom'
import Home from './pages/Home';
import Empresa from './pages/Empresa';
import Contato from './pages/Contato';
import App from '../App';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>
//   },
//   {
//     path: "/contato",
//     element: <Contato/>
//   },
//   {
//     path: "/empresa",
//     element: <Empresa/>
//   }
// ])
const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>,
    childrean:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Contato",
        element: <Contato/>,
      },
      {
        path: "/Empresa",
        element: <Empresa/>,
      },
    ]
  }
])

function Estrutura(){
    return(
        <>
         <RouterProvider router={router}/>
        </>
    )
}

export default Estrutura