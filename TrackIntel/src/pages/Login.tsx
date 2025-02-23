import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] min-h-[600px] bg-white/80 backdrop-blur-lg rounded-[32px] p-6 flex shadow-2xl">
        <div className="w-full lg:w-5/12 p-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800"></h2>
          </div>
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-600 mb-8">Sign in to continue</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all text-gray-900"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all text-gray-900"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                Login <IoIosLogIn className="w-5 h-5" />
              </button>
              <p className="text-center text-gray-600 text-sm mt-6">
                Don't have an account?{' '}
                <a href="/signup" className="text-gray-900 font-semibold hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block lg:w-7/12 relative">
          <img
            src="/Popular-F1-team-logos.png"
            alt="Team working"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
