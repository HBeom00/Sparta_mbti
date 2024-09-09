import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import Header from "../components/Header";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/profile" />;
};
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/signup" element={<PublicRoute element={Signup} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/test" element={<PrivateRoute element={TestPage} />} />
        <Route
          path="/result"
          element={<PrivateRoute element={TestResultPage} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
