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

export { UserLogin, UserRegister };
