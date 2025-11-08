import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { safeJsonParse } from "@/lib/api-utils";
import {
  Users,
  Calendar,
  TrendingUp,
  School,
  Activity,
  Clock,
  BarChart3,
  ArrowRight,
  Download,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

interface DashboardStats {
  totalRegistrations: number;
  registrationsToday: number;
  registrationsThisWeek: number;
  registrationsThisMonth: number;
  byClass: Record<string, number>;
  bySchool: Record<string, number>;
  byAge: Record<string, number>;
  byHour: Record<string, number>;
  dailyTrends: Record<string, number>;
  topSchools: Record<string, number>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const result = await safeJsonParse(response);
      if (result.ok) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      const result = await safeJsonParse(response);
      if (result.ok && result.data) {
        const csv = [
          ["Date", "Time", "Name", "Address", "Class", "Age", "School", "Phone", "WhatsApp"],
          ...result.data.map((sub: any) => [
            sub.date,
            sub.time,
            sub.name,
            sub.address,
            sub.class,
            sub.age,
            sub.school,
            sub.phone,
            sub.whatsapp,
          ]),
        ]
          .map((row) => row.map((cell) => `"${cell}"`).join(","))
          .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `submissions-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total Registrations",
      value: stats?.totalRegistrations || 0,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Today",
      value: stats?.registrationsToday || 0,
      icon: Calendar,
      color: "bg-green-500",
      change: "+5",
    },
    {
      title: "This Week",
      value: stats?.registrationsThisWeek || 0,
      icon: Activity,
      color: "bg-purple-500",
      change: "+23",
    },
    {
      title: "This Month",
      value: stats?.registrationsThisMonth || 0,
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+45",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {card.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600">{card.title}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Trends Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Last 7 Days Trend</h2>
            </div>
            {stats?.dailyTrends && Object.keys(stats.dailyTrends).length > 0 ? (
              <ChartContainer
                config={{
                  registrations: {
                    label: "Registrations",
                    color: "#3b82f6",
                  },
                }}
                className="h-[280px] w-full"
              >
                <LineChart
                  data={Object.entries(stats.dailyTrends).map(([date, count]) => ({
                    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    registrations: count,
                  }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200" />}
                    cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No data available yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Class Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <School className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">By Class</h2>
            </div>
            {stats?.byClass && Object.keys(stats.byClass).length > 0 ? (
              <ChartContainer
                config={{
                  value: {
                    label: "Registrations",
                    color: "#10b981",
                  },
                }}
                className="h-[280px] w-full"
              >
                <BarChart
                  data={Object.entries(stats.byClass)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([name, value]) => ({
                      name: name.length > 10 ? name.substring(0, 10) + "..." : name,
                      value,
                      fullName: name,
                    }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200" />}
                  />
                  <Bar
                    dataKey="value"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <School className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No data available yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Top Schools */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <School className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Top Schools</h2>
            </div>
            <div className="space-y-3">
              {stats?.topSchools && Object.entries(stats.topSchools).length > 0 ? (
                Object.entries(stats.topSchools)
                  .slice(0, 5)
                  .map(([school, count]) => (
                    <div key={school}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 truncate flex-1">
                          {school}
                        </span>
                        <span className="text-sm font-bold text-gray-900 ml-2">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${(count / (stats.totalRegistrations || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center py-8">No data available</p>
              )}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Age Distribution</h2>
            </div>
            {stats?.byAge && Object.keys(stats.byAge).length > 0 ? (
              <ChartContainer
                config={{
                  count: {
                    label: "Students",
                    color: "#f59e0b",
                  },
                }}
                className="h-[280px] w-full"
              >
                <BarChart
                  data={Object.entries(stats.byAge)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([age, count]) => ({
                      age,
                      count,
                    }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="age"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200" />}
                  />
                  <Bar
                    dataKey="count"
                    fill="#f59e0b"
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No data available yet</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/admin/submissions")}
              className="group p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1">View All Submissions</h3>
                <p className="text-sm text-gray-600">See all student registrations</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </button>
            <button
              onClick={handleExport}
              className="group p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
                <p className="text-sm text-gray-600">Download as CSV</p>
              </div>
              <Download className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:scale-110 transition-all" />
            </button>
            <button
              onClick={() => navigate("/admin/analytics")}
              className="group p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
                <p className="text-sm text-gray-600">See detailed insights</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

