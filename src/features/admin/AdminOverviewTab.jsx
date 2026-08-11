import React from "react";
import { Users, Briefcase, Activity, ShieldAlert } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "2,405", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Providers", value: "312", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Active Requests", value: "48", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Pending Verifications", value: "14", icon: ShieldAlert, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const AdminOverviewTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Platform Overview</h2>
        <p className="text-text-secondary font-medium mt-1">High-level metrics for TodayFix.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-surface-primary border border-border-primary rounded-[1.5rem] p-6 shadow-sm flex flex-col gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-3xl font-black text-text-primary">{stat.value}</p>
              <p className="text-sm font-bold text-text-secondary uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-primary border border-border-primary rounded-[1.5rem] p-6 shadow-sm">
           <h3 className="text-lg font-bold text-text-primary mb-4">Recent Activity</h3>
           <div className="space-y-4">
              {[
                "User 'Jane Doe' requested Deep Cleaning.",
                "Vendor 'Sparkle Clean' completed a job.",
                "New Vendor 'AC Experts' submitted documents.",
                "User 'John Smith' reported an issue.",
                "Vendor 'FixIt All' updated their portfolio."
              ].map((activity, i) => (
                <div key={i} className="flex gap-3 items-center border-b border-border-secondary pb-3 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm font-medium text-text-secondary">{activity}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewTab;
