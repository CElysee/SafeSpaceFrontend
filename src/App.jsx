import { useEffect } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken, logout } from "./features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

function App() {
  const userToken = useSelector(selectUserToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token has expired, perform logout or refresh token
        // console.log("Token has expired");
        dispatch(logout());
      }
    }
  }, []);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
