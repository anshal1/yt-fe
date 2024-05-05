export const CatchErr = (fn) => async (params) => {
  try {
    const data = await fn(params);
    return data;
  } catch (error) {
    alert(error?.message);
  }
};
