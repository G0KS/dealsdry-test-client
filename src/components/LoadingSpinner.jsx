import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
   return (
      <>
         <div className="d-flex justify-content-center align-items-center m-5">
            <Spinner
               animation="grow"
               style={{ height: "60px", width: "60px" }}
               className="me-2"
            />{" "}
            Loading...
         </div>
      </>
   );
}

export default LoadingSpinner;
