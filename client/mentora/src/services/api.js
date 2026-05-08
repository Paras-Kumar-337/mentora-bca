import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});


// ======================================
// ATTACH TOKEN AUTOMATICALLY
// ======================================

API.interceptors.request.use((req) => {

  const user = JSON.parse(
    localStorage.getItem("mentoraUser")
  );

  if (user?.token) {

    req.headers.Authorization =
      `Bearer ${user.token}`;
  }

  return req;
});

export default API;