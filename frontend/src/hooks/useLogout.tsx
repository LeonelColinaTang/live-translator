import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
    // We make an API call to logout
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
    //   If it is successful, we set the AuthUser to null
      setAuthUser(null);

    } catch (error: any) {
      // toast.error(error)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogOut;
