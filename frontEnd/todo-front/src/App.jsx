import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

export default function App() {
  // return <Signin/>

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signup />} />
          {/* we want to protect these routes */}
          <Route
            path="home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}
