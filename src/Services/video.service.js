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

const getSingleVideo = CatchErr(async (slug) => {
  const url = `${BASEURL}/video/${slug}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  return res;
});

const UpdateViews = CatchErr(async (id) => {
  const url = `${BASEURL}/video/${id}`;
  const data = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  return res;
});

const DeleteVideo = CatchErr(async (id) => {
  const url = `${BASEURL}/video/${id}`;
  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  const res = await data.json();
  return res;
});

export { getAllVideo, getSingleVideo, UpdateViews, DeleteVideo };
