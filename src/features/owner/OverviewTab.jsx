import React, { useState } from "react";
import { IndianRupee, TrendingUp, Calendar, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend, positive }) => (
  <div className="bg-surface-primary rounded-2xl border border-border-primary p-6 shadow-2xl shadow-black/5">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-surface-secondary rounded-2xl border border-border-primary">
        <Icon size={24} className="text-text-primary" />
      </div>
      {trend && (
        <span
          className={`text-sm font-semibold flex items-center gap-1 px-3 py-1 rounded-full ${positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
        >
          {positive ? "+" : "-"}
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-black text-text-primary tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

const OverviewTab = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      desc: "John Doe requested AC Servicing for tomorrow.",
      color: "orange",
    },
    {
      id: 2,
      type: "profile",
      title: "Update Business Profile",
      desc: "Adding a cover image increases trust by 40%.",
      color: "zinc",
    },
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
          Dashboard Overview
        </h1>
        <p className="text-zinc-400">
          Here is what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        <StatCard
          title="Total Revenue"
          value="₹45,200"
          icon={IndianRupee}
          trend="12.5%"
          positive={true}
        />
        <StatCard
          title="Active Bookings"
          value="12"
          icon={Calendar}
          trend="2"
          positive={true}
        />
        <StatCard
          title="Total Services"
          value="156"
          icon={TrendingUp}
          trend="8"
          positive={true}
        />
        <StatCard
          title="Overall Rating"
          value="4.8"
          icon={Star}
          trend="0.2"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5 min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-text-primary mb-6">
            Revenue Trend (Last 7 Days)
          </h2>

          <div className="flex-grow flex items-end gap-2 pt-10 pb-4 px-2">
            {/* Simple CSS Bar Chart */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col justify-end items-center group"
              >
                <div
                  className="w-full max-w-[40px] bg-surface-secondary group-hover:bg-text-primary transition-colors duration-500 rounded-t-lg relative"
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-dark text-text-inverted text-xs font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10">
                    ₹{(height * 120).toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-zinc-500 mt-3 font-medium">
                  Day {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Alerts */}
        <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
          <h2 className="text-xl font-bold tracking-tight text-text-primary mb-6">
            Needs Attention
          </h2>

          <div className="space-y-4">
            <AnimatePresence>
              {alerts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-zinc-500 text-sm font-medium"
                >
                  You're all caught up!
                </motion.div>
              )}
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginBottom: 0,
                    overflow: "hidden",
                  }}
                  className={`p-4 rounded-2xl border relative ${
                    alert.color === "orange"
                      ? "bg-orange-500/5 border-orange-500/20"
                      : "bg-surface-secondary border-border-primary"
                  }`}
                >
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-text-primary"
                  >
                    <X size={16} />
                  </button>
                  <h4
                    className={`font-bold mb-1 ${
                      alert.color === "orange"
                        ? "text-orange-500"
                        : "text-text-primary"
                    }`}
                  >
                    {alert.title}
                  </h4>
                  <p className="text-sm text-zinc-400 mb-3">{alert.desc}</p>

                  {alert.type === "booking" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-4 py-2 bg-surface-dark text-text-inverted font-bold text-sm rounded-xl hover:scale-[0.98] transition-transform shadow-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-4 py-2 bg-surface-secondary text-text-primary font-bold text-sm rounded-xl hover:bg-surface-dark hover:text-text-inverted transition-colors border border-border-primary"
                      >
                        Review
                      </button>
                    </div>
                  )}
                  {alert.type === "profile" && (
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-sm font-bold text-text-primary underline underline-offset-4"
                    >
                      Go to Portfolio
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;

