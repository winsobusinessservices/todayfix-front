import React from "react";
import { DataTable } from "../../components/ui/AdminShared";
import { Download } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_LOGS = [
  { id: "LOG-01", admin: "Alex Admin", action: "Deleted User Account", target: "User: john_doe", date: "Aug 11, 2026, 15:45", ip: "192.168.1.5" },
  { id: "LOG-02", admin: "System", action: "Automated Payout Processed", target: "Provider: AC Experts", date: "Aug 11, 2026, 14:00", ip: "Internal" },
  { id: "LOG-03", admin: "Sarah Manager", action: "Updated Platform Fee", target: "Settings: General", date: "Aug 10, 2026, 09:30", ip: "10.0.0.45" },
];

const AdminAuditLogTab = () => {
  const columns = [
    { 
      header: "Admin / System", 
      accessor: "admin", 
      render: (row) => <span className="font-bold">{row.admin}</span> 
    },
    { 
      header: "Action Performed", 
      accessor: "action",
      render: (row) => <span className="font-medium text-text-primary">{row.action}</span>
    },
    { header: "Target", accessor: "target" },
    { header: "Date & Time", accessor: "date" },
    { header: "IP Address", accessor: "ip", render: (row) => <span className="font-mono text-xs text-zinc-500 bg-surface-secondary px-2 py-1 rounded">{row.ip}</span> },
  ];

  const handleExportLogs = () => {
    toast.success("Audit logs exported successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Audit Logs</h2>
          <p className="text-text-secondary font-medium mt-1">Track all administrative and critical system actions.</p>
        </div>
        <button 
          onClick={handleExportLogs}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary border border-border-primary text-text-primary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Logs
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_LOGS} 
        searchPlaceholder="Search logs by action or admin..." 
        onExport={handleExportLogs}
      />
    </div>
  );
};

export default AdminAuditLogTab;

