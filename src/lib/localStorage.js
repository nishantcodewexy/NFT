export const getAuthToken = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }
  return "";
};
