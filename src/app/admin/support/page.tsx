"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLock, FaEllipsisV } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const users = [
  { id: 1, name: "Wahiduzzaman Suva", message: "Hii.. I would like to orde...", time: "5s", unread: 1, active: true, img: "/profile1.jpg" },
  { id: 2, name: "Arlene McCoy", message: "Not too bad, just trying...", time: "5s", unread: 1, active: false, img: "/profile2.jpg" },
  { id: 3, name: "Kristin Watson", message: "Hi there, I'm having tro...", time: "5s", unread: 0, active: false, img: "/profile3.jpg" },
  { id: 4, name: "Jenny Wilson", message: "Hey, I think there's a mi...", time: "5s", unread: 0, active: false, img: "/profile4.jpg" },
  { id: 5, name: "Leslie Alexander", message: "Hey there, I received a...", time: "5s", unread: 0, active: false, img: "/profile5.jpg" },
  { id: 6, name: "Ronald Richards", message: "Hi, I've been waiting for...", time: "5s", unread: 0, active: false, img: "/profile6.jpg" },
  { id: 7, name: "Theresa Webb", message: "Hello, I'm having troub...", time: "5s", unread: 0, active: false, img: "/profile7.jpg" },
];

export default function SupportPage() {
    const [selectedUser, setSelectedUser] = useState(users[0]);
  
    return (
      <div className="flex h-[calc(100vh-64px)]"> {/* Fix: Subtract header height (Assuming 64px) */}
        {/* Left Sidebar - Chat List */}
        <div className="w-1/4 bg-gray-50 border-r p-4">
          <input type="text" placeholder="Search by name or id" className="w-full p-2 border rounded-lg mb-4" />
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  selectedUser.id === user.id ? "bg-purple-100" : "hover:bg-gray-200"
                }`}
              >
                <Image src={user.img} alt={user.name} width={40} height={40} className="rounded-full" />
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-semibold">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.message}</p>
                </div>
                <div className="text-xs text-gray-500">{user.time}</div>
                {user.unread > 0 && (
                  <span className="ml-2 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {user.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 flex items-center border-b">
            <Image src={selectedUser.img} alt={selectedUser.name} width={50} height={50} className="rounded-full" />
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
              <p className="text-sm text-green-500">● Active Now</p>
            </div>
            <FaEllipsisV className="text-gray-500 cursor-pointer" />
          </div>
  
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="self-start bg-gray-200 p-3 rounded-lg max-w-md">
                <p className="text-sm">Hi, I can't change my password. Could you help?</p>
                <span className="text-xs text-gray-500 block mt-1">4:38 PM</span>
              </div>
  
              <div className="self-end bg-purple-500 text-white p-3 rounded-lg max-w-md">
                <p className="text-sm">Hii... Please submit your details now!</p>
                <span className="text-xs text-white block mt-1">4:38 PM ✓✓</span>
              </div>
  
              <div className="self-start bg-gray-200 p-3 rounded-lg max-w-md">
                <Image src="/chat-image.jpg" width={200} height={120} alt="Attachment" className="rounded-lg" />
                <span className="text-xs text-gray-500 block mt-1">4:38 PM</span>
              </div>
            </div>
          </div>
  
          {/* Chat Input */}
          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              placeholder="How can I help you?"
              className="flex-1 p-3 border rounded-lg focus:outline-none"
            />
            <button className="ml-2 bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600">
              <FiSend />
            </button>
          </div>
        </div>
  
        {/* Right Sidebar - Profile & Stats */}
        <div className="w-1/4 bg-white border-l p-6">
          {/* User Profile */}
          <div className="text-center">
            <Image src={selectedUser.img} alt={selectedUser.name} width={80} height={80} className="rounded-full" />
            <h3 className="text-lg font-semibold mt-3">{selectedUser.name}</h3>
            <p className="text-gray-500 text-sm">Angel Investor</p>
            <div className="mt-3">
              <FaLock className="text-gray-500 inline-block" />
            </div>
          </div>
  
          {/* Investment Chart (Placeholder) */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
            <h4 className="text-sm text-gray-500 mb-3">Invested On</h4>
            <div className="h-16 flex justify-between items-end">
              <div className="w-3 bg-purple-300 h-6"></div>
              <div className="w-3 bg-purple-400 h-10"></div>
              <div className="w-3 bg-purple-500 h-14"></div>
              <div className="w-3 bg-purple-600 h-16"></div>
              <div className="w-3 bg-purple-700 h-20"></div>
            </div>
          </div>
  
          {/* View More Button */}
          <button className="mt-6 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
            See All
          </button>
        </div>
      </div>
    );
  }
  