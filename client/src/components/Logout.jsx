import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  const [toHomePage, setToHomePage] = useState(null);

  async function handleLogout() {
    // cookie失效
    await axios.post("/logout");
    // 跳转登陆页面 or 主页面
    setToHomePage("/");
    // 用户信息设为初始状态
    setUser(null);
  }
  // 跳转主页面
  if (toHomePage) {
    return <Navigate to={toHomePage} />;
  }
  return (
    <div className="w-full text-center flex flex-col max-w-lg mx-auto gap-2 justify-center items-center ">
      <span className="font-bold font-normal">
        用户{user?.name}
        <br />
        账号{user?.email}
      </span>
      <span className="text-gray">您已准备登出！</span>
      <button
        className="bg-primary max-w-sm mt-2 rounded-lg text-center"
        onClick={handleLogout}
      >
        登出
      </button>
    </div>
  );
};

export default Logout;
