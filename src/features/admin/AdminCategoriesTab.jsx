import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { FolderTree, Plus, Settings } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_CATEGORIES = [
  { id: "CAT-01", name: "Cleaning", description: "Home and office cleaning services", servicesCount: 8, providersCount: 840, status: "Active" },
  { id: "CAT-02", name: "Plumbing", description: "Water, pipes, and sanitary fixes", servicesCount: 12, providersCount: 520, status: "Active" },
  { id: "CAT-03", name: "Electrical", description: "Wiring, appliances, and lighting", servicesCount: 15, providersCount: 610, status: "Active" },
  { id: "CAT-04", name: "Appliance Repair", description: "AC, Fridge, Washing Machine", servicesCount: 6, providersCount: 320, status: "Active" },
  { id: "CAT-05", name: "Painting", description: "Interior and exterior painting", servicesCount: 4, providersCount: 150, status: "Active" },
  { id: "CAT-06", name: "Pest Control", description: "Termite, cockroach, and general pest", servicesCount: 5, providersCount: 95, status: "Active" },
  { id: "CAT-07", name: "Solar Services", description: "Installation and maintenance", servicesCount: 3, providersCount: 12, status: "Under Review" },
];

const AdminCategoriesTab = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState({ name: "", description: "" });

  const columns = [
    { 
      header: "Category", 
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-purple-500" /> {row.name}
          </p>
          <p className="text-xs text-text-secondary w-64 truncate" title={row.description}>{row.description}</p>
        </div>
      )
    },
    { header: "Services", accessor: "servicesCount", render: (row) => <span className="font-bold text-text-primary bg-surface-secondary px-2 py-1 rounded-md">{row.servicesCount}</span> },
    { header: "Total Providers", accessor: "providersCount", render: (row) => <span className="font-medium text-text-secondary">{row.providersCount.toLocaleString()}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const handleAddCategory = (e) => {
    e?.preventDefault();
    if (!newCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const categoryData = {
      id: `CAT-${String(categories.length + 1).padStart(2, "0")}`,
      name: newCategory.name.trim(),
      description: newCategory.description.trim() || "New service category",
      servicesCount: 0,
      providersCount: 0,
      status: "Active",
    };

    setCategories([...categories, categoryData]);
    setNewCategory({ name: "", description: "" });
    setIsAddModalOpen(false);
    toast.success(`Category "${categoryData.name}" added successfully!`);
  };

  const handleSaveEditCategory = (e) => {
    e?.preventDefault();
    if (!editCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const updatedRow = {
      ...selectedRow,
      name: editCategory.name.trim(),
      description: editCategory.description.trim(),
    };

    setCategories((prev) =>
      prev.map((c) => (c.id === selectedRow.id ? updatedRow : c))
    );
    setSelectedRow(updatedRow);
    setIsEditing(false);
    toast.success(`Category "${updatedRow.name}" updated successfully!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Category Management</h2>
          <p className="text-text-secondary font-medium mt-1">Organize and manage top-level service categories.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => toast("Category settings panel")}
            className="flex items-center justify-center p-2.5 bg-surface-primary border border-border-primary text-text-primary rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer"
          >
             <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={categories}
        searchPlaceholder="Search categories..."
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

      {selectedRow && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditing(false);
            setSelectedRow(null);
          }}
          title={isEditing ? "Edit Category" : "Category Details"}
          footer={
            isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditCategory}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
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
                    setEditCategory({
                      name: selectedRow.name,
                      description: selectedRow.description,
                    });
                    setIsEditing(true);
                  } else if (action === "approve") {
                    setCategories((prev) =>
                      prev.map((c) => (c.id === selectedRow.id ? { ...c, status: "Active" } : c))
                    );
                    setSelectedRow((prev) => (prev ? { ...prev, status: "Active" } : prev));
                    toast.success(`Category "${selectedRow.name}" approved successfully!`);
                    setIsModalOpen(false);
                  } else if (action === "hide") {
                    setCategories((prev) =>
                      prev.map((c) => (c.id === selectedRow.id ? { ...c, status: "Hidden" } : c))
                    );
                    setSelectedRow((prev) => (prev ? { ...prev, status: "Hidden" } : prev));
                    toast.error(`Category "${selectedRow.name}" hidden successfully!`);
                    setIsModalOpen(false);
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>Select Action...</option>
                <option value="edit">Edit Category</option>
                {selectedRow.status !== "Active" && (
                  <option value="approve">Approve Category</option>
                )}
                {selectedRow.status !== "Hidden" && (
                  <option value="hide">Hide Category</option>
                )}
              </select>
            )
          }
        >
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSaveEditCategory}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Home Cleaning"
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                <textarea 
                  placeholder="Brief description of category services..."
                  value={editCategory.description}
                  onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-text-primary">
              <div className="flex justify-between items-center pb-3 border-b border-border-primary">
                <div>
                  <h4 className="text-lg font-bold">{selectedRow.name}</h4>
                  <p className="text-xs text-text-secondary">{selectedRow.description}</p>
                </div>
                <StatusBadge status={selectedRow.status} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Category ID</p>
                  <p className="font-semibold">{selectedRow.id}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Status</p>
                  <p className="font-semibold">{selectedRow.status}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Services Count</p>
                  <p className="font-semibold">{selectedRow.servicesCount}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Total Providers</p>
                  <p className="font-semibold">{selectedRow.providersCount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </AdminModal>
      )}

      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddCategory}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Add Category
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddCategory}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Category Name</label>
            <input 
              type="text" 
              placeholder="e.g. Home Cleaning"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
            <textarea 
              placeholder="Brief description of category services..."
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminCategoriesTab;
