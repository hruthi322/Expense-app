import { auth } from './firebase.js';
import './App.scss';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/userSlice.js';
import { useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
const dispatch = useDispatch();

useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
    if(authUser) {
      dispatch(setUser(authUser.email));
    }
    else {
      dispatch(setUser(null));
    }
  })
},[]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement:<PageNotFound/>,
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement:<PageNotFound/>,
  },
 
])

  return (

    <RouterProvider router={router} />
  );
}

export default App;
