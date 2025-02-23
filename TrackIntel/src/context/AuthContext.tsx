import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { loginUser, logoutUser, signupUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Load user from localStorage on refresh, no API call needed
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data && data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.name }));

      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    if (data && data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify({ email: data.email, name }));

      setUser({ email: data.email, name });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
