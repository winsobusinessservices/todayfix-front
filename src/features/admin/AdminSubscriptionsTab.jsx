import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { Crown, Zap, ShieldCheck, Plus, Edit2, XCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_SUBSCRIPTIONS = [
  { id: "SUB-8092", entity: "Sparkle Clean", type: "Provider", plan: "Pro Plan", status: "Active", startDate: "Jul 15, 2026", renewalDate: "Aug 15, 2026", revenue: "₹499/mo" },
  { id: "SUB-8091", entity: "Elite Packers", type: "Business", plan: "Enterprise", status: "Active", startDate: "Jun 10, 2026", renewalDate: "Jun 10, 2027", revenue: "₹4,999/yr" },
  { id: "SUB-8090", entity: "AC Experts", type: "Provider", plan: "Standard", status: "Cancelled", startDate: "May 01, 2026", renewalDate: "-", revenue: "₹299/mo" },
  { id: "SUB-8089", entity: "Rahul Plumbers", type: "Business", plan: "Pro Plan", status: "Active", startDate: "Aug 01, 2026", renewalDate: "Sep 01, 2026", revenue: "₹999/mo" },
];

const AdminSubscriptionsTab = () => {
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  
  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [entity, setEntity] = useState("");
  const [type, setType] = useState("Provider");
  const [plan, setPlan] = useState("Pro Plan");
  const [revenue, setRevenue] = useState("₹499/mo");

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [editEntity, setEditEntity] = useState("");
  const [editType, setEditType] = useState("Provider");
  const [editPlan, setEditPlan] = useState("Pro Plan");
  const [editRevenue, setEditRevenue] = useState("");

  const columns = [
    { 
      header: "Subscriber", 
      accessor: "entity",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary">{row.entity}</p>
          <p className="text-xs text-text-secondary">{row.type}</p>
        </div>
      )
    },
    { 
      header: "Plan", 
      accessor: "plan",
      render: (row) => (
        <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
          {row.plan}
        </span>
      )
    },
    { 
      header: "Timeline", 
      accessor: "startDate",
      render: (row) => (
        <div>
          <p className="text-xs text-text-primary">Started: {row.startDate}</p>
          <p className="text-[10px] text-zinc-400">Renews: {row.renewalDate}</p>
        </div>
      )
    },
    { header: "Revenue", accessor: "revenue", render: (row) => <span className="font-black text-text-primary">{row.revenue}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!entity.trim()) return;
    const newSub = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      entity,
      type,
      plan,
      status: "Active",
      startDate: "Aug 12, 2026",
      renewalDate: "Sep 12, 2026",
      revenue,
    };
    setSubscriptions([newSub, ...subscriptions]);
    setIsCreateModalOpen(false);
    setEntity("");
    setType("Provider");
    setPlan("Pro Plan");
    setRevenue("₹499/mo");
    toast.success(`Subscription plan for ${newSub.entity} created!`);
  };

  const handleSaveEditPlan = (e) => {
    e.preventDefault();
    if (!editingSub) return;
    setSubscriptions(
      subscriptions.map((s) =>
        s.id === editingSub.id
          ? { ...s, entity: editEntity, type: editType, plan: editPlan, revenue: editRevenue }
          : s
      )
    );
    setIsEditModalOpen(false);
    setEditingSub(null);
    toast.success(`Subscription plan for ${editEntity} updated!`);
  };

  const handleToggleCancelPlan = (row) => {
    const isCancelling = row.status === "Active";
    setSubscriptions(
      subscriptions.map((s) =>
        s.id === row.id
          ? {
              ...s,
              status: isCancelling ? "Cancelled" : "Active",
              renewalDate: isCancelling ? "-" : "Sep 12, 2026",
            }
          : s
      )
    );
    toast.success(`Plan for ${row.entity} ${isCancelling ? "cancelled" : "reactivated"} successfully!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">SaaS Subscriptions</h2>
          <p className="text-text-secondary font-medium mt-1">Manage recurring revenue from premium providers and businesses.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Crown className="w-4 h-4" /> Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-6 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck className="w-16 h-16" /></div>
           <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">Standard</p>
           <p className="text-3xl font-black mt-2 text-text-primary">1,245</p>
           <p className="text-xs font-medium text-emerald-600 mt-2">Active Subscribers</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-md relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 p-4 opacity-20"><Zap className="w-16 h-16" /></div>
           <p className="text-sm font-bold text-white/80 uppercase tracking-widest">Pro Plan</p>
           <p className="text-3xl font-black mt-2 text-white">482</p>
           <p className="text-xs font-medium text-purple-200 mt-2">₹2.4L Monthly Recurring Revenue</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-md relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 p-4 opacity-10"><Crown className="w-16 h-16" /></div>
           <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Enterprise</p>
           <p className="text-3xl font-black mt-2 text-white">45</p>
           <p className="text-xs font-medium text-emerald-400 mt-2">₹4.5L Annual Recurring Revenue</p>
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={subscriptions}
        searchPlaceholder="Search subscribers..."
        rowActions={(row) => [
          {
            label: "Edit Plan",
            icon: Edit2,
            onClick: (r) => {
              setEditingSub(r);
              setEditEntity(r.entity);
              setEditType(r.type);
              setEditPlan(r.plan);
              setEditRevenue(r.revenue);
              setIsEditModalOpen(true);
            },
          },
          {
            label: row.status === "Cancelled" ? "Reactivate Plan" : "Cancel Plan",
            icon: row.status === "Cancelled" ? RefreshCw : XCircle,
            destructive: row.status !== "Cancelled",
            onClick: (r) => handleToggleCancelPlan(r),
          },
        ]}
      />

      {/* Create Plan Modal */}
      <AdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Subscription Plan"
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePlan}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Plan
            </button>
          </>
        }
      >
        <form onSubmit={handleCreatePlan} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subscriber / Entity Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Cleaners"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subscriber Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Provider">Provider</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Plan Tier</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Standard">Standard</option>
              <option value="Pro Plan">Pro Plan</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Pricing / Revenue</label>
            <input
              type="text"
              required
              placeholder="e.g. ₹499/mo or ₹4,999/yr"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
        </form>
      </AdminModal>

      {/* Edit Plan Modal */}
      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Subscription Plan"
        footer={
          <>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEditPlan}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 cursor-pointer"
            >
              Save Changes
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveEditPlan} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subscriber / Entity Name</label>
            <input
              type="text"
              required
              value={editEntity}
              onChange={(e) => setEditEntity(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subscriber Type</label>
            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Provider">Provider</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Plan Tier</label>
            <select
              value={editPlan}
              onChange={(e) => setEditPlan(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Standard">Standard</option>
              <option value="Pro Plan">Pro Plan</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Pricing / Revenue</label>
            <input
              type="text"
              required
              value={editRevenue}
              onChange={(e) => setEditRevenue(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminSubscriptionsTab;

