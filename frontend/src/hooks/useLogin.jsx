import { useState } from "react";

export default function useLogin(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const login = async (object) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        });
        const user = await response.json();
        
        if (user.error) {
          setError(user.error);
          setIsLoading(false);
          throw new Error(user.error);
        }
    
        // localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
      };

      return { login, isLoading, error };
}