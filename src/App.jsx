import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import Products from "./components/Products";
import Banner from "./components/Banner";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route ,
  RouterProvider
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<HomePage />}>
      <Route path="/" element={<Banner />}/>
      <Route path="signUp" element={<Register />} />
      <Route path="signIn" element={<Login />} />
      <Route path="products" element={<Products/>} />
    </Route>
  )
);



function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
