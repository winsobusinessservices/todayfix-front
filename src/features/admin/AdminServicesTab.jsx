import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const MOCK_CATEGORIES = [
  "Maintenance",
  "Technical",
  "Sanitation",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "General",
];

const MOCK_DATA = [
  {
    id: "SRV-001",
    serviceName: "Home Cleaning",
    category: "Maintenance",
    price: "₹1,500",
    providers: 12,
    requests: 145,
    revenue: "₹45,000",
    rating: 4.8,
    status: "Active",
    created: "2026-01-15",
  },
  {
    id: "SRV-002",
    serviceName: "Electrical Repairs",
    category: "Technical",
    price: "₹800",
    providers: 8,
    requests: 89,
    revenue: "₹32,500",
    rating: 4.5,
    status: "Active",
    created: "2026-02-10",
  },
  {
    id: "SRV-003",
    serviceName: "Plumbing Services",
    category: "Maintenance",
    price: "₹1,200",
    providers: 15,
    requests: 210,
    revenue: "₹58,200",
    rating: 4.9,
    status: "Active",
    created: "2026-03-05",
  },
  {
    id: "SRV-004",
    serviceName: "Appliance Repair",
    category: "Technical",
    price: "₹950",
    providers: 5,
    requests: 42,
    revenue: "₹18,900",
    rating: 4.2,
    status: "Pending",
    created: "2026-07-20",
  },
  {
    id: "SRV-005",
    serviceName: "Pest Control",
    category: "Sanitation",
    price: "₹2,000",
    providers: 3,
    requests: 15,
    revenue: "₹8,400",
    rating: 4.7,
    status: "Inactive",
    created: "2026-05-12",
  },
];

const columns = [
  { header: "Service Name", accessor: "serviceName" },
  { header: "Category", accessor: "category" },
  { header: "Price", accessor: "price", render: (row) => row.price || "₹1,000" },
  { header: "Providers", accessor: "providers" },
  { header: "Requests", accessor: "requests" },
  { header: "Revenue", accessor: "revenue" },
  { header: "Rating", accessor: "rating" },
  {
    header: "Status",
    accessor: "status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { header: "Created", accessor: "created" },
];

export default function AdminServicesTab() {
  const [data, setData] = useState(MOCK_DATA);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ serviceName: "", category: "Maintenance", price: "" });
  const [newService, setNewService] = useState({ serviceName: "", category: "Maintenance", price: "₹1,000" });

  const handleAddService = (e) => {
    e?.preventDefault();
    if (!newService.serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    const serviceObj = {
      id: `SRV-${String(data.length + 1).padStart(3, "0")}`,
      serviceName: newService.serviceName.trim(),
      category: newService.category || "Maintenance",
      price: newService.price.trim() || "₹1,000",
      providers: 0,
      requests: 0,
      revenue: "₹0",
      rating: 5.0,
      status: "Active",
      created: new Date().toISOString().split("T")[0],
    };

    setData((prev) => [...prev, serviceObj]);
    setNewService({ serviceName: "", category: "Maintenance", price: "₹1,000" });
    setIsAddModalOpen(false);
    toast.success(`Service "${serviceObj.serviceName}" added successfully!`);
  };

  const handleSaveEdit = (e) => {
    e?.preventDefault();
    if (!editForm.serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    const updatedRow = {
      ...selectedRow,
      serviceName: editForm.serviceName.trim(),
      category: editForm.category,
      price: editForm.price.trim(),
    };

    setData((prev) =>
      prev.map((item) => (item.id === selectedRow.id ? updatedRow : item))
    );
    setSelectedRow(updatedRow);
    setIsEditing(false);
    toast.success(`Service "${updatedRow.serviceName}" updated successfully!`);
  };

  return (
    <div className="p-6 animate-in fade-in duration-500 bg-white border border-zinc-200 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Services Management
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsEditing(false);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedRow(row);
          setIsEditing(false);
          setIsModalOpen(true);
        }}
      />

      {/* Details / Edit Modal */}
      {selectedRow && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRow(null);
            setIsEditing(false);
          }}
          title={isEditing ? "Edit Service" : "Service Details"}
          footer={
            isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 text-sm font-medium cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <select
                onChange={(e) => {
                  const action = e.target.value;
                  e.target.value = ""; // Reset dropdown
                  if (action === "edit") {
                    setEditForm({
                      serviceName: selectedRow.serviceName,
                      category: selectedRow.category,
                      price: selectedRow.price || "₹1,500",
                    });
                    setIsEditing(true);
                  } else if (action === "activate") {
                    setData((prev) =>
                      prev.map((item) =>
                        item.id === selectedRow.id ? { ...item, status: "Active" } : item
                      )
                    );
                    setSelectedRow((prev) => (prev ? { ...prev, status: "Active" } : prev));
                    toast.success(`Service "${selectedRow.serviceName}" activated successfully`);
                    setIsModalOpen(false);
                  } else if (action === "suspend") {
                    setData((prev) =>
                      prev.map((item) =>
                        item.id === selectedRow.id ? { ...item, status: "Inactive" } : item
                      )
                    );
                    setSelectedRow((prev) => (prev ? { ...prev, status: "Inactive" } : prev));
                    toast.error(`Service "${selectedRow.serviceName}" suspended successfully`);
                    setIsModalOpen(false);
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Action...
                </option>
                <option value="edit">Edit Service</option>
                {selectedRow.status !== "Active" && (
                  <option value="activate">Activate Service</option>
                )}
                {selectedRow.status !== "Inactive" && selectedRow.status !== "Suspended" && (
                  <option value="suspend">Suspend Service</option>
                )}
              </select>
            )
          }
        >
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSaveEdit}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home Cleaning"
                  value={editForm.serviceName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, serviceName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Category
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 cursor-pointer"
                >
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹1,500"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-text-primary">
              <div className="flex justify-between items-center pb-3 border-b border-border-primary">
                <div>
                  <h4 className="text-lg font-bold">{selectedRow.serviceName}</h4>
                  <p className="text-xs text-text-secondary">{selectedRow.category}</p>
                </div>
                <StatusBadge status={selectedRow.status} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Service ID</p>
                  <p className="font-semibold">{selectedRow.id}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Category</p>
                  <p className="font-semibold">{selectedRow.category}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Price</p>
                  <p className="font-semibold">{selectedRow.price || "₹1,500"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Providers</p>
                  <p className="font-semibold">{selectedRow.providers}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Requests</p>
                  <p className="font-semibold">{selectedRow.requests}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Revenue</p>
                  <p className="font-semibold text-emerald-600">{selectedRow.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Rating</p>
                  <p className="font-semibold">{selectedRow.rating}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Created Date</p>
                  <p className="font-semibold">{selectedRow.created}</p>
                </div>
              </div>
            </div>
          )}
        </AdminModal>
      )}

      {/* Add Service Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Service"
        footer={
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddService}
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 text-sm font-medium cursor-pointer"
            >
              Add Service
            </button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleAddService}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Service Name
            </label>
            <input
              type="text"
              placeholder="e.g. Deep Cleaning"
              value={newService.serviceName}
              onChange={(e) =>
                setNewService({ ...newService, serviceName: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Category
            </label>
            <select
              value={newService.category}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 cursor-pointer"
            >
              {MOCK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Price
            </label>
            <input
              type="text"
              placeholder="e.g. ₹1,000"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
