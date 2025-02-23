import axios from "axios";

const API = axios.create({
  baseURL: "https://backenddiversion2k25.onrender.com/api/v1", // Use environment variable if available
});

// 🔹 Attach Authorization token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await API.post("/user/login", { email, password });
    console.log(res.data);
    if (res.data?.token) {
      localStorage.setItem("authToken", res.data.token); // ✅ Store token
      return res.data;
    }
    throw new Error("Invalid login response");
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// 🔹 Signup User
export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await API.post("/user/signup", { name, email, password });
    if (res.data?.token) {
      localStorage.setItem("authToken", res.data.token); // ✅ Store token
      return res.data;
    }
    throw new Error("Invalid signup response");
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// 🔹 Check Authentication Status
export const checkAuthStatus = async () => {
  try {
    const res = await API.get("/user/auth-status");
    return res.data || null;
  } catch (error) {
    console.warn("Auth Status Check Failed:", error);
    localStorage.removeItem("authToken"); // ❌ Remove invalid token
    return null;
  }
};

// 🔹 Send a Chat Message
export const sendChatRequest = async (message: string) => {
  try {
    const res = await API.post("/chat/new", { message });
    return res.data;
  } catch (error) {
    console.error("Chat Request Error:", error);
    throw error;
  }
};

// 🔹 Get All User Chats
export const getUserChats = async () => {
  try {
    const res = await API.get("/chat/all-chats",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    });
    return res.data;
  } catch (error) {
    console.error("Fetching Chats Error:", error);
    throw error;
  }
};

// 🔹 Delete All Chats
export const deleteUserChats = async () => {
  try {
    const res = await API.delete("/chat/delete");
    return res.data;
  } catch (error) {
    console.error("Delete Chats Error:", error);
    throw error;
  }
};

// 🔹 Logout User
export const logoutUser = async () => {
  try {
    const res = await API.post("/user/logout");
    localStorage.removeItem("authToken"); // ✅ Remove token on logout
    return res.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};
