import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/login";
import HomePage from "../pages/HomeLayout/Home";
import HomeLayout from "../pages/HomeLayout/Layout";

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<h1>About Page</h1>} />
            <Route path="services" element={<h1>Services Page</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />

    </>
))