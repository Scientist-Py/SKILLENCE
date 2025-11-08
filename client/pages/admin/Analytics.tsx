import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { BarChart3, TrendingUp, Users, Calendar, Clock } from "lucide-react";
import { safeJsonParse } from "@/lib/api-utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface AnalyticsData {
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

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const result = await safeJsonParse(response);
      if (result.ok) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Prepare chart data
  const dailyTrendsData = Object.entries(data?.dailyTrends || {}).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    registrations: count,
  }));

  const classDistributionData = Object.entries(data?.byClass || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const schoolDistributionData = Object.entries(data?.topSchools || {}).map(([name, value]) => ({
    name: name.length > 15 ? name.substring(0, 15) + "..." : name,
    value,
    fullName: name,
  }));

  const hourlyData = Object.entries(data?.byHour || {})
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([hour, count]) => ({
      hour: `${hour}:00`,
      registrations: count,
    }));

  const ageDistributionData = Object.entries(data?.byAge || {})
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([age, count]) => ({
      age,
      count,
    }));

  const chartConfig = {
    registrations: {
      label: "Registrations",
      color: "#3b82f6",
    },
    value: {
      label: "Count",
      color: "#10b981",
    },
    count: {
      label: "Students",
      color: "#f59e0b",
    },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights and statistics</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-gray-900">{data?.totalRegistrations || 0}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Today</div>
            <div className="text-2xl font-bold text-gray-900">{data?.registrationsToday || 0}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">This Week</div>
            <div className="text-2xl font-bold text-gray-900">{data?.registrationsThisWeek || 0}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">This Month</div>
            <div className="text-2xl font-bold text-gray-900">{data?.registrationsThisMonth || 0}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Trends (Last 7 Days) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Registration Trends (Last 7 Days)</h2>
            </div>
            {dailyTrendsData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <LineChart
                  data={dailyTrendsData}
                  margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
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
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>

          {/* Class Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Class Distribution</h2>
            </div>
            {classDistributionData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <BarChart
                  data={classDistributionData.sort((a, b) => b.value - a.value)}
                  margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
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
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>

          {/* Top Schools */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Top Schools</h2>
            </div>
            {schoolDistributionData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <BarChart
                  data={schoolDistributionData}
                  layout="vertical"
                  margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    type="number"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={120}
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
                  />
                  <Bar
                    dataKey="value"
                    fill="#8b5cf6"
                    radius={[0, 8, 8, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>

          {/* Hourly Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Peak Registration Hours</h2>
            </div>
            {hourlyData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <BarChart
                  data={hourlyData}
                  margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="hour"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
                  />
                  <Bar
                    dataKey="registrations"
                    fill="#f59e0b"
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Age Distribution</h2>
            </div>
            {ageDistributionData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <BarChart
                  data={ageDistributionData}
                  margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis
                    dataKey="age"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
                  />
                  <Bar
                    dataKey="count"
                    fill="#ef4444"
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>

          {/* Class Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Class Distribution (Pie)</h2>
            </div>
            {classDistributionData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <PieChart>
                  <Pie
                    data={classDistributionData.sort((a, b) => b.value - a.value)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {classDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent className="bg-white shadow-lg border border-gray-200 rounded-lg" />}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                  />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No data available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Data will appear here once submissions are received</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
