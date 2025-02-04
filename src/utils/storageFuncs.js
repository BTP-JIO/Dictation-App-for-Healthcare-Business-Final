export const getUserData = () => {
  const data = JSON.parse(localStorage.getItem("User"));
  return data;
};

export const storeUserData = (data) => {
  localStorage.setItem("User", JSON.stringify(data));
};
