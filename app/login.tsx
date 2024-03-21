"use client";
import { useState } from "react";
import Image from "next/image";
import tapet from "../public/tapet.png";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // Handle signup logic
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      router.push("/map");
    } else {
      // Handle login logic
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");
      if (storedUsername === username && storedPassword === password) {
        router.push("/map");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <Image src={tapet} alt="Background Image" className="object-cover h-screen" />
      </div>
    </div>
  );
};

export default LoginPage;