import React from "react";
import Navbar from "../partials/navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ padding: "1rem" }}>{children}</main>
        </>
    );
};

export default Layout;