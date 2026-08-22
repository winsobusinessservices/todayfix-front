import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import toast from "react-hot-toast";
import { Star, Plus, FileText, MessageSquare } from "lucide-react";

const MOCK_DATA = [
  { id: "P-001", provider: "Rajesh Electric Services", type: "Electrician", services: "Wiring, Repairs", location: "Indiranagar, Bengaluru", rating: 4.8, completedJobs: 156, earnings: "₹1,85,000", status: "Verified", joined: "2023-01-15" },
  { id: "P-002", provider: "Sita Plumbing Solutions", type: "Plumber", services: "Leakage, Installation", location: "Koramangala, Bengaluru", rating: 4.5, completedJobs: 98, earnings: "₹92,500", status: "Pending", joined: "2024-03-10" },
  { id: "P-003", provider: "Quick Fix Appliances", type: "Technician", services: "AC, Fridge, Washing Machine", location: "Whitefield, Bengaluru", rating: 4.9, completedJobs: 210, earnings: "₹3,10,000", status: "Verified", joined: "2022-11-05" },
  { id: "P-004", provider: "Urban Carpentry Co.", type: "Carpenter", services: "Furniture, Repairs", location: "HSR Layout, Bengaluru", rating: 4.2, completedJobs: 45, earnings: "₹45,000", status: "Suspended", joined: "2024-05-20" },
  { id: "P-005", provider: "Green Clean Home", type: "Cleaner", services: "Deep Cleaning, Pest Control", location: "Jayanagar, Bengaluru", rating: 4.7, completedJobs: 320, earnings: "₹2,75,000", status: "Verified", joined: "2022-08-12" },
];

export default function AdminProvidersTab() {
  const [providers, setProviders] = useState(MOCK_DATA);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProvider, setNewProvider] = useState({ provider: "", type: "", services: "", location: "", status: "Pending" });
  const [docsModalProvider, setDocsModalProvider] = useState(null);
  const [messageModalProvider, setMessageModalProvider] = useState(null);
  const [messageText, setMessageText] = useState("");

  const columns = [
    { 
      header: "Provider", 
      accessor: "provider",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary">{row.provider}</p>
          <p className="text-xs text-text-secondary">{row.type}</p>
        </div>
      )
    },
    { header: "Services", accessor: "services" },
    { header: "Location", accessor: "location" },
    { 
      header: "Rating", 
      accessor: "rating",
      render: (row) => (
        <span className="flex items-center gap-1 font-bold text-text-primary">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          {row.rating}
        </span>
      )
    },
    { header: "Jobs", accessor: "completedJobs" },
    { header: "Earnings", accessor: "earnings", render: (row) => <span className="font-black text-emerald-600">{row.earnings}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
    { header: "Joined", accessor: "joined" },
  ];

  const filteredProviders = providers.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending") return p.status === "Pending";
    if (activeFilter === "Verified") return p.status === "Verified";
    return true;
  });

  const handleAddProvider = (e) => {
    e?.preventDefault();
    if (!newProvider.provider.trim()) {
      toast.error("Please enter provider name");
      return;
    }

    const createdProvider = {
      id: `P-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      provider: newProvider.provider.trim(),
      type: newProvider.type.trim() || "Service Provider",
      services: newProvider.services.trim() || "General Services",
      location: newProvider.location.trim() || "Bengaluru",
      rating: 5.0,
      completedJobs: 0,
      earnings: "₹0",
      status: newProvider.status || "Pending",
      joined: new Date().toISOString().split("T")[0],
    };

    setProviders([createdProvider, ...providers]);
    setNewProvider({ provider: "", type: "", services: "", location: "", status: "Pending" });
    setIsAddModalOpen(false);
    toast.success(`Provider "${createdProvider.provider}" added successfully!`);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    toast.success(`Message sent to ${messageModalProvider.provider}`);
    setMessageModalProvider(null);
    setMessageText("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Providers Management</h2>
          <p className="text-text-secondary font-medium mt-1">Manage service providers and verification status.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      </div>

      <div className="flex gap-4 border-b border-border-primary pb-2">
        {["All", "Pending", "Verified"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${activeFilter === tab ? 'text-text-primary border-black' : 'text-zinc-400 border-transparent hover:text-text-primary hover:border-black'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTable 
        columns={columns} 
        data={filteredProviders} 
        onRowClick={(row) => {
          setSelectedProvider(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedProvider(row);
          setIsModalOpen(true);
        }}
      />

      {selectedProvider && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Provider Details"
          footer={
            <select
              onChange={(e) => {
                const action = e.target.value;
                e.target.value = ""; // Reset dropdown
                if (action === "docs") {
                  setIsModalOpen(false);
                  setDocsModalProvider(selectedProvider);
                } else if (action === "message") {
                  setIsModalOpen(false);
                  setMessageModalProvider(selectedProvider);
                  setMessageText("");
                } else if (action === "verify") {
                  setProviders((prev) =>
                    prev.map((p) => (p.id === selectedProvider.id ? { ...p, status: "Verified" } : p))
                  );
                  setSelectedProvider((prev) => (prev ? { ...prev, status: "Verified" } : prev));
                  toast.success(`${selectedProvider.provider} has been Verified.`);
                  setIsModalOpen(false);
                } else if (action === "suspend") {
                  setProviders((prev) =>
                    prev.map((p) => (p.id === selectedProvider.id ? { ...p, status: "Suspended" } : p))
                  );
                  setSelectedProvider((prev) => (prev ? { ...prev, status: "Suspended" } : prev));
                  toast.error(`${selectedProvider.provider} has been Suspended.`);
                  setIsModalOpen(false);
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select Action...</option>
              <option value="docs">View Identity Docs</option>
              <option value="message">Message Provider</option>
              {selectedProvider.status !== "Verified" && (
                <option value="verify">Verify Account</option>
              )}
              {selectedProvider.status !== "Suspended" && (
                <option value="suspend">Suspend Account</option>
              )}
            </select>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedProvider.provider}</h4>
                <p className="text-xs text-text-secondary">{selectedProvider.type}</p>
              </div>
              <StatusBadge status={selectedProvider.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Provider ID</p>
                <p className="font-semibold">{selectedProvider.id}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Services</p>
                <p className="font-semibold">{selectedProvider.services}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Location</p>
                <p className="font-semibold">{selectedProvider.location}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Rating</p>
                <p className="font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {selectedProvider.rating}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Completed Jobs</p>
                <p className="font-semibold">{selectedProvider.completedJobs}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Earnings</p>
                <p className="font-semibold text-emerald-600">{selectedProvider.earnings}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Joined Date</p>
                <p className="font-semibold">{selectedProvider.joined}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Add Provider Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Provider"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddProvider}
              className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer"
            >
              Add Provider
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddProvider}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Provider / Business Name</label>
            <input 
              type="text" 
              placeholder="e.g. Apex Electrical Services"
              value={newProvider.provider}
              onChange={(e) => setNewProvider({...newProvider, provider: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Provider Type / Profession</label>
            <input 
              type="text" 
              placeholder="e.g. Electrician, Plumber, Technician"
              value={newProvider.type}
              onChange={(e) => setNewProvider({...newProvider, type: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Services Offered</label>
            <input 
              type="text" 
              placeholder="e.g. Wiring, Appliance Repairs"
              value={newProvider.services}
              onChange={(e) => setNewProvider({...newProvider, services: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Location / Area</label>
            <input 
              type="text" 
              placeholder="e.g. Indiranagar, Bengaluru"
              value={newProvider.location}
              onChange={(e) => setNewProvider({...newProvider, location: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Status</label>
            <select 
              value={newProvider.status}
              onChange={(e) => setNewProvider({...newProvider, status: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </form>
      </AdminModal>

      {/* Identity Docs Modal */}
      {docsModalProvider && (
        <AdminModal
          isOpen={Boolean(docsModalProvider)}
          onClose={() => setDocsModalProvider(null)}
          title={`Identity Documents - ${docsModalProvider.provider}`}
          footer={
            <button
              onClick={() => setDocsModalProvider(null)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="p-4 bg-surface-secondary rounded-xl border border-border-primary space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-zinc-500">Government ID (Aadhaar / PAN)</span>
                <StatusBadge status={docsModalProvider.status} />
              </div>
              <p className="font-medium text-sm">ID Number: GOVT-{docsModalProvider.id}-8921</p>
              <div className="h-28 bg-zinc-200 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-500 gap-2">
                <FileText className="w-5 h-5 text-zinc-400" />
                Aadhaar_Card_Front_Back.pdf
              </div>
            </div>
            <div className="p-4 bg-surface-secondary rounded-xl border border-border-primary space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-zinc-500">Trade License / Certification</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200">Uploaded</span>
              </div>
              <p className="font-medium text-sm">License No: TRD-{docsModalProvider.id}-2024</p>
              <div className="h-28 bg-zinc-200 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-500 gap-2">
                <FileText className="w-5 h-5 text-zinc-400" />
                Professional_Skill_Certificate.pdf
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Message Provider Modal */}
      {messageModalProvider && (
        <AdminModal
          isOpen={Boolean(messageModalProvider)}
          onClose={() => setMessageModalProvider(null)}
          title={`Message Provider - ${messageModalProvider.provider}`}
          footer={
            <>
              <button 
                onClick={() => setMessageModalProvider(null)}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer"
              >
                Send Message
              </button>
            </>
          }
        >
          <form className="space-y-4" onSubmit={handleSendMessage}>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Recipient</label>
              <p className="text-sm font-bold text-text-primary px-4 py-2.5 bg-surface-secondary rounded-xl border border-border-primary">
                {messageModalProvider.provider} ({messageModalProvider.type})
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Message</label>
              <textarea 
                rows={4}
                placeholder="Write message to provider..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
