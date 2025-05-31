import React from "react";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ padding: "4rem" }}>{children}</main>
        </>
    );
};

export default Layout;