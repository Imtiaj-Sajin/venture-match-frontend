"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { BsBuilding, BsPeople, BsNewspaper, BsBarChart, BsGear, BsChatDots } from "react-icons/bs"; // ✅ Correct Icons

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Company Requests", path: "/admin/company-requests", icon: <BsBuilding className="h-5 w-5" /> },
    { name: "Investor Requests", path: "/admin/investor-requests", icon: <BsPeople className="h-5 w-5" /> },
    { name: "Newsletter", path: "/newsletter", icon: <BsNewspaper className="h-5 w-5" /> },
    { name: "KPIs", path: "/kpis", icon: <BsBarChart className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <BsGear className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white text-gray-800 border-r fixed left-0 top-0 p-6 font-sans">
      {/* Logo */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Logo</h2>

      {/* Support Link */}
      <div className="flex items-center gap-3 text-gray-600 text-base mb-6 cursor-pointer hover:text-gray-900">
        <BsChatDots className="h-5 w-5" />
        <span>Support</span>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-4">
              <Link
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition 
                ${
                  pathname === item.path
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-gray-600 text-base cursor-pointer hover:text-gray-900">
        <FiLogOut className="h-5 w-5" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
