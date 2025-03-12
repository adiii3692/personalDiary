import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const useLog = () => {
  const [userLogin, setUserLogin] = useState<boolean>(false);

  const checkLogin = () => {
    if (localStorage.getItem("user_id") != null) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user_id");
    setUserLogin(false);
    redirect("/"); // Redirect to home page after logout
  };

  useEffect(() => {
    checkLogin();
  })

  return { userLogin, checkLogin, logoutUser };
};

export default useLog;
