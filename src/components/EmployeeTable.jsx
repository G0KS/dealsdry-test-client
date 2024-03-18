import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseURL } from "../services/baseUrl";

function EmployeeTable({ displayData, removeUser }) {
   return (
      <>
         <div className="d-flex justify-content-around">
            <h1 className="text-capitalize">List of all employees</h1>
            <h2>Total Count : {displayData.length}</h2>
         </div>
         <Table bordered hover className="table table-success fs-5">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Create Date</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {displayData.length > 0 ? (
                  displayData.map((item, index) => (
                     <tr>
                        <td>{index + 1} </td>
                        <td>
                           <img
                              src={`${baseURL}/uploads/${item.profile}`}
                              alt="Profile image"
                              height={"70px"}
                              width={"60px"}
                           />
                        </td>
                        <td>
                           {item.fname} {item.lname}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.designation}</td>
                        <td>{item.gender}</td>
                        <td>{item.course}</td>
                        <td>{item.createDate}</td>
                        <td>
                           <Link
                              to={`/employees/edit/${item._id}`}
                              className="btn btn-success me-2"
                           >
                              Edit
                           </Link>
                           <button
                              className="btn btn-danger"
                              onClick={() => removeUser(item._id)}
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr className="fw-bolder text-danger">Nothing to Display</tr>
               )}
            </tbody>
         </Table>
      </>
   );
}

export default EmployeeTable;
