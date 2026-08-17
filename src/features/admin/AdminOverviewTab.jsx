import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Users,
  Briefcase,
  Store,
  ClipboardList,
  TrendingUp,
  CheckCircle,
  IndianRupee,
  Banknote,
  ShieldAlert,
  Activity,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const REVENUE_DATA_MAP = {
  Daily: [
    { name: "Mon", revenue: 45000, requests: 120 },
    { name: "Tue", revenue: 52000, requests: 132 },
    { name: "Wed", revenue: 48000, requests: 101 },
    { name: "Thu", revenue: 61000, requests: 145 },
    { name: "Fri", revenue: 59000, requests: 130 },
    { name: "Sat", revenue: 85000, requests: 210 },
    { name: "Sun", revenue: 92000, requests: 240 },
  ],
  Weekly: [
    { name: "Week 1", revenue: 320000, requests: 850 },
    { name: "Week 2", revenue: 380000, requests: 940 },
    { name: "Week 3", revenue: 410000, requests: 1020 },
    { name: "Week 4", revenue: 490000, requests: 1180 },
  ],
  Monthly: [
    { name: "Jan", revenue: 1250000, requests: 3100 },
    { name: "Feb", revenue: 1420000, requests: 3450 },
    { name: "Mar", revenue: 1380000, requests: 3200 },
    { name: "Apr", revenue: 1610000, requests: 3900 },
    { name: "May", revenue: 1590000, requests: 3850 },
    { name: "Jun", revenue: 1850000, requests: 4500 },
  ],
};

const REQUEST_STATUS_DATA = [
  { name: "Created", value: 400 },
  { name: "Broadcasting", value: 300 },
  { name: "Accepted", value: 300 },
  { name: "In Progress", value: 200 },
  { name: "Completed", value: 278 },
];

const STATS_BY_RANGE = {
  "24h": [
    { label: "Total Users", value: "24,592", trend: "+0.4%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Users", value: "2,142", trend: "+3.1%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Providers", value: "3,105", trend: "+0.8%", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Verified Providers", value: "2,840", trend: "+0.2%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Verifications", value: "18", trend: "-12.5%", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Businesses", value: "482", trend: "+0.6%", icon: Store, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Active Requests", value: "342", trend: "+15.2%", icon: ClipboardList, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Completed Services", value: "1,231", trend: "+8.4%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Revenue", value: "₹4.8L", trend: "+18.9%", icon: IndianRupee, color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Pending Payouts", value: "₹85K", trend: "-5.0%", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" },
  ],
  "7d": [
    { label: "Total Users", value: "24,592", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Users", value: "8,142", trend: "+5%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Providers", value: "3,105", trend: "+18%", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Verified Providers", value: "2,840", trend: "+2%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Verifications", value: "142", trend: "-5%", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Businesses", value: "482", trend: "+8%", icon: Store, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Active Requests", value: "1,204", trend: "+24%", icon: ClipboardList, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Completed Services", value: "45,231", trend: "+14%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Revenue", value: "₹1.4Cr", trend: "+32%", icon: IndianRupee, color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Pending Payouts", value: "₹4.2L", trend: "-2%", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" },
  ],
  "30d": [
    { label: "Total Users", value: "24,592", trend: "+28%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Users", value: "14,890", trend: "+15%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Providers", value: "3,105", trend: "+22%", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Verified Providers", value: "2,840", trend: "+8%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Verifications", value: "412", trend: "+4%", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Businesses", value: "482", trend: "+14%", icon: Store, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Active Requests", value: "4,890", trend: "+31%", icon: ClipboardList, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Completed Services", value: "182,400", trend: "+22%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Revenue", value: "₹5.8Cr", trend: "+45%", icon: IndianRupee, color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Pending Payouts", value: "₹18.5L", trend: "+3%", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" },
  ],
  "1y": [
    { label: "Total Users", value: "24,592", trend: "+140%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Users", value: "21,450", trend: "+85%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Providers", value: "3,105", trend: "+95%", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Verified Providers", value: "2,840", trend: "+80%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Verifications", value: "1,840", trend: "+15%", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Businesses", value: "482", trend: "+60%", icon: Store, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Active Requests", value: "48,200", trend: "+110%", icon: ClipboardList, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Completed Services", value: "1,840,200", trend: "+98%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Revenue", value: "₹62.4Cr", trend: "+135%", icon: IndianRupee, color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Pending Payouts", value: "₹1.2Cr", trend: "+12%", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" },
  ],
};

const RECENT_ACTIVITY = [
  {
    id: 1,
    text: "New user 'Rahul Sharma' registered from Bengaluru.",
    time: "2 mins ago",
    type: "user",
  },
  {
    id: 2,
    text: "Provider 'Sparkle Clean' verified successfully.",
    time: "15 mins ago",
    type: "provider",
  },
  {
    id: 3,
    text: "Service request #REQ-8492 completed by 'AC Experts'.",
    time: "1 hour ago",
    type: "service",
  },
  {
    id: 4,
    text: "Payout of ₹12,450 processed for 'Urban Plumbers'.",
    time: "2 hours ago",
    type: "payment",
  },
  {
    id: 5,
    text: "Business 'Elite Packers & Movers' registered.",
    time: "4 hours ago",
    type: "business",
  },
];

const TOP_SERVICES = [
  {
    name: "Deep Home Cleaning",
    requests: 1245,
    revenue: "₹31.1L",
    rating: 4.8,
  },
  { name: "AC Servicing", requests: 980, revenue: "₹14.7L", rating: 4.6 },
  { name: "Plumbing Fixes", requests: 854, revenue: "₹6.8L", rating: 4.5 },
  { name: "Electrical Repair", requests: 720, revenue: "₹5.4L", rating: 4.4 },
];

const AdminOverviewTab = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartPeriod, setChartPeriod] = useState("Daily");
  const [isExporting, setIsExporting] = useState(false);

  const currentStats = STATS_BY_RANGE[timeRange] || STATS_BY_RANGE["7d"];

  const handleExportReport = () => {
    setIsExporting(true);
    toast.loading("Exporting overview report...", { id: "export-overview" });
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Overview report exported successfully!", { id: "export-overview" });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Here's what's happening across TodayFix today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-surface-primary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black cursor-pointer shadow-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isExporting ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>

      {/* KPI Grid (10 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentStats.map((stat, i) => (
          <div
            key={i}
            className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${stat.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
              >
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-text-primary tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">
              Revenue Overview
            </h3>
            <div className="flex items-center gap-1 p-1 bg-surface-secondary rounded-lg">
              {["Daily", "Weekly", "Monthly"].map((t) => (
                <button
                  key={t}
                  onClick={() => setChartPeriod(t)}
                  className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer ${t === chartPeriod ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA_MAP[chartPeriod] || REVENUE_DATA_MAP["Daily"]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e4e4e7"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#71717a" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#71717a" }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Requests Funnel/Bar */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Request Funnel
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REQUEST_STATUS_DATA}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e4e4e7"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#3f3f46", fontWeight: 600 }}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "#f4f4f5" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#10b981"
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">
              Top Performing Services
            </h3>
            <button
              onClick={() => toast("Viewing all top performing services")}
              className="text-sm font-bold text-purple-600 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-secondary text-[11px] uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 font-bold">Service</th>
                  <th className="pb-3 font-bold text-right">Requests</th>
                  <th className="pb-3 font-bold text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-secondary">
                {TOP_SERVICES.map((srv, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <p className="font-bold text-sm text-text-primary">
                        {srv.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-zinc-500 font-medium">
                          {srv.rating}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium text-sm text-text-secondary">
                      {srv.requests.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-black text-sm text-text-primary">
                      {srv.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">
              Recent Activity
            </h3>
            <button
              onClick={() => toast("Viewing full activity log")}
              className="text-sm font-bold text-purple-600 hover:underline cursor-pointer"
            >
              View Log
            </button>
          </div>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    activity.type === "user"
                      ? "bg-blue-500"
                      : activity.type === "provider"
                        ? "bg-purple-500"
                        : activity.type === "payment"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {activity.text}
                  </p>
                  <p className="text-xs text-zinc-400 font-medium mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewTab;

