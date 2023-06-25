import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacePage from "./pages/PlacePage";
import PlaceForm from "./components/PlaceForm";
import SinglePlace from "./pages/SinglePlace";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

// 跨域和携带cookie
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacePage />} />
          <Route path="/account/places/new" element={<PlaceForm />} />
          <Route path="/account/places/:id" element={<PlaceForm />} />
          <Route path="/place/:id" element={<SinglePlace />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
