/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import bg from "@/assets/image/bg.png";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  // Local form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const result = await login(formData).unwrap();

      if (result?.success) {
        // ✅ Save token in cookies
        Cookies.set("token", result.data.token);
        Cookies.set("role", result.data.role);

        toast.success(result.message || "Logged in successfully");

        // ✅ Redirect based on role
        if (result.data.role === "Admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid email or password");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="flex w-[70vw] h-[70vh] shadow-md border rounded-2xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-1/2 px-14">
          {/* Logo */}
          <div className="flex items-center mb-12 space-x-2">
            <div className="bg-teal-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
              🌊
            </div>
            <span className="text-gray-800 font-semibold text-xl">Logo</span>
          </div>

          {/* Login Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@gmail.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-teal-300" : "bg-[#C5F8F6] hover:bg-[#B0F0ED]"
              } text-gray-800 font-medium py-2 rounded-md transition`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="relative w-1/2 h-full">
          <Image
            src={bg}
            alt="Login background"
            fill
            className="object-cover rounded-l-none rounded-r-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
