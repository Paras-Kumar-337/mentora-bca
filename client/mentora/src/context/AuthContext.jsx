import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  loginUser,
  logoutUser,
  signupUser,
} from "../services/authService";


const AuthContext = createContext();


// ======================================
// PROVIDER
// ======================================

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);


  // ====================================
  // LOAD USER ON REFRESH
  // ====================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const storedUser =
          localStorage.getItem("mentoraUser");

        if (!storedUser) {
          setLoading(false);
          return;
        }


        const profile = await getProfile();

        setUser(profile);

      } catch (error) {

        console.log(error);

        localStorage.removeItem(
          "mentoraUser"
        );
      }

      setLoading(false);
    };

    loadUser();

  }, []);


  // ====================================
  // SIGNUP
  // ====================================

  const signup = async (userData) => {

    const data = await signupUser(
      userData
    );

    setUser(data);
    localStorage.setItem(
      "mentoraUser",
      JSON.stringify(data)
    );

    return data;
  };


  // ====================================
  // LOGIN
  // ====================================

  const login = async (userData) => {

    const data = await loginUser(
      userData
    );

    setUser(data);
    localStorage.setItem(
      "mentoraUser",
      JSON.stringify(data)
    );

    return data;
  };


  // ====================================
  // LOGOUT
  // ====================================

  const logout = () => {

    localStorage.removeItem(
      "mentoraUser"
    );

    logoutUser();

    setUser(null);

    window.location.href = "/";
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ======================================
// CUSTOM HOOK
// ======================================

export const useAuth = () => {

  return useContext(AuthContext);
};