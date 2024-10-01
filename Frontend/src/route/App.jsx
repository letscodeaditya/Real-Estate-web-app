import { useState } from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />

      <Outlet />
    </div>
  );
}

export default App;
