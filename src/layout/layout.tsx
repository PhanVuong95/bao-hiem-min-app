import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/header_page";
import axios from "axios";
import { authorize, closeApp, getSetting, getUserInfo } from "zmp-sdk/apis";
import { ProfileContext } from "../components/user_profile_context";
import { BASE_URL } from "../utils/constants";

export let logged = false;

const LayoutPage: React.FunctionComponent = (props) => {
  const profieContext = useContext(ProfileContext);

  const { userProfile, setUserProfile } = profieContext;

  useEffect(() => {
    getSetting({
      success: (data) => {
        if (!data["authSetting"]["scope.userInfo"]) {
          authorize({
            scopes: ["scope.userInfo"],
            success: async (data) => {
              // xử lý khi gọi api thành công

              const user = await getUserInfo({
                avatarType: "normal",
              });

              setUserProfile(() => user);
            },
            fail: (error) => {
              // xử lý khi gọi api thất bại
              // closeMiniApp();
              console.log("Không cấp quyền");
            },
          });
        }
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  }, []);

  const login = async () => {
    try {
      logged = true;

      const user = await getUserInfo({
        avatarType: "normal",
      });

      setUserProfile(() => user);

      const userId = user.userInfo.id;

      const { data } = await axios.post(
        `${BASE_URL}/account/api/login-mini-app`,
        {
          Username: userId,
          fullName: user.userInfo.name,
          photo: user.userInfo.avatar
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

  if (!logged) {
    login();
  }

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
