import { CatchErr } from "../utils/CatchErr";
import { BASEURL } from "../utils/Constant";

const UserLogin = CatchErr(async (body) => {
  const url = `${BASEURL}/user/login`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res = await data.json();
  return res;
});
const UserRegister = CatchErr(async (body) => {
  const url = `${BASEURL}/user`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res = await data.json();
  return res;
});

const getUser = CatchErr(async () => {
  if (!localStorage.getItem("token")) return;
  const url = `${BASEURL}/user`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  const res = await data.json();
  return res;
});

export { UserLogin, UserRegister, getUser };
