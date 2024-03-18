import React from "react";

function NavbarHeader() {
   return (
      <>
         <div className="container navBar d-flex justify-content-between">
            <div className="logo">
               <img src="" alt="logo" />
            </div>

            <a href="/home" className="btn btn-outline-primary">
               Home
            </a>
            <a href="/employees" className="btn btn-outline-primary">
               Employee List
            </a>
            <h3>Admin</h3>
            <a className="btn btn-outline-danger" href="/">
               Logout
            </a>
         </div>
      </>
   );
}

export default NavbarHeader;
