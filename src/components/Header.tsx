"use client";

import { useState } from "react";
import Image from "next/image";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { HiOutlineChevronDown } from "react-icons/hi"; // ✅ Added arrow icon

export default function Header() {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <header className="bg-white shadow-md p-6 flex justify-end items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center space-x-6">
        {/* Notification Bell (Correct Icon) */}
        <div className="relative cursor-pointer p-1 rounded-full bg-white-100 hover:bg-gray-100">
          <IoNotificationsCircleOutline className="h-6 w-6 text-gray-700" />
          {hasNotification && (
            <span className="absolute top-1 right-1 bg-red-500 text-white w-2.5 h-2.5 rounded-full"></span>
          )}
        </div>

        {/* Profile Section with Dropdown Arrow */}
        <div className="relative flex items-center cursor-pointer space-x-2">
          {/* Profile Picture */}
          <Image
            src="/profile1.jpg"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full"
          />
          {/* Dropdown Arrow */}
          <HiOutlineChevronDown className="h-4 w-4 text-gray-500" /> {/* ✅ Correct Arrow Icon */}
        </div>
      </div>
    </header>
  );
}
