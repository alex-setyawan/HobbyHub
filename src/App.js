import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Archery from "./Archery";
import Basketball from "./Basketball";
import Culinary from "./Culinary";
import NewPost from "./NewPost";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/archery" element={<Archery />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/culinary" element={<Culinary />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
