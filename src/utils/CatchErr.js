import { toast } from "react-toastify";

export const CatchErr = (fn) => async (params) => {
  try {
    const data = await fn(params);
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    return data;
  } catch (error) {
    toast.error(error?.message || error?.error);
  }
};
