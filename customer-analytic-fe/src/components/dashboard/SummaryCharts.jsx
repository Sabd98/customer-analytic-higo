// SummaryCharts component to display various statistics
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const SummaryCharts = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loading size={48} />
      </div>
    );
  }

  return (
    <section className="bg-purple-200 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Summary Statistics</h2>
      {/* Grid layout for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <article>
          <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
          <ResponsiveContainer
            width="100%"
            height={300}
            className={"border border-purple-600/30 rounded-lg px-2"}
          >
            <PieChart>
              <Pie
                data={data.gender}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.gender.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </article>

        {/* Brand Distribution */}
        <article>
          <h3 className="text-lg font-medium mb-4">Brand Distribution</h3>
          <ResponsiveContainer
            width="100%"
            height={300}
            className={"border border-purple-600/30 rounded-lg px-2"}
          >
            <BarChart data={data.brands}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </article>

        {/* Location Distribution */}
        <article>
          <h3 className="text-lg font-medium mb-4">
            Location Type Distribution
          </h3>
          <ResponsiveContainer
            width="100%"
            height={300}
            className={"border border-purple-600/30 rounded-lg px-2"}
          >
            <BarChart data={data.locations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </article>

        {/* Interest Distribution */}
        <article>
          <h3 className="text-lg font-medium mb-4">Digital Interests</h3>
          <ResponsiveContainer
            width="100%"
            height={300}
            className={"border border-purple-600/30 rounded-lg px-2"}
          >
            <BarChart data={data.interests}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>
    </section>
  );
};

export default SummaryCharts;
