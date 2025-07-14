import Loading from "@/app/loading";

// Card Component for displaying Summary data

const StatCard = ({ title, value, icon, color,isLoading, }) => {
  
    if (isLoading) {
      return (
        <div className="h-96 flex items-center justify-center">
          <Loading size={48} />
        </div>
      );
    }
  
  return (
    <article className="bg-purple-200 rounded-lg shadow p-6 transition-transform hover:scale-105">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </article>
  );
};

export default StatCard;


