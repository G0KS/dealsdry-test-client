import { baseURL } from "./baseUrl";
import { commonRequest } from "./commonRequest";

export const userLogin = async (body) => {
   return await commonRequest("POST", `${baseURL}/users/login`, body);
};

export const addUser = async (body, headers) => {
   return await commonRequest("POST", `${baseURL}/add`, body, headers);
};

export const allUsers = async (searchTerm) => {
   return await commonRequest(
      "GET",
      `${baseURL}/get-users?search=${searchTerm}`,
      ""
   );
};

export const deleteUser = async (id) => {
   return await commonRequest("DELETE", `${baseURL}/remove-user/${id}`, {});
};

export const editUser = async (id, body, header) => {
   return await commonRequest(
      "PUT",
      `${baseURL}/edit-user/${id}`,
      body,
      header
   );
};
