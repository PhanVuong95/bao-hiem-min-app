import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/headerPage";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import axios from "axios";

const LayoutPage: React.FunctionComponent = (props) => {
  const user = useRecoilValue(userState);
  // console.log(user.userInfo.name);

  const userId = user.userInfo.id;
  // console.log(userId);

  const userName = user.userInfo.name;
  // console.log(userName);

  const login = async () => {
    try {
      const { data } = await axios.post(
        `https://baohiem.dion.vn/account/api/login-mini-app`,
        {
          Username: userId,
          // fullName: userName,
        }
      );

      // Saving token to cookies
      document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

      // Saving token to local storage
      localStorage.setItem("token", data.resources.accessToken);
      localStorage.setItem("profile", JSON.stringify(data.resources.profile));

      console.log("Đăng nhập - đăng ký thành công!!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <HeaderPage />
      <main>
        <Outlet />
      </main>
      <footer>{/* Nội dung footer ở đây, nếu có */}</footer>
    </>
  );
};

export default LayoutPage;
