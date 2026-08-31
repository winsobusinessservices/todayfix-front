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

const AdminServicesTab = () => {
  const queryClient = useQueryClient();
  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    description: "",
    icon: "",
    image: null,
    is_active: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState({
    name: "",
    description: "",
    icon: "",
    image: null,
    is_active: true,
  });

  const nameToSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // 1. Fetch all categories for the dropdown
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: categoryApi.getCategories,
  });

  const categories = categoriesData?.data || [];

  // 2. Fetch subcategories for the selected category
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
    useQuery({
      queryKey: ["adminSubcategories", selectedCategoryUuid],
      queryFn: () => categoryApi.getSubcategories(selectedCategoryUuid),
      enabled: !!selectedCategoryUuid,
    });

  const subcategories = subcategoriesData?.data || [];
  
  // 3. Mutations
  const { mutate: createSubcategory, isPending: isCreating } = useMutation({
    mutationFn: (data) =>
      categoryApi.createSubcategory(selectedCategoryUuid, data),
    onSuccess: () => {
      toast.success("Subcategory added successfully!");
      queryClient.invalidateQueries([
        "adminSubcategories",
        selectedCategoryUuid,
      ]);
      setNewSubcategory({
        name: "",
        description: "",
        icon: "",
        image: null,
        is_active: true,
      });
      setIsAddModalOpen(false);
    },
    onError: () => toast.error("Failed to create subcategory"),
  });

  const { mutate: updateSubcategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ uuid, data }) => categoryApi.updateSubcategory(uuid, data),
    onSuccess: () => {
      toast.success("Subcategory updated successfully!");
      queryClient.invalidateQueries([
        "adminSubcategories",
        selectedCategoryUuid,
      ]);
      setIsEditing(false);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to update subcategory"),
  });

  const columns = [
    {
      header: "Subcategory",
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
      header: "Category Name",
      accessor: "category_name",
      render: (row) => (
        <span className="text-sm font-medium text-text-primary">
          {row.category_name}
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

  const handleAddSubcategory = (e) => {
    e?.preventDefault();
    if (!newSubcategory.name.trim()) {
      toast.error("Please enter a subcategory name");
      return;
    }

    if (!selectedCategoryUuid) {
      toast.error("Please select a category first");
      return;
    }

    const formData = new FormData();
    formData.append("name", newSubcategory.name.trim());
    formData.append("slug", nameToSlug(newSubcategory.name.trim()));
    formData.append("description", newSubcategory.description.trim());
    formData.append("icon", newSubcategory.icon.trim());
    formData.append("is_active", newSubcategory.is_active);
    if (newSubcategory.image) {
      formData.append("image", newSubcategory.image);
    }

    createSubcategory(formData);
  };

  const handleSaveEditSubcategory = (e) => {
    e?.preventDefault();
    if (!editSubcategory.name.trim()) {
      toast.error("Please enter a subcategory name");
      return;
    }

    const formData = new FormData();
    formData.append("name", editSubcategory.name.trim());
    formData.append("slug", nameToSlug(editSubcategory.name.trim()));
    formData.append("description", editSubcategory.description.trim());
    formData.append("icon", editSubcategory.icon.trim());
    formData.append("is_active", editSubcategory.is_active);
    if (editSubcategory.image) {
      formData.append("image", editSubcategory.image);
    }

    updateSubcategory({
      uuid: selectedRow.subCat_uuid,
      data: formData,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            Subcategory Management
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Organize and manage subcategories for a specific category.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast("Subcategory settings panel")}
            className="flex items-center justify-center p-2.5 bg-surface-primary border border-border-primary text-text-primary rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (!selectedCategoryUuid) {
                toast.error("Please select a category first");
                return;
              }
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Subcategory
          </button>
        </div>
      </div>

      {/* Category Selector */}
      <div className="bg-surface-primary border border-border-primary rounded-[1.25rem] p-5 shadow-sm">
        <label className="block text-sm font-bold text-text-primary mb-2">
          Select a Category
        </label>
        {isLoadingCategories ? (
          <div className="animate-pulse h-10 bg-surface-secondary rounded-xl w-full md:w-1/2"></div>
        ) : (
          <CustomDropdown
            options={categories.map((cat) => cat.name)}
            value={
              categories.find((cat) => cat.cat_uuid === selectedCategoryUuid)
                ?.name || ""
            }
            onChange={(name) => {
              const cat = categories.find((c) => c.name === name);
              if (cat) {
                setSelectedCategoryUuid(cat.cat_uuid);
              } else {
                setSelectedCategoryUuid("");
              }
            }}
            placeholder="-- Choose a category --"
          />
        )}
      </div>

      {!selectedCategoryUuid ? (
        <div className="text-center py-12 bg-surface-primary border border-border-primary rounded-[1.25rem]">
          <FolderTree className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary">
            No Category Selected
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Please select a category from the dropdown above to view and manage
            its subcategories.
          </p>
        </div>
      ) : isLoadingSubcategories ? (
        <div className="flex justify-center p-12">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={subcategories}
          searchPlaceholder="Search subcategories..."
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
          title={isEditing ? "Edit Subcategory" : "Subcategory Details"}
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
                  onClick={handleSaveEditSubcategory}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <CustomDropdown
                options={[
                  "Edit Subcategory",
                  !selectedRow.is_active ? "Set Active" : null,
                  selectedRow.is_active ? "Set Inactive" : null,
                ].filter(Boolean)}
                value=""
                placeholder="Select Action..."
                onChange={(action) => {
                  if (action === "Edit Subcategory") {
                    setEditSubcategory({
                      name: selectedRow.name,
                      slug: nameToSlug(selectedRow.name),
                      description: selectedRow.description || "",
                      icon: selectedRow.icon || "",
                      image: null,
                      is_active: selectedRow.is_active,
                    });
                    setIsEditing(true);
                  } else if (action === "Set Active") {
                    updateSubcategory({
                      uuid: selectedRow.subCat_uuid,
                      data: { is_active: true },
                    });
                    toast("Activating subcategory...");
                  } else if (action === "Set Inactive") {
                    updateSubcategory({
                      uuid: selectedRow.subCat_uuid,
                      data: { is_active: false },
                    });
                    toast("Deactivating subcategory...");
                  }
                }}
              />
            )
          }
        >
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSaveEditSubcategory}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Subcategory Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deep Cleaning"
                  value={editSubcategory.name}
                  onChange={(e) =>
                    setEditSubcategory({
                      ...editSubcategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of subcategory services..."
                  value={editSubcategory.description}
                  onChange={(e) =>
                    setEditSubcategory({
                      ...editSubcategory,
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
                  placeholder="e.g. sparkle"
                  value={editSubcategory.icon}
                  onChange={(e) =>
                    setEditSubcategory({
                      ...editSubcategory,
                      icon: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditSubcategory({
                      ...editSubcategory,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-surface-dark file:text-white cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editSubcategory.is_active}
                  onChange={(e) =>
                    setEditSubcategory({
                      ...editSubcategory,
                      is_active: e.target.checked,
                    })
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="editIsActive"
                  className="text-sm font-bold text-text-primary cursor-pointer"
                >
                  Active Subcategory
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
                    Subcat UUID
                  </p>
                  <p className="font-semibold break-all text-[11px] mt-1">
                    {selectedRow.subCat_uuid}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Category Name
                  </p>
                  <p className="font-semibold">{selectedRow.category_name}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Slug
                  </p>
                  <p className="font-semibold break-all text-[11px] mt-1">
                    {selectedRow.slug}
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
        title="Add New Subcategory"
        footer={
          <>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSubcategory}
              disabled={isCreating}
              className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
            >
              {isCreating ? "Adding..." : "Add Subcategory"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddSubcategory}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Subcategory Name
            </label>
            <input
              type="text"
              placeholder="e.g. Deep Cleaning"
              value={newSubcategory.name}
              onChange={(e) =>
                setNewSubcategory({ ...newSubcategory, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Description
            </label>
            <textarea
              placeholder="Brief description of subcategory services..."
              value={newSubcategory.description}
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
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
              value={newSubcategory.icon}
              onChange={(e) =>
                setNewSubcategory({ ...newSubcategory, icon: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  image: e.target.files[0],
                })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-surface-dark file:text-white cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="newIsActive"
              checked={newSubcategory.is_active}
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  is_active: e.target.checked,
                })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="newIsActive"
              className="text-sm font-bold text-text-primary cursor-pointer"
            >
              Active Subcategory
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminServicesTab;
