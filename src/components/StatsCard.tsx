interface StatsCardProps {
    title: string;
    value: string;
    percentage: string;
    status: "up" | "down";
    icon: string;
  }
  
  export default function StatsCard({ title, value, percentage, status, icon }: StatsCardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border">
        <div className="text-3xl bg-gray-100 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-sm ${status === "up" ? "text-green-500" : "text-red-500"}`}>
            {status === "up" ? "🔼" : "🔽"} {percentage} {status === "up" ? "Up" : "Down"} from yesterday
          </p>
        </div>
      </div>
    );
  }
  