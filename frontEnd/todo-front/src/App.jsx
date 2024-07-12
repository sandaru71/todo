import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

export default function App() {
  // return <Signin/>

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Signup />} />
          <Route path="" element={<Signup />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

{
  /* we want to protect these routes */
}
{
  /* <Route
  path="home"
  element={
    <RequireAuth>
      <Home />
    </RequireAuth>
  }
/> */
}
