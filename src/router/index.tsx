import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../pages/login";




export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />

    </>
))