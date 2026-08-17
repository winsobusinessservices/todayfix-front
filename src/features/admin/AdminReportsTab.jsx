import React, { useState } from "react";
import toast from "react-hot-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp } from "lucide-react";

const REVENUE_DATA = [
  { name: 'Jan', revenue: 450000 },
  { name: 'Feb', revenue: 520000 },
  { name: 'Mar', revenue: 480000 },
  { name: 'Apr', revenue: 610000 },
  { name: 'May', revenue: 590000 },
  { name: 'Jun', revenue: 850000 },
  { name: 'Jul', revenue: 920000 },
];

const USER_GROWTH = [
  { name: 'Jan', customers: 4000, providers: 240 },
  { name: 'Feb', customers: 4500, providers: 300 },
  { name: 'Mar', customers: 4200, providers: 320 },
  { name: 'Apr', customers: 5800, providers: 410 },
  { name: 'May', customers: 6100, providers: 450 },
  { name: 'Jun', customers: 7200, providers: 520 },
  { name: 'Jul', customers: 8500, providers: 680 },
];

const CATEGORY_DIST = [
  { name: 'Cleaning', value: 400 },
  { name: 'Plumbing', value: 300 },
  { name: 'AC Repair', value: 300 },
  { name: 'Electrical', value: 200 },
  { name: 'Painting', value: 100 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AdminReportsTab = () => {
  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const dateRanges = ["This Year", "This Quarter", "This Month", "Last 30 Days"];

  const handleDateRangeClick = () => {
    const nextIndex = (dateRangeIndex + 1) % dateRanges.length;
    setDateRangeIndex(nextIndex);
    toast.success(`Date range updated to ${dateRanges[nextIndex]}`);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    toast.loading("Generating PDF report...", { id: "export-pdf" });
    setTimeout(() => {
      setIsExporting(false);
      toast.success("PDF report exported successfully!", { id: "export-pdf" });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Reports & Analytics</h2>
          <p className="text-text-secondary font-medium mt-1">Deep dive into platform performance and growth metrics.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDateRangeClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary border border-border-primary text-text-primary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> {dateRanges[dateRangeIndex]}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Growth Chart */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">Revenue Growth</h3>
            <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% YTD
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Acquisition */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">User Acquisition</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_GROWTH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar yAxisId="left" dataKey="customers" name="Customers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="providers" name="Providers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">Service Category Distribution (Requests)</h3>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DIST}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DIST.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminReportsTab;
