interface CompanyCardProps {
    id: string;
    name: string;
    type: string;
    growth: string;
    launch: string;
    funding: string;
    status: string;
  }
  
  export default function CompanyCard({ id, name, type, growth, launch, funding, status }: CompanyCardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex justify-between items-center">
          <span className="text-purple-500 font-bold">{id}</span>
          <button className="text-sm text-purple-600">Edit</button>
        </div>
  
        <div className="mt-4 space-y-2 text-gray-700">
          <p><strong>Company Name:</strong> {name}</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Growth (1YR):</strong> {growth}</p>
          <p><strong>Launch Date:</strong> {launch}</p>
          <p><strong>Funding:</strong> {funding}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
  
        <div className="mt-4">
          <p className="font-semibold">Reports Submitted</p>
          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
            <span>✅ Business Plan</span>
            <span>✅ Liabilities Report</span>
            <span>✅ Income Statement</span>
            <span>✅ Pitch Deck</span>
            <span>✅ Balance Sheet</span>
            <span>✅ Valuation Report</span>
          </div>
        </div>
  
        <div className="flex justify-between mt-4">
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded border border-red-500 hover:bg-red-200">
            REJECT
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            ACCEPT
          </button>
        </div>
      </div>
    );
  }
  