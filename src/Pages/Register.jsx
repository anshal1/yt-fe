import React, { useState } from "react";
import style from "../Styles/Login-Register.module.css";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { UserRegister } from "../Services/user.service";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    name: "",
    username: "",
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
    const data = await UserRegister(Data);
    if (data) {
      localStorage.setItem("token", data?.token);
      navigate("/");
    }
  };
  return (
    <section className={style["page"]}>
      <div>
        <h2>Register To Continue</h2>
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Name"}
          name="name"
          value={Data.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Username"}
          name="username"
          value={Data.username}
          onChange={handleInputChange}
        />
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Email"}
          type="email"
          name="email"
          value={Data.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={style["input-wrapper"]}>
        <Input
          placeholder={"Enter Pasword"}
          type="password"
          name="password"
          value={Data.password}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={handleLogin}>Register</Button>
    </section>
  );
};

export default Register;
