import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import NavbarHeader from "./components/NavbarHeader";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
   return (
      <>
         <Routes>
            <Route path="/" Component={Login} />
            <Route path="/home" Component={Dashboard} />
            <Route path="/employees" Component={Employees} />
            <Route path="/employees/new" Component={CreateEmployee} />
            <Route path="/employees/edit/:id" Component={EditEmployee} />
         </Routes>
      </>
   );
}

export default App;
