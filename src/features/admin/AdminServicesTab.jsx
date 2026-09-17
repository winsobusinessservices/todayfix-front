import React, { useState } from "react";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import { Plus, Settings, IndianRupee, Clock, Users, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../../services/categoryApi";
import { serviceApi } from "../../services/serviceApi";
import CustomDropdown from "../../components/ui/CustomDropdown";

const AdminServicesTab = () => {
  const queryClient = useQueryClient();
  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState("");
  const [selectedSubCatUuid, setSelectedSubCatUuid] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: 60,
    required_employees: 1,
    is_active: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editService, setEditService] = useState({
    name: "",
    description: "",
    price: "",
    duration: 60,
    required_employees: 1,
    is_active: true,
  });

  // Fetch all categories for the dropdown
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: categoryApi.getCategories,
  });

  const categories = categoriesData?.data || [];

  // Fetch subcategories for the selected category
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
    useQuery({
      queryKey: ["adminSubcategories", selectedCategoryUuid],
      queryFn: () => categoryApi.getSubcategories(selectedCategoryUuid),
      enabled: !!selectedCategoryUuid,
    });

  const subcategories = subcategoriesData?.data || [];

  // Fetch services for the selected subcategory
  const { data: servicesData, isLoading: isLoadingServices } =
    useQuery({
      queryKey: ["adminServices", selectedSubCatUuid],
      queryFn: () => serviceApi.getServicesBySubcategory(selectedSubCatUuid, { page: 1, limit: 100 }), // We might need to adjust pagination or params
      enabled: !!selectedSubCatUuid,
    });

  const services = servicesData?.data || servicesData?.results || [];

  const { mutate: createService, isPending: isCreating } = useMutation({
    mutationFn: serviceApi.createService,
    onSuccess: () => {
      toast.success("Service added successfully!");
      queryClient.invalidateQueries(["adminServices", selectedSubCatUuid]);
      setNewService({
        name: "",
        description: "",
        price: "",
        duration: 60,
        required_employees: 1,
        is_active: true,
      });
      setIsAddModalOpen(false);
    },
    onError: () => toast.error("Failed to create service"),
  });

  const { mutate: updateService, isPending: isUpdating } = useMutation({
    mutationFn: serviceApi.updateService,
    onSuccess: () => {
      toast.success("Service updated successfully!");
      queryClient.invalidateQueries(["adminServices", selectedSubCatUuid]);
      setIsEditing(false);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to update service"),
  });

  const { mutate: deleteService, isPending: isDeleting } = useMutation({
    mutationFn: serviceApi.deleteService,
    onSuccess: () => {
      toast.success("Service deleted successfully!");
      queryClient.invalidateQueries(["adminServices", selectedSubCatUuid]);
      setIsEditing(false);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to delete service"),
  });

  const columns = [
    {
      header: "Service",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-500" />
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
      header: "Price",
      accessor: "price",
      render: (row) => (
        <span className="font-bold text-text-primary flex items-center gap-1 text-sm">
          <IndianRupee className="w-3.5 h-3.5 text-zinc-400" />
          {row.price}
        </span>
      ),
    },
    {
      header: "Details",
      accessor: "duration",
      render: (row) => (
        <div className="flex flex-col gap-1 text-xs text-zinc-500 font-medium">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {row.duration} mins</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {row.required_employees || 1} staff</span>
        </div>
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

  const handleAddService = (e) => {
    e?.preventDefault();
    if (!newService.name.trim()) {
      return toast.error("Please enter a service name");
    }
    if (!selectedCategoryUuid || !selectedSubCatUuid) {
      return toast.error("Please select a category and subcategory first");
    }

    createService({
      name: newService.name.trim(),
      description: newService.description.trim(),
      price: newService.price.toString(),
      duration: parseInt(newService.duration),
      required_employees: parseInt(newService.required_employees),
      cat_uuid: selectedCategoryUuid,
      subCat_uuid: selectedSubCatUuid,
      is_active: newService.is_active,
    });
  };

  const handleSaveEditService = (e) => {
    e?.preventDefault();
    if (!editService.name.trim()) {
      return toast.error("Please enter a service name");
    }

    updateService({
      id: selectedRow.service_uuid,
      data: {
        name: editService.name.trim(),
        description: editService.description.trim(),
        price: editService.price.toString(),
        duration: parseInt(editService.duration),
        required_employees: parseInt(editService.required_employees),
        cat_uuid: selectedRow.category?.cat_uuid || selectedCategoryUuid,
        subCat_uuid: selectedRow.subcategory?.subCat_uuid || selectedSubCatUuid,
        is_active: editService.is_active,
      },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            Service Management
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Organize and manage individual services for a subcategory.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast("Service settings panel")}
            className="flex items-center justify-center p-2.5 bg-surface-primary border border-border-primary text-text-primary rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (!selectedCategoryUuid || !selectedSubCatUuid) {
                toast.error("Please select a subcategory first");
                return;
              }
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {/* Category & Subcategory Selectors */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface-primary border border-border-primary rounded-[1.25rem] p-5 shadow-sm">
          <label className="block text-sm font-bold text-text-primary mb-2">
            Select a Category
          </label>
          {isLoadingCategories ? (
            <div className="animate-pulse h-10 bg-surface-secondary rounded-xl w-full"></div>
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
                setSelectedSubCatUuid(""); // Reset subcategory when category changes
              }}
              placeholder="-- Choose a category --"
            />
          )}
        </div>

        <div className="bg-surface-primary border border-border-primary rounded-[1.25rem] p-5 shadow-sm">
          <label className="block text-sm font-bold text-text-primary mb-2">
            Select a Subcategory
          </label>
          {isLoadingSubcategories ? (
            <div className="animate-pulse h-10 bg-surface-secondary rounded-xl w-full"></div>
          ) : (
            <CustomDropdown
              options={subcategories.map((sub) => sub.name)}
              value={
                subcategories.find(
                  (sub) => sub.subCat_uuid === selectedSubCatUuid
                )?.name || ""
              }
              onChange={(name) => {
                const sub = subcategories.find((s) => s.name === name);
                if (sub) {
                  setSelectedSubCatUuid(sub.subCat_uuid);
                } else {
                  setSelectedSubCatUuid("");
                }
              }}
              placeholder={
                selectedCategoryUuid
                  ? "-- Choose a subcategory --"
                  : "Select a category first"
              }
              disabled={!selectedCategoryUuid}
            />
          )}
        </div>
      </div>

      {!selectedSubCatUuid ? (
        <div className="text-center py-12 bg-surface-primary border border-border-primary rounded-[1.25rem]">
          <Wrench className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary">
            No Subcategory Selected
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Please select a category and subcategory from the dropdowns above to view and manage services.
          </p>
        </div>
      ) : isLoadingServices ? (
        <div className="flex justify-center p-12">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={services}
          searchPlaceholder="Search services..."
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
          title={isEditing ? "Edit Service" : "Service Details"}
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
                  onClick={handleSaveEditService}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <CustomDropdown
                options={[
                  "Edit Service",
                  !selectedRow.is_active ? "Set Active" : null,
                  selectedRow.is_active ? "Set Inactive" : null,
                  "Delete Service",
                ].filter(Boolean)}
                value=""
                placeholder="Select Action..."
                onChange={(action) => {
                  if (action === "Edit Service") {
                    setEditService({
                      name: selectedRow.name,
                      description: selectedRow.description || "",
                      price: selectedRow.price || "",
                      duration: selectedRow.duration || 60,
                      required_employees: selectedRow.required_employees || 1,
                      is_active: selectedRow.is_active,
                    });
                    setIsEditing(true);
                  } else if (action === "Set Active") {
                    updateService({
                      id: selectedRow.service_uuid,
                      data: { is_active: true },
                    });
                    toast("Activating service...");
                  } else if (action === "Set Inactive") {
                    updateService({
                      id: selectedRow.service_uuid,
                      data: { is_active: false },
                    });
                    toast("Deactivating service...");
                  } else if (action === "Delete Service") {
                    if (window.confirm("Are you sure you want to delete this service?")) {
                      deleteService(selectedRow.service_uuid);
                    }
                  }
                }}
              />
            )
          }
        >
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSaveEditService}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sofa Cleaning"
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of the service..."
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 500"
                    value={editService.price}
                    onChange={(e) =>
                      setEditService({ ...editService, price: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 60"
                    value={editService.duration}
                    onChange={(e) =>
                      setEditService({ ...editService, duration: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Required Staff
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 1"
                    value={editService.required_employees}
                    onChange={(e) =>
                      setEditService({ ...editService, required_employees: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex flex-col justify-end pb-1">
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="editIsActive"
                      checked={editService.is_active}
                      onChange={(e) =>
                        setEditService({
                          ...editService,
                          is_active: e.target.checked,
                        })
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor="editIsActive"
                      className="text-sm font-bold text-text-primary cursor-pointer"
                    >
                      Active Service
                    </label>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-text-primary">
              <div className="flex justify-between items-center pb-3 border-b border-border-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-secondary flex items-center justify-center rounded-lg border border-border-primary text-xl">
                    <Wrench className="w-5 h-5 text-emerald-500" />
                  </div>
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
                    Price
                  </p>
                  <p className="font-semibold mt-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {selectedRow.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Duration
                  </p>
                  <p className="font-semibold flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5"/>
                    {selectedRow.duration} mins
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Required Staff
                  </p>
                  <p className="font-semibold flex items-center gap-1 mt-1">
                    <Users className="w-3.5 h-3.5"/>
                    {selectedRow.required_employees || 1}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Service UUID
                  </p>
                  <p className="font-semibold break-all text-[11px] mt-1">
                    {selectedRow.service_uuid}
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
        title="Add New Service"
        footer={
          <>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddService}
              disabled={isCreating}
              className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer disabled:opacity-50"
            >
              {isCreating ? "Adding..." : "Add Service"}
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddService}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Service Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sofa Cleaning"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">
              Description
            </label>
            <textarea
              placeholder="Brief description of the service..."
              value={newService.description}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">
                Duration (mins)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 60"
                value={newService.duration}
                onChange={(e) =>
                  setNewService({ ...newService, duration: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">
                Required Staff
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={newService.required_employees}
                onChange={(e) =>
                  setNewService({ ...newService, required_employees: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex flex-col justify-end pb-1">
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="newIsActive"
                  checked={newService.is_active}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      is_active: e.target.checked,
                    })
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="newIsActive"
                  className="text-sm font-bold text-text-primary cursor-pointer"
                >
                  Active Service
                </label>
              </div>
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminServicesTab;
