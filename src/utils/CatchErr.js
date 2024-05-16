export const CatchErr = (fn) => async (params) => {
  try {
    const data = await fn(params);
    if (data?.error) {
      alert(data?.error);
      return;
    }
    return data;
  } catch (error) {
    alert(error?.message || error?.error);
  }
};
