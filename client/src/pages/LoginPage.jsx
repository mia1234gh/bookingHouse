import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function submitLogin(e) {
    e.preventDefault();
    try {
      // 获取user并保存
      const response = await axios.post("login", {
        email,
        password,
      });
      setUser(response.data);
      alert("login success!");
      setRedirect(true);
    } catch (err) {
      alert("login failed!");
      console.log(err);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col grow items-center mt-4 justify-around">
      <div className="mb-55">
        <h1 className="text-4xl text-center mb-4">登录</h1>
        <form className="max-w-md max-auto" onSubmit={submitLogin}>
          <input
            type="email"
            placeholder="邮箱@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">登录</button>
          <div className="text-center py-2 text-gray-500 ">
            没有账号？
            <Link to="/register" className="text-black underline">
              现在注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
