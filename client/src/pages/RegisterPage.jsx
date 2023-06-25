import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitRegister(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("register ok");
    } catch (error) {
      alert("register failed");
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col grow items-center mt-4 justify-around">
      <div className="mb-50">
        <h1 className="text-4xl text-center mb-4">注册</h1>
        <form className="max-w-md max-auto" onSubmit={submitRegister}>
          <input
            type="text"
            placeholder="昵称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">注册</button>
          <div className="text-center py-2 text-gray-500 ">
            已有账号？
            <Link to="/login" className="text-black underline">
              现在登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
