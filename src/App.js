import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import GenericTopic from "./GenericTopic";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/archery" element={<GenericTopic pageType="Archery" />} />
        <Route
          path="/basketball"
          element={<GenericTopic pageType="Basketball" />}
        />
        <Route
          path="/culinary"
          element={<GenericTopic pageType="Culinary" />}
        />
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
