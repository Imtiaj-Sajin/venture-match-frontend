"use client";

import { useState } from "react";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline"; // ✅ Use correct icon
import { IoNotificationsCircleOutline } from "react-icons/io5";

export default function Header() {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <header className="bg-white shadow-md p-6 flex justify-end items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center space-x-6">
        {/* Notification Bell (Correct Icon) */}
        <div className="relative cursor-pointer  p-2 rounded-full">
          <IoNotificationsCircleOutline className="h-6 w-6 text-gray-700" /> {/* ✅ Correct Icon */}
          {hasNotification && (
            <span className="absolute top-2 right-2 bg-red-500 text-white w-2.5 h-2.5 rounded-full"></span>
          )}
        </div>

        {/* Profile Picture */}
        <div className="relative flex items-center cursor-pointer">
          <Image
            src="/profile1.jpg" 
            
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
