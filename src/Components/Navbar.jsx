import React, { useContext } from "react";
import style from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import Button from "./Button";
import { UserContext } from "../Context";
const Navbar = () => {
  const { IsFullScreen } = useContext(UserContext);
  if (IsFullScreen) {
    return;
  }
  return (
    <nav className={style["navbar"]}>
      <div className={style["title"]}>
        <Link to={"/"}>
          <h3>My-TUBE</h3>
        </Link>
      </div>
      <div className={style["links"]}>
        <ul>
          <li>
            <Link to={"/upload"}>Upload</Link>
          </li>
          <li>
            {!localStorage.getItem("token") ? (
              <Link to={"/login"}>Login</Link>
            ) : (
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
