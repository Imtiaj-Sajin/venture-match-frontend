"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Company Requests", path: "/company-requests", icon: "📂" },
    { name: "Investor Requests", path: "/investor-requests", icon: "💰" },
    { name: "Newsletter", path: "/newsletter", icon: "📰" },
    { name: "KPIs", path: "/kpis", icon: "📊" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 h-screen bg-white text-gray-800 border-r fixed left-0 top-0 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Logo</h2>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-4">
              <Link
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium 
                ${
                  pathname === item.path
                    ? "bg-purple-100 text-purple-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6">
        <button className="flex items-center gap-3 text-gray-600 hover:text-gray-900">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
