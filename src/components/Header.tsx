"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMoon, FaSun, FaCog, FaSignOutAlt } from "react-icons/fa";

import { IoNotificationsCircleOutline } from "react-icons/io5";
import { HiOutlineChevronDown } from "react-icons/hi"; // ✅ Added arrow icon
import { PiNewspaperClippingFill } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";


export default function Header() {
  const [hasNotification, setHasNotification] = useState(true);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dropdown Menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };


  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        router.push("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-white shadow-md p-6 flex justify-end items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <div className="relative cursor-pointer p-1 rounded-full bg-white-100 hover:bg-gray-100">
          <IoNotificationsCircleOutline className="h-6 w-6 text-gray-700" />
          {hasNotification && (
            <span className="absolute top-1 right-1 bg-red-500 text-white w-2.5 h-2.5 rounded-full"></span>
          )}
        </div>

        {/* Profile Picture + Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <Image
              src="/profile1.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
            />
            <span className="text-gray-700">▼</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-out">
              <button
                onClick={toggleTheme}
                className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
              >
                {darkMode ? <FaSun className="mr-2 text-yellow-500" /> : <FaMoon className="mr-2 text-gray-500" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={() => router.push("/admin/settings")}
                className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-2 text-gray-600" />
                Settings
              </button>
              
              <button
                onClick={() => router.push("/newsletters")}
                className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
              >
                <PiNewspaperClippingFill className="mr-2 text-gray-600" />
                News Posted
              </button>
              
               <button
                onClick={() => router.push("/")}
                className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
              >
                <AiFillHome className="mr-2 text-gray-600" />
                Home
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
