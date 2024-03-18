import React, { useContext, useEffect, useState } from "react";
import {
   Form,
   Row,
   FloatingLabel,
   FormControl,
   FormGroup,
   Button,
} from "react-bootstrap";
import Select from "react-select";
import LoadingSpinner from "../components/LoadingSpinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser, allUsers, editUser } from "../services/allApi";
import { registerContext, updateContext } from "../components/ContextShare";
import { useNavigate, useParams } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
function EditEmployee() {
   const { updatedData, setUpdatedData } = useContext(updateContext);
   const navigate = useNavigate();

   const [createDate, setCreateDate] = useState("");

   const options = [
      { value: "HR", label: "HR" },
      { value: "Manager", label: "Manager" },
      { value: "Sales", label: "Sales" },
   ];

   const [showSpin, setShowSpin] = useState("true");

   const [normalUserInputs, setNormalUserInputs] = useState({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      gender: "",
      course: "",
   });

   const getandsetNormalUSerInputs = (e) => {
      const { name, value } = e.target;
      setNormalUserInputs({ ...normalUserInputs, [name]: value });
   };

   const [designation, setDesignation] = useState("");

   const [profile, setProfile] = useState("");

   const [preview, setPreview] = useState("");

   const [existingImg, setExisitingImg] = useState("");

   const { id } = useParams();

   const getUser = async () => {
      try {
         const { data } = await allUsers("");
         console.log("ivde");
         let existingUser = data.find((item) => item._id === id);
         console.log(existingUser);

         setNormalUserInputs(existingUser);
         setDesignation(existingUser.designation);
         setExisitingImg(existingUser.profile);
      } catch (error) {
         console.log("Failed to fetch data");
      }
   };

   useEffect(() => {
      console.log("sfhd");
      getUser();
   }, [id]);

   useEffect(() => {
      if (profile) {
         setExisitingImg("");
         setPreview(URL.createObjectURL(profile));
      }
      setTimeout(() => {
         setShowSpin(false);
      }, 1200);
   }, [profile]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { fname, lname, email, mobile, gender, course } = normalUserInputs;
      if (
         !fname ||
         !lname ||
         !email ||
         !mobile ||
         !gender ||
         !designation ||
         !course ||
         !profile
      ) {
         console.log(normalUserInputs);
         console.log(designation);
         toast.warning("Please fill the form");
      } else {
         let newDate = new Date();
         let date = newDate.getDate();
         let month = newDate.getMonth() + 1;
         let year = newDate.getFullYear();
         setCreateDate(`${date}-${month}-${year}`);

         const data = new FormData();
         data.append("fname", fname);
         data.append("lname", lname);
         data.append("email", email);
         data.append("mobile", mobile);
         data.append("gender", gender);
         data.append("designation", designation);
         data.append("course", course);
         data.append("createDate", createDate);
         profile
            ? data.append("profile", profile)
            : data.append("profile", existingImg);
         if (profile) {
            var headers = {
               "Content-Type": "multipart/form-data",
            };
         } else {
            var headers = "";
         }

         const result = await editUser(id, data, headers);
         console.log(result.data);
         if (result.status === 200) {
            setUpdatedData(result.data);
            toast.success("Updated successfully");
            navigate("/");
         } else {
            toast.error("Request failed");
         }
      }
   };

   return (
      <>
         <NavbarHeader />
         {showSpin ? (
            <LoadingSpinner />
         ) : (
            <div className="container mt-3">
               <h1 className="text-center">Add New Employee Details</h1>
               <div className=" shadow border rounded    p-2 mt-3">
                  <div className="image w-100 text-center mb-3">
                     <img
                        style={{
                           width: "120px",
                           height: "120px",
                           borderRadius: "50%",
                        }}
                        src={
                           preview
                              ? preview
                              : "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
                        }
                        alt=""
                     />
                  </div>
                  <Form>
                     <Row>
                        <FloatingLabel
                           controlId="floatingname"
                           label="First Name"
                           className="mb-3 col-lg-6"
                        >
                           <Form.Control
                              type="text"
                              placeholder="First Name"
                              name="fname"
                              value={normalUserInputs.fname}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                        </FloatingLabel>
                        <FloatingLabel
                           controlId="floatinglname"
                           label="Last Name"
                           className="mb-3 col-lg-6"
                        >
                           <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="lname"
                              value={normalUserInputs.lname}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                        </FloatingLabel>
                        <FloatingLabel
                           controlId="floatingemail"
                           label="Email Address"
                           className="mb-3 col-lg-6"
                        >
                           <Form.Control
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={normalUserInputs.email}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                        </FloatingLabel>
                        <FloatingLabel
                           controlId="floatingmobile"
                           label="Mobile Number"
                           className="mb-3 col-lg-6"
                        >
                           <Form.Control
                              type="number"
                              placeholder="Mobile"
                              name="mobile"
                              value={normalUserInputs.mobile}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                        </FloatingLabel>
                        <Form.Group className="mb-3 col-lg-6">
                           <Form.Label>Select Gender</Form.Label>
                           <Form.Check // prettier-ignore
                              type={"radio"}
                              name="gender"
                              value={"Male"}
                              label={"Male"}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                           <Form.Check // prettier-ignore
                              type={"radio"}
                              name="gender"
                              value={"Female"}
                              label={"Female"}
                              onChange={(e) => getandsetNormalUSerInputs(e)}
                           />
                        </Form.Group>
                        {/* dropdown */}
                        <Form.Group className="mb-3 col-lg-6">
                           <Form.Label>Select Designation</Form.Label>
                           <Select
                              options={options}
                              onChange={(e) => setDesignation(e.value)}
                           ></Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6">
                           <Form.Label>Choose Profile Picture </Form.Label>
                           <FormControl
                              type="file"
                              name="user_profile"
                              onChange={(e) => setProfile(e.target.files[0])}
                           ></FormControl>
                        </Form.Group>

                        <Form.Group>
                           <div className="mb-3">
                              <Form.Check // prettier-ignore
                                 type={"checkbox"}
                                 name="course"
                                 value={"MCA"}
                                 label={"MCA"}
                                 onChange={(e) => getandsetNormalUSerInputs(e)}
                              />
                           </div>
                           <div className="mb-3">
                              <Form.Check // prettier-ignore
                                 type={"checkbox"}
                                 name="course"
                                 value={"BCA"}
                                 label={"BCA"}
                                 onChange={(e) => getandsetNormalUSerInputs(e)}
                              />
                           </div>
                           <div className="mb-3">
                              <Form.Check // prettier-ignore
                                 type={"checkbox"}
                                 name="course"
                                 value={"BSC"}
                                 label={"BSC"}
                                 onChange={(e) => getandsetNormalUSerInputs(e)}
                              />
                           </div>
                        </Form.Group>

                        <Button
                           type="submit"
                           varient="info"
                           onClick={(e) => handleSubmit(e)}
                        >
                           Submit
                        </Button>
                     </Row>
                  </Form>
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

export default EditEmployee;
