import { useEffect, useState } from "react";
import HeaderContext from ".././context/HeaderContext";
import Main from "./Main";
import Sidebar from "./Sidebar";
import LoginForm from "./loginForm/LoginForm";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slices/commonSlice";
import { useLocation } from "react-router-dom";
import SetPassword from "./setPassword/SetPassword";
import { selectUser } from "../store/slices/UserSlice";
const Layout = () => {
  const user = useSelector(selectUser);

  const [value, setValue] = useState(user);

  useEffect(() => {
    setValue(user);
  }, [user]);

  const updateHeaderTitle = (newValue: string) => {
    setValue(newValue);
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-full">
          <HeaderContext.Provider value={{ value, updateHeaderTitle }}>
            <Sidebar />
            <Main />
          </HeaderContext.Provider>
        </div>
      ) : location.pathname === "/set-password" ? (
        <SetPassword />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Layout;
