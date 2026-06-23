"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { axiosClient } from "@/utils/AxiosClient";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const mainContext = createContext();

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axiosClient.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("PROFILE:", response.data);

      setUser(response.data.data);
    } catch (error) {
      console.log("PROFILE ERROR:", error);

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const LogoutHandler = () => {
    localStorage.removeItem("token");

    setUser(null);

    toast.success("Logout Successfully");

    router.replace("/login");
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <mainContext.Provider
      value={{
        user,
        setUser,
        fetchUserProfile,
        LogoutHandler,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};