import React, { createContext, useState } from "react";

export const userContext = createContext();
export const registerContext = createContext();
export const deleteContext = createContext();
export const updateContext = createContext();

function ContextShare({ children }) {
   const [userData, setUserData] = useState("");
   const [registerData, setRegisterData] = useState("");
   const [deletedData, setDeletedData] = useState("");
   const [updatedData, setUpdatedData] = useState("");
   return (
      <>
         <userContext.Provider value={{ userData, setUserData }}>
            <registerContext.Provider value={{ registerData, setRegisterData }}>
               <deleteContext.Provider value={{ deletedData, setDeletedData }}>
                  <updateContext.Provider
                     value={{ updatedData, setUpdatedData }}
                  >
                     {children}
                  </updateContext.Provider>
               </deleteContext.Provider>
            </registerContext.Provider>
         </userContext.Provider>
      </>
   );
}

export default ContextShare;
