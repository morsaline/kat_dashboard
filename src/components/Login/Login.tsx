/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/logo.png.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const result = await login(formData).unwrap();

      if (result?.success) {
        Cookies.set("token", result.data.token);
        Cookies.set("role", result.data.role);

        toast.success(result.message || "Logged in successfully");

        router.push(result.data.role === "ADMIN" ? "/dashboard" : "/");
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#e6a51e] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        {/* Logo */}
        <div className="flex justify-center -mb-16 ">
          <Image
            src={logo} // file from public/
            alt="TRADI Logo"
            width={340} // adjust as needed
            height={240}
            priority
          />
        </div>

        {/* Card */}
        <div className="bg-[#e6a51e]">
          <h2 className="text-gray-900 text-lg font-semibold mb-1">
            Login to your account
          </h2>
          <p className="text-gray-800 text-sm mb-6">
            Welcome back to your workspace
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            {/* Email */}
            <div className="text-left">
              <label className="block text-sm text-gray-900 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email here"
                className="w-full border border-gray-600 bg-transparent text-black px-3 py-2 rounded-md focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="block text-sm text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password here"
                  className="w-full border border-gray-600 bg-transparent text-black px-3 py-2 pr-10 rounded-md focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <div className="px-5">
              {" "}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-medium py-2 rounded-md shadow-sm hover:bg-gray-100"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
