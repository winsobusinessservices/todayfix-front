import React, { useState } from "react";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import { FolderTree, Plus, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../../services/categoryApi";
import CustomDropdown from "../../components/ui/CustomDropdown";

const AdminCategoriesTab = () => {
  const queryClient = useQueryClient();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    is_active: true,
  });

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: categoryApi.getCategories,
  });

  const categories = categoriesData || [];

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries(["adminCategories"]);
      setNewCategory({
        name: "",
        slug: "",
        description: "",
        icon: "",
        is_active: true,
      });
      setIsAddModalOpen(false);
    },
    onError: () => toast.error("Failed to create category"),
  });

  const nameToSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ uuid, data }) => categoryApi.updateCategory(uuid, data),
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries(["adminCategories"]);
      setIsEditing(false);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to update category"),
  });

  const columns = [
    {
      header: "Category",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary flex items-center gap-2">
            {row.icon ? (
              <span className="text-purple-500 w-4 h-4 flex items-center justify-center text-xs">
                {row.icon}
              </span>
            ) : (
              <FolderTree className="w-4 h-4 text-purple-500" />
            )}
            {row.name}
          </p>
          <p
            className="text-xs text-text-secondary w-64 truncate"
            title={row.description}
          >
            {row.description}
          </p>
        </div>
      ),
    },
    {
      header: "Subcategories",
      accessor: "subcategories",
      render: (row) => (
        <span className="font-bold text-text-primary bg-surface-secondary px-2 py-1 rounded-md">
          {row.subcategories?.length || 0}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (row) => (
        <StatusBadge status={row.is_active ? "Active" : "Inactive"} />
      ),
    },
  ];

  const handleAddCategory = (e) => {
    e?.preventDefault();
    if (!newCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    createCategory({
      name: newCategory.name.trim(),
      slug: nameToSlug(newCategory.name.trim()),
      description: newCategory.description.trim(),
      icon: newCategory.icon.trim(),
      is_active: newCategory.is_active,
    });
  };

  const handleSaveEditCategory = (e) => {
    e?.preventDefault();
    if (!editCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    updateCategory({
      uuid: selectedRow.cat_uuid,
      data: {
        name: editCategory.name.trim(),
        slug: nameToSlug(editCategory.name.trim()),
        description: editCategory.description.trim(),
        icon: editCategory.icon.trim(),
        is_active: editCategory.is_active,
      },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            Category Management
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Organize and manage top-level service categories.
          </p>
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

      {isLoading ? (
        <div className="flex justify-center p-12">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
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
      )}

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
                  disabled={isUpdating}
                  className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <CustomDropdown
                options={[
                  "Edit Category",
                  !selectedRow.is_active ? "Set Active" : null,
                  selectedRow.is_active ? "Set Inactive" : null,
                ].filter(Boolean)}
                value=""
                placeholder="Select Action..."
                onChange={(action) => {
                  if (action === "Edit Category") {
                    setEditCategory({
                      name: selectedRow.name,
                      slug: nameToSlug(selectedRow.name),
                      description: selectedRow.description || "",
                      icon: selectedRow.icon || "",
                      is_active: selectedRow.is_active,
                    });
                    setIsEditing(true);
                  } else if (action === "Set Active") {
                    updateCategory({
                      uuid: selectedRow.cat_uuid,
                      data: { is_active: true },
                    });
                    toast("Activating category...");
                  } else if (action === "Set Inactive") {
                    updateCategory({
                      uuid: selectedRow.cat_uuid,
                      data: { is_active: false },
                    });
                    toast("Deactivating category...");
                  }
                }}
              />
            )
          }
        >
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSaveEditCategory}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home Cleaning"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of category services..."
                  value={editCategory.description}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Icon
                </label>
                <input
                  type="text"
                  placeholder="e.g. cleaning"
                  value={editCategory.icon}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, icon: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editCategory.is_active}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      is_active: e.target.checked,
                    })
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="editIsActive"
                  className="text-sm font-bold text-text-primary cursor-pointer"
                >
                  Active Category
                </label>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-text-primary">
              <div className="flex justify-between items-center pb-3 border-b border-border-primary">
                <div className="flex items-center gap-3">
                  {selectedRow.icon && (
                    <div className="w-10 h-10 bg-surface-secondary flex items-center justify-center rounded-lg border border-border-primary text-xl">
                      {selectedRow.icon}
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-bold">{selectedRow.name}</h4>
                    <p className="text-xs text-text-secondary">
                      {selectedRow.description}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  status={selectedRow.is_active ? "Active" : "Inactive"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Category UUID
                  </p>
                  <p className="font-semibold break-all text-[11px] mt-1">
                    {selectedRow.cat_uuid}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Slug
                  </p>
                  <p className="font-semibold">{selectedRow.slug}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Subcategories
                  </p>
                  <p className="font-semibold">
                    {selectedRow.subcategories?.length || 0}
                  </p>
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
              disabled={isCreating}
              className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
            >
              {isCreating ? "Adding..." : "Add Category"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddCategory}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Home Cleaning"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Description
            </label>
            <textarea
              placeholder="Brief description of category services..."
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Icon
            </label>
            <input
              type="text"
              placeholder="e.g. cleaning"
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="newIsActive"
              checked={newCategory.is_active}
              onChange={(e) =>
                setNewCategory({ ...newCategory, is_active: e.target.checked })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="newIsActive"
              className="text-sm font-bold text-text-primary cursor-pointer"
            >
              Active Category
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminCategoriesTab;
