import React from "react";
import NavbarHeader from "../components/NavbarHeader";

function Dashboard() {
   return (
      <>
       <NavbarHeader />
         <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
         >
            <h1 style={{ fontSize: "60px", color: "coral" }}>
               Welcome Admin Panel
            </h1>
         </div>
      </>
   );
}

export default Dashboard;
