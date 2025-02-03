import StatsCard from "@/components/StatsCard";
import CompanyCard from "@/components/CompanyCard";

export default function CompanyRequests() {
  const stats = [
    { title: "Total Approved", value: "689", percentage: "8.5%", status: "up", icon: "👤" },
    { title: "In Pending", value: "32", percentage: "1.3%", status: "up", icon: "📦" },
    { title: "Total Rejected", value: "95", percentage: "4.3%", status: "down", icon: "📉" },
    { title: "In Queue", value: "19", percentage: "1.8%", status: "up", icon: "⏳" },
  ];

  const companyRequests = [
    { id: "#44532", name: "Coca Coloa", type: "ecommerce", growth: "1282834122412", launch: "12/11/2020", funding: "$2.8b", status: "operational" },
    { id: "#53532", name: "New Balance", type: "ecommerce", growth: "1282834122412", launch: "12/11/2020", funding: "$2.8b", status: "operational" },
    { id: "#244532", name: "Nike", type: "ecommerce", growth: "1282834122412", launch: "12/11/2020", funding: "$2.8b", status: "operational" },
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Company Request Cards */}
      <div className="grid grid-cols-3 gap-6">
        {companyRequests.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </div>
  );
}
