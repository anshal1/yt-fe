import { CatchErr } from "../utils/CatchErr";
import { BASEURL } from "../utils/Constant";

const getAllVideo = CatchErr(async ({ page, limit }) => {
  const url = `${BASEURL}/video?page=${page}&limit=${limit}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  return res;
});

export { getAllVideo };
