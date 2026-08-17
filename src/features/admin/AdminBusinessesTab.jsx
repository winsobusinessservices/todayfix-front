import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import toast from "react-hot-toast";
import { Plus, FileText } from "lucide-react";

const MOCK_DATA = [
  {
    id: "B001",
    business: "Urban Glow Spa",
    owner: "Priya Sharma",
    category: "Wellness",
    services: "Massage, Facial",
    location: "Indiranagar, Bengaluru",
    rating: 4.8,
    verification: "Verified",
    status: "Active",
    joined: "2023-05-12",
  },
  {
    id: "B002",
    business: "TechFix Solutions",
    owner: "Amit Patel",
    category: "Electronics",
    services: "Laptop Repair, Mobile Repair",
    location: "Koramangala, Bengaluru",
    rating: 4.5,
    verification: "Pending",
    status: "Review",
    joined: "2024-01-20",
  },
  {
    id: "B003",
    business: "Fresh Bites Kitchen",
    owner: "Rohan Gupta",
    category: "Catering",
    services: "Meal Prep, Corporate Events",
    location: "HSR Layout, Bengaluru",
    rating: 4.9,
    verification: "Verified",
    status: "Active",
    joined: "2023-11-05",
  },
  {
    id: "B004",
    business: "Green Leaf Nursery",
    owner: "Anjali Rao",
    category: "Gardening",
    services: "Plant Sales, Landscaping",
    location: "Whitefield, Bengaluru",
    rating: 4.7,
    verification: "Verified",
    status: "Active",
    joined: "2024-03-15",
  },
  {
    id: "B005",
    business: "Quick Stitch Tailors",
    owner: "Vikram Singh",
    category: "Apparel",
    services: "Alterations, Custom Stitching",
    location: "Jayanagar, Bengaluru",
    rating: 4.2,
    verification: "None",
    status: "Suspended",
    joined: "2023-08-30",
  },
];

const columns = [
  { header: "Business", accessor: "business" },
  { header: "Owner", accessor: "owner" },
  { header: "Category", accessor: "category" },
  { header: "Services", accessor: "services" },
  { header: "Location", accessor: "location" },
  { header: "Rating", accessor: "rating" },
  {
    header: "Verification",
    accessor: "verification",
    render: (row) => (
      <StatusBadge
        status={
          row.verification === "Verified"
            ? "success"
            : row.verification === "Pending"
              ? "warning"
              : "default"
        }
      >
        {row.verification}
      </StatusBadge>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <StatusBadge
        status={
          row.status === "Active"
            ? "success"
            : row.status === "Suspended"
              ? "error"
              : "warning"
        }
      >
        {row.status}
      </StatusBadge>
    ),
  },
  { header: "Joined", accessor: "joined" },
];

export default function AdminBusinessesTab() {
  const [data, setData] = useState(MOCK_DATA);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [gstModalBusiness, setGstModalBusiness] = useState(null);
  const [contactModalBusiness, setContactModalBusiness] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [newBusiness, setNewBusiness] = useState({
    business: "",
    owner: "",
    category: "",
    services: "",
    location: "",
    verification: "Pending",
    status: "Review",
  });

  const handleAddBusiness = (e) => {
    e?.preventDefault();
    if (!newBusiness.business.trim()) {
      toast.error("Please enter business name");
      return;
    }

    const createdBusiness = {
      id: `B${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      business: newBusiness.business.trim(),
      owner: newBusiness.owner.trim() || "N/A",
      category: newBusiness.category.trim() || "General",
      services: newBusiness.services.trim() || "Services",
      location: newBusiness.location.trim() || "Bengaluru",
      rating: 5.0,
      verification: newBusiness.verification || "Pending",
      status: newBusiness.status || "Review",
      joined: new Date().toISOString().split("T")[0],
    };

    setData([createdBusiness, ...data]);
    setNewBusiness({
      business: "",
      owner: "",
      category: "",
      services: "",
      location: "",
      verification: "Pending",
      status: "Review",
    });
    setIsAddModalOpen(false);
    toast.success(`Business "${createdBusiness.business}" added successfully!`);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    toast.success(`Message sent to ${contactModalBusiness.owner}`);
    setContactModalBusiness(null);
    setMessageText("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Businesses Management</h2>
          <p className="text-text-secondary font-medium mt-1">Manage registered agencies and companies.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Business
        </button>
      </div>
      <DataTable 
        columns={columns} 
        data={data} 
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
      />

      {selectedRow && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Business Details"
          footer={
            <select
              onChange={(e) => {
                const action = e.target.value;
                e.target.value = ""; // Reset dropdown
                if (action === "gst") {
                  setIsModalOpen(false);
                  setGstModalBusiness(selectedRow);
                } else if (action === "contact") {
                  setIsModalOpen(false);
                  setContactModalBusiness(selectedRow);
                  setMessageText("");
                } else if (action === "verify") {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === selectedRow.id
                        ? { ...item, status: "Active", verification: "Verified" }
                        : item
                    )
                  );
                  setSelectedRow((prev) => (prev ? { ...prev, status: "Active", verification: "Verified" } : prev));
                  toast.success(`Business "${selectedRow.business}" verified successfully`);
                } else if (action === "reject") {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === selectedRow.id
                        ? { ...item, status: "Suspended", verification: "Rejected" }
                        : item
                    )
                  );
                  setSelectedRow((prev) => (prev ? { ...prev, status: "Suspended", verification: "Rejected" } : prev));
                  toast.error(`Business "${selectedRow.business}" rejected`);
                }
                setIsModalOpen(false);
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select Action...</option>
              <option value="gst">View GST Certificate</option>
              <option value="contact">Contact Owner</option>
              {(selectedRow.status !== "Active" || selectedRow.verification !== "Verified") && (
                <option value="verify">Verify Business</option>
              )}
              {selectedRow.status !== "Suspended" && (
                <option value="reject">Reject Business</option>
              )}
            </select>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedRow.business}</h4>
                <p className="text-xs text-text-secondary">Owner: {selectedRow.owner}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={selectedRow.verification} />
                <StatusBadge status={selectedRow.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Business ID</p>
                <p className="font-semibold">{selectedRow.id}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Category</p>
                <p className="font-semibold">{selectedRow.category}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Services</p>
                <p className="font-semibold">{selectedRow.services}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Location</p>
                <p className="font-semibold">{selectedRow.location}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Rating</p>
                <p className="font-semibold">{selectedRow.rating}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Joined Date</p>
                <p className="font-semibold">{selectedRow.joined}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Add Business Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Business"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddBusiness}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Add Business
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddBusiness}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Business Name</label>
            <input 
              type="text" 
              placeholder="e.g. Apex Tech Solutions"
              value={newBusiness.business}
              onChange={(e) => setNewBusiness({...newBusiness, business: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Owner Name</label>
            <input 
              type="text" 
              placeholder="e.g. Rahul Gupta"
              value={newBusiness.owner}
              onChange={(e) => setNewBusiness({...newBusiness, owner: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
            <input 
              type="text" 
              placeholder="e.g. Electronics"
              value={newBusiness.category}
              onChange={(e) => setNewBusiness({...newBusiness, category: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Services</label>
            <input 
              type="text" 
              placeholder="e.g. Repair, Maintenance"
              value={newBusiness.services}
              onChange={(e) => setNewBusiness({...newBusiness, services: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Koramangala, Bengaluru"
              value={newBusiness.location}
              onChange={(e) => setNewBusiness({...newBusiness, location: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
        </form>
      </AdminModal>

      {/* GST Certificate Modal */}
      {gstModalBusiness && (
        <AdminModal
          isOpen={Boolean(gstModalBusiness)}
          onClose={() => setGstModalBusiness(null)}
          title={`GST Certificate - ${gstModalBusiness.business}`}
          footer={
            <button
              onClick={() => setGstModalBusiness(null)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="p-4 bg-surface-secondary rounded-xl border border-border-primary space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-zinc-500">GST Registration Certificate</span>
                <StatusBadge status={gstModalBusiness.verification} />
              </div>
              <p className="font-medium text-sm">Business Name: {gstModalBusiness.business}</p>
              <p className="font-medium text-sm">GST Number: 29ABCDE{gstModalBusiness.id}1Z5</p>
              <div className="h-28 bg-zinc-200 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-500 gap-2">
                <FileText className="w-5 h-5 text-zinc-400" />
                GST_Certificate_{gstModalBusiness.id}.pdf
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Contact Owner Modal */}
      {contactModalBusiness && (
        <AdminModal
          isOpen={Boolean(contactModalBusiness)}
          onClose={() => setContactModalBusiness(null)}
          title={`Contact Owner - ${contactModalBusiness.owner}`}
          footer={
            <>
              <button 
                onClick={() => setContactModalBusiness(null)}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                Send
              </button>
            </>
          }
        >
          <form className="space-y-4" onSubmit={handleSendMessage}>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Recipient</label>
              <p className="text-sm font-bold text-text-primary px-4 py-2.5 bg-surface-secondary rounded-xl border border-border-primary">
                {contactModalBusiness.owner} ({contactModalBusiness.business})
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Message</label>
              <textarea 
                rows={4}
                placeholder="Write message to business owner..."
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


