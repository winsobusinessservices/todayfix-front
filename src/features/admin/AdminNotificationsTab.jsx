import React, { useState } from "react";
import { DataTable, AdminModal } from "../../components/ui/AdminShared";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_NOTIFS = [
  { id: "NOT-991", title: "System Maintenance", target: "All Users", type: "Email + Push", sent: "Aug 11, 2026", status: "Sent" },
  { id: "NOT-990", title: "New Pro Plan Pricing", target: "Providers", type: "In-App", sent: "Aug 10, 2026", status: "Sent" },
  { id: "NOT-989", title: "Diwali Cleaning Offer", target: "Customers (Delhi)", type: "Push", sent: "-", status: "Draft" },
];

const AdminNotificationsTab = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("All Users");
  const [type, setType] = useState("Email + Push");
  const [message, setMessage] = useState("");

  const handleSelectNotif = (row) => {
    setSelectedNotif(row);
    setIsDetailsModalOpen(true);
  };

  const columns = [
    { header: "Notification", accessor: "title", render: (row) => <span className="font-bold">{row.title}</span> },
    { header: "Target Audience", accessor: "target" },
    { header: "Channel", accessor: "type" },
    { header: "Sent Date", accessor: "sent" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-md font-bold ${row.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'}`}>
          {row.status}
        </span>
      )
    },
  ];

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newNotif = {
      id: `NOT-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      target: target || "All Users",
      type: type || "Email + Push",
      sent: "Aug 12, 2026",
      status: "Sent",
      message: message || undefined,
    };
    setNotifications([newNotif, ...notifications]);
    setIsModalOpen(false);
    setTitle("");
    setTarget("All Users");
    setType("Email + Push");
    setMessage("");
    toast.success("Notification campaign created and sent!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">System Notifications</h2>
          <p className="text-text-secondary font-medium mt-1">Send broadcast messages and push notifications to users.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={notifications} 
        searchPlaceholder="Search campaigns..." 
        onRowClick={handleSelectNotif}
        onActionClick={handleSelectNotif}
      />

      {selectedNotif && (
        <AdminModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Notification Details"
          footer={
            <div className="flex gap-2 justify-end w-full">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 bg-surface-secondary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedNotif.status === "Draft" && (
                <button
                  onClick={() => {
                    setTitle(selectedNotif.title || "");
                    setTarget(selectedNotif.target || "All Users");
                    setType(selectedNotif.type || "Email + Push");
                    setMessage(selectedNotif.message || "");
                    setNotifications(notifications.filter((n) => n.id !== selectedNotif.id));
                    setIsDetailsModalOpen(false);
                    setIsModalOpen(true);
                    toast.success("Draft loaded for editing.");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  Edit Draft
                </button>
              )}
              <button
                onClick={() => {
                  setNotifications(notifications.filter((n) => n.id !== selectedNotif.id));
                  setIsDetailsModalOpen(false);
                  toast.success("Notification deleted.");
                }}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedNotif.title}</h4>
                <p className="text-xs text-text-secondary">{selectedNotif.id}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-md font-bold ${selectedNotif.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'}`}>
                {selectedNotif.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Target Audience</p>
                <p className="font-semibold">{selectedNotif.target}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Channel</p>
                <p className="font-semibold">{selectedNotif.type}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Sent Date</p>
                <p className="font-semibold">{selectedNotif.sent}</p>
              </div>
            </div>
            {selectedNotif.message && (
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Message</p>
                <p className="text-sm font-medium mt-1">{selectedNotif.message}</p>
              </div>
            )}
          </div>
        </AdminModal>
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Notification Campaign"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCampaign}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Campaign
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Campaign Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Discount Offer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Target Audience</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="All Users">All Users</option>
              <option value="Providers">Providers Only</option>
              <option value="Customers">Customers Only</option>
              <option value="Businesses">Businesses Only</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Channel</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Email + Push">Email + Push Notification</option>
              <option value="Push">Push Notification Only</option>
              <option value="In-App">In-App Banner Only</option>
              <option value="SMS">SMS Message</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message Content</label>
            <textarea
              rows={3}
              placeholder="Enter message details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-medium text-text-primary focus:outline-none focus:border-black resize-none"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminNotificationsTab;

