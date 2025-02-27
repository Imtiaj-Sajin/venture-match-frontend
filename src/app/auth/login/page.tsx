"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import "@/styles/globals.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem("authToken", data.token);  
      console.log("data.token) ==> ", data);
      
      router.push("/admin/company-requests");  
    } else {
      setError(data.message || "Invalid credentials");
    }
  };



  // Handle Google Login
  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/auth/google"; // Redirects to backend Google OAuth
  };

  // After Google login, check if the user is authenticated
  useEffect(() => {
    const checkGoogleLogin = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/auth/welcome", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.token);
          router.push("/admin/company-requests");
        }
      } catch (error) {
        console.error("Google login check failed:", error);
      }
    };

    checkGoogleLogin();
  }, []);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50 relative">
      
      <div className="absolute inset-0 bg-[url('/auth0-bg.png')] bg-cover bg-center opacity-80"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">

          <svg xmlns="http://www.w3.org/2000/svg" width="82" height="40" fill="none" viewBox="0 0 82 40"><path fill="#FFD43D" d="M73.365 19.71c0 2.904-2.241 5.31-5.27 5.31-3.03 0-5.228-2.406-5.228-5.31 0-2.905 2.199-5.312 5.228-5.312s5.27 2.407 5.27 5.311Z"></path><path fill="#FF0C81" d="M48.764 19.544c0 2.946-2.323 5.145-5.27 5.145-2.904 0-5.227-2.2-5.227-5.145 0-2.947 2.323-5.104 5.228-5.104 2.946 0 5.27 2.158 5.27 5.104Z"></path><path fill="#11EEFC" d="M20.074 25.02c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312Z"></path><path fill="#171A26" d="M68.095 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.855-10.83 11.12-10.83 6.349 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.03 0 5.27-2.406 5.27-5.31 0-2.905-2.24-5.312-5.27-5.312-3.029 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM43.08 40c-4.813 0-8.506-2.116-10.373-5.934l4.896-2.655c.913 1.784 2.614 3.195 5.394 3.195 3.486 0 5.85-2.448 5.85-6.473v-.374c-1.12 1.411-3.111 2.49-6.016 2.49-5.768 0-10.373-4.481-10.373-10.581 0-5.934 4.813-10.788 11.12-10.788 6.431 0 11.162 4.605 11.162 10.788v8.299C54.74 35.27 49.76 40 43.08 40Zm.415-15.311c2.946 0 5.27-2.2 5.27-5.145 0-2.947-2.324-5.104-5.27-5.104-2.905 0-5.228 2.158-5.228 5.104s2.323 5.145 5.228 5.145ZM20.074 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.854-10.83 11.12-10.83 6.348 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM0 0h5.892v30H0V0ZM82 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
        </div>

        <p className="text-gray-600 text-sm text-center mb-6">Log in to Optra to boost your future</p>


        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Continue
          </button>
        </form>

        {/* Signup Option */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-purple-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

        {/* ---- */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl mr-2" /> Continue with Google
        </button>
       
      </div>
    </div>
  );
}
