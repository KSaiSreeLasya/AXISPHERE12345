import { useState, useEffect } from "react";

interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setUser(authData);
      } catch {
        localStorage.removeItem("adminAuth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Validate credentials
    const validEmail = "admin@axisphere.in";
    const validPassword = "admin2024";

    if (email === validEmail && password === validPassword) {
      const authData: AdminUser = {
        email: email,
        isAuthenticated: true,
      };
      localStorage.setItem("adminAuth", JSON.stringify(authData));
      setUser(authData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: user?.isAuthenticated || false,
    login,
    logout,
  };
}
