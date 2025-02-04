"use client";

import { FaUsers, FaBoxOpen, FaChartLine, FaClock } from "react-icons/fa"; // ✅ Smart icons
// import { IoMdTrendingUp } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";
import { FaBan } from "react-icons/fa";


interface StatsCardProps {
  title: string;
  value: string | number;
  percentage: string;
  status: "up" | "down";
  icon: "approved" | "pending" | "rejected" | "queue";
}

const iconMap = {
  approved: { icon: <FaUsers className="text-purple-600 text-xl" />, bg: "bg-purple-100" },
  pending: { icon: <FaBoxOpen className="text-yellow-600 text-xl" />, bg: "bg-yellow-100" },
  rejected: { icon: <FaBan className="text-red-600 text-xl" />, bg: "bg-red-100" },
  queue: { icon: <FaClock className="text-orange-600 text-xl" />, bg: "bg-orange-100" },
};

export default function StatsCard({ title, value, percentage, status, icon }: StatsCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col relative transition transform hover:scale-105">
      {/* Icon in Top Right with Background Circle */}
      <div className={`absolute top-4 right-6 w-16 h-16 flex items-center justify-center rounded-b-2xl ${iconMap[icon].bg}`}>
        {iconMap[icon].icon}
      </div>

      {/* Title and Value */}
      <div className="mb-6">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      {/* Status */}
      <p className={`text-sm flex items-center ${status === "up" ? "text-green-500" : "text-red-500"}`}>
        {status === "up" ? <FiTrendingUp className="mr-2"/> : <FiTrendingDown className="mr-2"/>} {percentage} {status === "up" ? " Up" : "Down"} from yesterday
      </p>
    </div>
  );
}
