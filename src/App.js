
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import AllUser from './Components/AllUser/AllUser';
import { ToastContainer } from 'react-toastify';
import Update from './Components/Update/Update';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/alluser',
      element: <AllUser></AllUser>,
      loader: () => fetch('http://localhost:5000/user')
    },
    {
      path: '/update/:id',
      element: <Update></Update>,
      loader: ({ params }) => fetch(`http://localhost:5000/user/${params.id}`)
    }

  ])
  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
      <ToastContainer></ToastContainer>
    </>

  );
}

export default App;
