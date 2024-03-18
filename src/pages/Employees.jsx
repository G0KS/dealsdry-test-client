import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Loadingspinner from "../components/LoadingSpinner";
import {
   deleteContext,
   registerContext,
   updateContext,
} from "../components/ContextShare";
import { Alert } from "react-bootstrap";
import { allUsers, deleteUser } from "../services/allApi";
import EmployeeTable from "../components/EmployeeTable";
import NavbarHeader from "../components/NavbarHeader";

function Employees() {
   const { deletedData, setDeletedData } = useContext(deleteContext);
   const { updatedData, setUpdatedData } = useContext(updateContext);
   const { registerData, setRegisterData } = useContext(registerContext);
   const [showSpin, setShowSpin] = useState("true");
   const [searchTerm, setSearchTerm] = useState("");

   const [usersData, setUsersData] = useState([]);

   const getAllUsers = async () => {
      const response = await allUsers(searchTerm);
      if (response.status === 200) {
         setUsersData(response.data);
      } else {
         toast.error("Cannot fetch data");
      }
   };

   const removeUser = async (id) => {
      const response = await deleteUser(id);
      if (response.status === 200) {
         getAllUsers();
         setDeletedData(response.data);
      } else {
         toast.error("Operation failed");
      }
   };

   useEffect(() => {
      getAllUsers();
      setTimeout(() => {
         setShowSpin(false);
      }, 1200);
   }, [searchTerm]);

   return (
      <>
         <NavbarHeader />
         <div
            style={{
               display: "flex",
               justifyContent: "end",
               marginTop: "30px",
            }}
         >
            {updatedData && (
               <Alert
                  variant="success"
                  dismissible
                  onClose={() => setUpdatedData("")}
               >
                  {updatedData.fname} updated successfully..
               </Alert>
            )}
            {registerData && (
               <Alert
                  variant="success"
                  dismissible
                  onClose={() => setRegisterData("")}
               >
                  {registerData.fname} registered successfully..
               </Alert>
            )}
            {deletedData && (
               <Alert
                  variant="warning"
                  dismissible
                  onClose={() => setDeletedData("")}
               >
                  {deletedData.fname} removed successfully..
               </Alert>
            )}
         </div>

         {showSpin ? (
            <Loadingspinner />
         ) : (
            <div className="container mt-5">
               <div className="search-all d-flex">
                  <div className="search d-flex align-items-center">
                     <span>Search: </span>
                     <input
                        type="text"
                        style={{ width: "400px" }}
                        placeholder="Search by Employee Name"
                        className="form-control ms-3"
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <Link
                     to={"/employees/new"}
                     className="btn btn-primary ms-auto"
                  >
                     <i class="fa-solid fa-plus"></i> ADD
                  </Link>
               </div>
               <div className="mt-5">
                  <EmployeeTable
                     displayData={usersData}
                     removeUser={removeUser}
                  />
               </div>
            </div>
         )}
         <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
         />
      </>
   );
}

export default Employees;
