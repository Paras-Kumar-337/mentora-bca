import API from "./api";


// ======================================
// SIGNUP
// ======================================

export const signupUser = async (userData) => {

  const { data } = await API.post(
    "/auth/signup",
    userData
  );

  localStorage.setItem(
    "mentoraUser",
    JSON.stringify(data)
  );

  return data;
};


// ======================================
// LOGIN
// ======================================

export const loginUser = async (userData) => {

  const { data } = await API.post(
    "/auth/login",
    userData
  );

  localStorage.setItem(
    "mentoraUser",
    JSON.stringify(data)
  );

  return data;
};


// ======================================
// GET PROFILE
// ======================================

export const getProfile = async () => {

  const { data } = await API.get(
    "/auth/profile"
  );

  return data;
};


// ======================================
// LOGOUT
// ======================================

export const logoutUser = () => {

  localStorage.removeItem("mentoraUser");
};