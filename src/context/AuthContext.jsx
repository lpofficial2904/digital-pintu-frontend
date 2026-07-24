import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Logged In User
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("user")) {
        setLoading(false);
        return;
      }
      // const token = localStorage.getItem("token");

      // if (!token) {
      //   setLoading(false);
      //   return;
      // }

      // try {
      //   const res = await fetch("http://localhost:5000/api/auth/me", {
      //     credentials: "include",
      //   });
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
  credentials: "include",
});

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.log(error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout


  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
});
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
