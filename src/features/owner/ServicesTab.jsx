import React, { useState } from "react";
import {
  Plus,
  IndianRupee,
  Edit2,
  Trash2,
  X,
  Clock,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryApi } from "../../services/categoryApi";
import { serviceApi } from "../../services/serviceApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const ToggleSwitch = ({ active, onToggle, disabled }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    disabled={disabled}
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 shrink-0 ${
      active
        ? "bg-text-primary"
        : "bg-surface-secondary border border-border-primary"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <div
      className={`w-4 h-4 rounded-full transition-transform duration-300 ${
        active
          ? "bg-surface-primary translate-x-6"
          : "bg-zinc-500 translate-x-0"
      }`}
    />
  </button>
);

const extractErrorMessage = (error, defaultMsg) => {
  if (error?.response?.data) {
    const data = error.response.data;
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;

    // Grab the first validation error array message if available
    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) {
      return data[firstKey][0];
    }
  }
  return defaultMsg;
};

const ServicesTab = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    duration: 60,
    required_employees: 1,
    subCat_uuid: "",
    is_active: true,
  });

  const catUuid = "f772bae2-66f3-44cc-911d-e8a70571f4a2";

  const { data: subCategoriesData, isLoading: subCategoryLoading } = useQuery({
    queryKey: ["subCategories", catUuid],
    queryFn: async () => {
      const response = await categoryApi.getSubcategories(catUuid);
      return response.data || response;
    },
    enabled: !!catUuid,
  });

  // console.log(subCategoriesData);

  const subCategories = Array.isArray(subCategoriesData)
    ? subCategoriesData
    : subCategoriesData?.results || [];

  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["ownerServices"],
    queryFn: async () => {
      const response = await serviceApi.getBusinessServices();
      return response.data || response;
    },
  });

  const allServices = Array.isArray(servicesData)
    ? servicesData
    : servicesData?.results || [];

  // Note: Since this is the owner dashboard, we ideally filter services by their business UUID.
  // For now we display all services returned, assuming the API might filter it or the user can see their own.
  const services = allServices;

  const { mutate: createService, isPending: isCreating } = useMutation({
    mutationFn: serviceApi.createService,
    onSuccess: () => {
      toast.success("Service added successfully!");
      queryClient.invalidateQueries(["ownerServices"]);
      setIsModalOpen(false);
    },
    onError: (err) =>
      toast.error(extractErrorMessage(err, "Failed to create service")),
  });

  const { mutate: updateService, isPending: isUpdating } = useMutation({
    mutationFn: serviceApi.updateService,
    onSuccess: () => {
      toast.success("Service updated successfully!");
      queryClient.invalidateQueries(["ownerServices"]);
      setIsModalOpen(false);
    },
    onError: (err) =>
      toast.error(extractErrorMessage(err, "Failed to update service")),
  });

  const { mutate: deleteService, isPending: isDeletingService } = useMutation({
    mutationFn: serviceApi.deleteService,
    onSuccess: () => {
      toast.success("Service deleted successfully!");
      queryClient.invalidateQueries(["ownerServices"]);
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to delete service"));
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    },
  });

  const toggleService = (service) => {
    updateService({
      id: service.service_uuid,
      data: {
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        required_employees: service.required_employees,
        cat_uuid: service.category?.cat_uuid || catUuid,
        subCat_uuid:
          service.subcategory?.subCat_uuid || subCategories[0]?.subCat_uuid,
        is_active: !service.is_active,
      },
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      duration: 60,
      required_employees: 1,
      subCat_uuid: subCategories.length > 0 ? subCategories[0].subCat_uuid : "",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service.service_uuid);
    setFormData({
      name: service.name,
      price: service.price,
      description: service.description,
      duration: service.duration || 60,
      required_employees: service.required_employees || 1,
      subCat_uuid: service.subcategory?.subCat_uuid || "",
      is_active: service.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.subCat_uuid) {
      return toast.error("Please select a sub-category");
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price.toString(),
      duration: parseInt(formData.duration),
      required_employees: parseInt(formData.required_employees),
      cat_uuid: catUuid,
      subCat_uuid: formData.subCat_uuid,
      is_active: formData.is_active,
    };

    if (editingId) {
      updateService({ id: editingId, data: payload });
    } else {
      createService(payload);
    }
  };

  const handleDeleteClick = (id) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete);
    }
  };

  if (servicesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
            My Services
          </h1>
          <p className="text-zinc-400">
            Manage what you offer and your pricing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md cursor-pointer"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service) => (
          <div
            key={service.service_uuid}
            className={`bg-surface-primary justify-between flex flex-col rounded-3xl border p-6 shadow-2xl shadow-black/5 transition-all duration-300 ${
              service.is_active
                ? "border-border-primary"
                : "border-border-primary opacity-60 grayscale"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-text-primary">
                <IndianRupee className="w-5 h-5 text-zinc-400" />
                {Number(service.price).toLocaleString()}
              </div>
              <ToggleSwitch
                active={service.is_active}
                onToggle={() => toggleService(service)}
                disabled={isUpdating}
              />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
              {service.name}
            </h3>
            {service.subcategory?.name && (
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                {service.subcategory.name}
              </p>
            )}

            <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
              {service.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {service.duration} mins
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {service.required_employees} staff
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border-primary">
              <button
                onClick={() => openEditModal(service)}
                className="p-2 text-zinc-500 hover:text-text-primary transition-colors bg-surface-secondary rounded-lg border border-transparent hover:border-border-primary cursor-pointer"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeleteClick(service.service_uuid)}
                className="p-2 text-zinc-500 hover:text-red-500 transition-colors bg-surface-secondary rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="col-span-full text-center py-20 bg-surface-primary rounded-3xl border border-border-primary">
            <p className="text-zinc-500 font-medium">No services added yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-primary rounded-3xl border border-border-primary shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-border-primary flex justify-between items-center shrink-0">
                <h2 className="text-xl font-black text-text-primary tracking-tight">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-text-primary cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              <form
                onSubmit={handleSave}
                className="p-6 flex-1 overflow-y-auto space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Service Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                    placeholder="e.g. Sofa Cleaning"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Sub-Category
                  </label>
                  <select
                    required
                    value={formData.subCat_uuid}
                    onChange={(e) =>
                      setFormData({ ...formData, subCat_uuid: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors appearance-none"
                  >
                    <option value="" disabled>
                      Select a sub-category
                    </option>
                    {subCategories.map((sub) => (
                      <option key={sub.subCat_uuid} value={sub.subCat_uuid}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Price (₹)
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Duration (mins)
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                      placeholder="e.g. 60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Required Staff
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.required_employees}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          required_employees: e.target.value,
                        })
                      }
                      className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                      placeholder="e.g. 1"
                    />
                  </div>
                  <div className="flex flex-col justify-end pb-1">
                    <label className="flex items-center gap-3 p-3 bg-surface-secondary border border-border-primary rounded-xl cursor-pointer hover:border-text-primary transition-colors">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-text-primary"
                        checked={formData.is_active}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            is_active: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm font-bold text-text-primary">
                        Active Service
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors resize-none h-24"
                    placeholder="Describe what is included..."
                  />
                </div>
                <div className="pt-4 flex gap-3 mt-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-border-primary transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex-1 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {isCreating || isUpdating ? "Saving..." : "Save Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeletingService}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
};

export default ServicesTab;
