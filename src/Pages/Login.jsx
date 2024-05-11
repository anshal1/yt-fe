import React from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import style from "../Styles/Login-Register.module.css";

const Login = () => {
  return (
    <section className={style["page"]}>
      <div>
        <h2>Login To Continue</h2>
      </div>
      <div className={style["input-wrapper"]}>
        <Input placeholder={"Enter Username"} />
      </div>
      <div className={style["input-wrapper"]}>
        <Input placeholder={"Enter Email"} type={"email"} />
      </div>
      <div className={style["input-wrapper"]}>
        <Input placeholder={"Enter Password"} type={"password"} />
      </div>

      <Button>Login</Button>
    </section>
  );
};

export default Login;
