import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import style from "../Styles/Login-Register.module.css";
import { UserLogin } from "../Services/user.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async () => {
    const data = await UserLogin(Data);
    if (data) {
      localStorage.setItem("token", data?.token);
      navigate("/");
    }
  };

  return (
    <section className={style["page"]}>
      <div>
        <h2>Login To Continue</h2>
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Email"}
          type={"email"}
          name="email"
          value={Data.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Password"}
          type={"password"}
          name="password"
          value={Data.password}
          onChange={handleInputChange}
        />
      </div>

      <Button onClick={handleLogin}>Login</Button>
    </section>
  );
};

export default Login;
