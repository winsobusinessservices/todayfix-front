import { useState } from "react";
import {
  CalendarDays,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  User,
  ChevronDown,
  Copy,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import toast from "react-hot-toast";

const extractErrorMessage = (error, defaultMsg) => {
  if (error?.response?.data) {
    const data = error.response.data;
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) {
      return data[firstKey][0];
    }
  }
  return defaultMsg;
};

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const SLOT_TYPES = ["MORNING", "AFTERNOON", "EVENING"];

const SlotsTab = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Search and Filter State
  const [filters, setFilters] = useState({
    employee_uuid: "ALL",
    day_of_week: "ALL",
    slot_type: "ALL",
    status: "ALL",
  });

  // Form State
  const [formData, setFormData] = useState({
    employee_uuid: "",
    day_of_week: "MONDAY",
    slot_type: "MORNING",
    start_time: "09:00",
    end_time: "12:00",
    is_active: true,
  });

  const [copyFormData, setCopyFormData] = useState({
    employee_uuid: "",
    source_day_of_week: "MONDAY",
    apply_to_all_days: false,
    target_days: [],
  });

  // Fetch Business Profile to get business type
  const { data: profilesData } = useQuery({
    queryKey: ["businessProfiles"],
    queryFn: businessApi.getProfiles,
  });
  const profile = Array.isArray(profilesData)
    ? profilesData[0]
    : profilesData?.data?.[0] ||
      profilesData?.results?.[0] ||
      profilesData ||
      {};
  const currentBusinessType = profile?.business_type || "INDIVIDUAL";

  // Fetch Employees
  const {
    data: employeesData,
    isLoading: employeesLoading,
    error: employeesErrorObj,
  } = useQuery({
    queryKey: ["businessEmployees"],
    queryFn: async () => {
      const res = await businessApi.getEmployees();
      return res.data || res;
    },
    enabled: currentBusinessType !== "INDIVIDUAL",
    retry: false,
  });

  // Fetch Working Schedules
  const { data: schedulesData, isLoading: schedulesLoading } = useQuery({
    queryKey: ["workingSchedules"],
    queryFn: async () => {
      const res = await businessApi.getWorkingSchedules();
      return res.data || res;
    },
  });

  // Create Mutation
  const { mutate: createSchedule, isPending: isCreating } = useMutation({
    mutationFn: businessApi.createWorkingSchedule,
    onSuccess: () => {
      toast.success("Schedule slot created successfully");
      queryClient.invalidateQueries(["workingSchedules"]);
      closeModal();
    },
    onError: (err) =>
      toast.error(extractErrorMessage(err, "Failed to create slot")),
  });

  // Update Mutation
  const { mutate: updateSchedule, isPending: isUpdating } = useMutation({
    mutationFn: businessApi.updateWorkingSchedule,
    onSuccess: () => {
      toast.success("Schedule slot updated successfully");
      queryClient.invalidateQueries(["workingSchedules"]);
      closeModal();
    },
    onError: (err) =>
      toast.error(extractErrorMessage(err, "Failed to update slot")),
  });

  // Delete Mutation
  const { mutate: deleteSchedule, isPending: isDeleting } = useMutation({
    mutationFn: businessApi.deleteWorkingSchedule,
    onSuccess: () => {
      toast.success("Schedule slot deleted successfully");
      queryClient.invalidateQueries(["workingSchedules"]);
      setDeleteId(null);
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to delete slot"));
      setDeleteId(null);
    },
  });

  // Apply to Days Mutation
  const { mutate: applySlots, isPending: isApplying } = useMutation({
    mutationFn: businessApi.applySlotsToDays,
    onSuccess: (res) => {
      toast.success(res?.message || "Slots copied successfully");
      queryClient.invalidateQueries(["workingSchedules"]);
      closeCopyModal();
    },
    onError: (err) =>
      toast.error(extractErrorMessage(err, "Failed to copy slots")),
  });

  const allEmployees = Array.isArray(employeesData)
    ? employeesData
    : employeesData?.results?.filter((emp) => emp.is_active) || [];

  const allSchedules = Array.isArray(schedulesData)
    ? schedulesData
    : schedulesData?.results || [];

  const filteredSchedules = allSchedules.filter((slot) => {
    if (
      filters.day_of_week !== "ALL" &&
      slot.day_of_week !== filters.day_of_week
    )
      return false;
    if (filters.slot_type !== "ALL" && slot.slot_type !== filters.slot_type)
      return false;

    if (filters.status !== "ALL") {
      const isActive = filters.status === "ACTIVE";
      if (slot.is_active !== isActive) return false;
    }

    if (filters.employee_uuid !== "ALL") {
      if (filters.employee_uuid === "BUSINESS") {
        if (slot.employee_uuid || slot.employee) return false;
      } else {
        if (
          !slot.employee ||
          slot.employee.employee_uuid !== filters.employee_uuid
        )
          return false;
      }
    }

    return true;
  });

  // Employee Management Check
  if (
    currentBusinessType !== "INDIVIDUAL" &&
    employeesErrorObj?.response?.data?.detail?.includes(
      "Employee management is not available",
    )
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] max-w-lg mx-auto text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mb-6 border border-border-primary shadow-sm mx-auto">
          <AlertCircle className="w-8 h-8 text-zinc-500" />
        </div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight mb-2">
          Feature Not Available
        </h2>
        <p className="text-text-secondary font-medium leading-relaxed mb-6">
          Working schedules and employee management are not available for
          Individual businesses. Upgrade your business model to unlock team
          management features.
        </p>
      </div>
    );
  }

  if (
    (currentBusinessType !== "INDIVIDUAL" && employeesLoading) ||
    schedulesLoading
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
      </div>
    );
  }

  const openCopyModal = () => {
    setCopyFormData({
      employee_uuid: allEmployees[0]?.employee_uuid || "",
      source_day_of_week: "MONDAY",
      apply_to_all_days: false,
      target_days: [],
    });
    setCopyModalOpen(true);
  };

  const closeCopyModal = () => {
    setCopyModalOpen(false);
  };

  const handleCopySubmit = (e) => {
    e.preventDefault();
    if (currentBusinessType !== "INDIVIDUAL" && !copyFormData.employee_uuid) {
      return toast.error("Please select an employee");
    }

    if (
      !copyFormData.apply_to_all_days &&
      copyFormData.target_days.length === 0
    ) {
      return toast.error(
        "Please select at least one target day, or check 'Apply to all days'",
      );
    }

    const payload = {
      ...(currentBusinessType !== "INDIVIDUAL" && {
        employee_uuid: copyFormData.employee_uuid,
      }),
      source_day_of_week: copyFormData.source_day_of_week,
      apply_to_all_days: copyFormData.apply_to_all_days,
      target_days: copyFormData.target_days,
    };

    applySlots(payload);
  };

  const openModalForNew = () => {
    setEditingSlot(null);
    setFormData({
      employee_uuid: allEmployees[0]?.employee_uuid || "",
      day_of_week: "MONDAY",
      slot_type: "MORNING",
      start_time: "09:00",
      end_time: "12:00",
      is_active: true,
    });
    setModalOpen(true);
  };

  const openModalForEdit = (slot) => {
    setEditingSlot(slot);
    // Remove "Z" or seconds if present from time for standard time input (HH:mm)
    const formatTime = (timeStr) => timeStr?.substring(0, 5) || "09:00";
    setFormData({
      employee_uuid: slot?.employee?.employee_uuid,
      day_of_week: slot.day_of_week,
      slot_type: slot.slot_type,
      start_time: formatTime(slot.start_time),
      end_time: formatTime(slot.end_time),
      is_active: slot.is_active,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSlot(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBusinessType !== "INDIVIDUAL" && !formData.employee_uuid) {
      return toast.error("Please select an employee");
    }

    const payload = {
      ...(currentBusinessType !== "INDIVIDUAL" && {
        employee_uuid: formData.employee_uuid,
      }),
      day_of_week: formData.day_of_week,
      slot_type: formData.slot_type,
      start_time: `${formData.start_time}:00`,
      end_time: `${formData.end_time}:00`,
      is_active: formData.is_active,
    };

    if (editingSlot) {
      const { employee_uuid, ...updatePayload } = payload;
      const slotId =
        editingSlot.employee_working_schedule_uuid ||
        editingSlot.working_schedule_uuid ||
        editingSlot.uuid ||
        editingSlot.id;
      updateSchedule({
        id: slotId,
        data: updatePayload,
      });
    } else {
      createSchedule(payload);
    }
  };

  return (
    <div className="space-y-6 min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-text-primary flex items-center gap-2">
            <CalendarDays className="text-zinc-500" /> Working Schedules
          </h2>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            Manage availability slots for your employees.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCopyModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-sm border border-border-primary text-sm cursor-pointer"
          >
            <Copy size={16} /> Copy Schedule
          </button>
          <button
            onClick={openModalForNew}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md border border-zinc-700 text-sm cursor-pointer"
          >
            <Plus size={16} /> Add Slot
          </button>
        </div>
      </div>

      {/* Grid of Slots / Table */}
      {allSchedules.length === 0 ? (
        <div className="text-center py-16 bg-surface-primary rounded-3xl border border-border-primary border-dashed">
          <Clock className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            No schedules defined
          </h3>
          <p className="text-sm text-zinc-500 mb-6 max-w-sm mx-auto">
            You haven't set up any working slots for your employees yet. Click
            'Add Slot' to get started.
          </p>
          <button
            onClick={openModalForNew}
            className="btn-primary px-6 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md border border-zinc-700 text-sm cursor-pointer"
          >
            Add First Slot
          </button>
        </div>
      ) : (
        <div className="bg-surface-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-border-primary flex flex-wrap gap-4 items-center bg-surface-secondary/20">
            {currentBusinessType !== "INDIVIDUAL" && (
              <select
                value={filters.employee_uuid}
                onChange={(e) =>
                  setFilters({ ...filters, employee_uuid: e.target.value })
                }
                className="flex-1 min-w-[140px] px-4 py-2 bg-surface-primary border border-border-secondary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="ALL">All Employees</option>
                <option value="BUSINESS">Business Hours</option>
                {allEmployees.map((emp) => (
                  <option key={emp.employee_uuid} value={emp.employee_uuid}>
                    {emp.name}
                  </option>
                ))}
              </select>
            )}

            <select
              value={filters.day_of_week}
              onChange={(e) =>
                setFilters({ ...filters, day_of_week: e.target.value })
              }
              className="flex-1 min-w-[140px] px-4 py-2 bg-surface-primary border border-border-secondary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Days</option>
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={filters.slot_type}
              onChange={(e) =>
                setFilters({ ...filters, slot_type: e.target.value })
              }
              className="flex-1 min-w-[140px] px-4 py-2 bg-surface-primary border border-border-secondary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Times</option>
              {SLOT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="flex-1 min-w-[140px] px-4 py-2 bg-surface-primary border border-border-secondary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-zinc-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-secondary/30 text-zinc-500 border-b border-border-primary">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px]">
                    Employee
                  </th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px]">
                    Day
                  </th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px]">
                    Time
                  </th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px]">
                    Type
                  </th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px]">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                {filteredSchedules.map((slot) => {
                  const slotId =
                    slot.employee_working_schedule_uuid ||
                    slot.working_schedule_uuid ||
                    slot.uuid ||
                    slot.id;
                  return (
                    <tr
                      key={slotId}
                      className="hover:bg-surface-secondary/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center border border-border-secondary shrink-0">
                            <User size={14} className="text-zinc-500" />
                          </div>
                          <span className="font-bold text-text-primary">
                            {slot?.employee
                              ? slot.employee.name
                              : "Business Hours"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-text-primary">
                        {slot.day_of_week}
                      </td>
                      <td className="px-6 py-4 font-medium text-text-secondary">
                        {slot.start_time?.substring(0, 5)} -{" "}
                        {slot.end_time?.substring(0, 5)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-surface-secondary border border-border-secondary rounded-lg text-xs font-bold text-zinc-600">
                          {slot.slot_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                            slot.is_active
                              ? "bg-green-500/10 text-green-600"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {slot.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModalForEdit(slot)}
                            className="p-2 text-zinc-400 hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteId(slotId)}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredSchedules.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-500 font-medium">
                  No schedules found matching your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-primary rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border-primary">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                {editingSlot ? <Edit2 size={20} /> : <Plus size={20} />}
                {editingSlot ? "Edit Schedule Slot" : "Add Schedule Slot"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {currentBusinessType !== "INDIVIDUAL" && (
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
                    Employee
                  </label>
                  <div className="relative">
                    <select
                      value={formData.employee_uuid}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employee_uuid: e.target.value,
                        })
                      }
                      className="w-full bg-surface-secondary text-text-primary border border-border-primary rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-text-primary font-bold transition-all"
                    >
                      {allEmployees.length === 0 ? (
                        <option value="">No employees available</option>
                      ) : (
                        allEmployees.map((emp) => (
                          <option
                            key={emp.employee_uuid}
                            value={emp.employee_uuid}
                          >
                            {emp.name}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">
                    Day of Week
                  </label>
                  <select
                    value={formData.day_of_week}
                    onChange={(e) =>
                      setFormData({ ...formData, day_of_week: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">
                    Slot Type
                  </label>
                  <select
                    value={formData.slot_type}
                    onChange={(e) =>
                      setFormData({ ...formData, slot_type: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                  >
                    {SLOT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.start_time}
                    onChange={(e) =>
                      setFormData({ ...formData, start_time: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.end_time}
                    onChange={(e) =>
                      setFormData({ ...formData, end_time: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-text-primary focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-bold text-text-primary cursor-pointer"
                >
                  Slot is Active
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border-primary">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="btn-primary flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md text-sm disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isCreating || isUpdating ? (
                    <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Save Slot"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Copy Schedule Modal */}
      {copyModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-primary rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-xl font-black text-text-primary mb-6">
                Copy Schedule
              </h3>

              <form onSubmit={handleCopySubmit} className="space-y-5">
                {currentBusinessType !== "INDIVIDUAL" && (
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">
                      Select Employee
                    </label>
                    <select
                      value={copyFormData.employee_uuid}
                      onChange={(e) =>
                        setCopyFormData({
                          ...copyFormData,
                          employee_uuid: e.target.value,
                        })
                      }
                      className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                      required
                    >
                      {allEmployees.map((emp) => (
                        <option
                          key={emp.employee_uuid}
                          value={emp.employee_uuid}
                        >
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">
                    Source Day
                  </label>
                  <select
                    value={copyFormData.source_day_of_week}
                    onChange={(e) =>
                      setCopyFormData({
                        ...copyFormData,
                        source_day_of_week: e.target.value,
                      })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="applyToAllDays"
                    checked={copyFormData.apply_to_all_days}
                    onChange={(e) =>
                      setCopyFormData({
                        ...copyFormData,
                        apply_to_all_days: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-text-primary focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="applyToAllDays"
                    className="text-sm font-bold text-text-primary cursor-pointer"
                  >
                    Apply to all remaining days
                  </label>
                </div>

                {!copyFormData.apply_to_all_days && (
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">
                      Target Days
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {DAYS_OF_WEEK.filter(
                        (day) => day !== copyFormData.source_day_of_week,
                      ).map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 cursor-pointer bg-surface-secondary border border-border-primary rounded-lg px-3 py-2 hover:bg-zinc-200 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={copyFormData.target_days.includes(day)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCopyFormData({
                                  ...copyFormData,
                                  target_days: [
                                    ...copyFormData.target_days,
                                    day,
                                  ],
                                });
                              } else {
                                setCopyFormData({
                                  ...copyFormData,
                                  target_days: copyFormData.target_days.filter(
                                    (d) => d !== day,
                                  ),
                                });
                              }
                            }}
                            className="w-4 h-4 rounded text-text-primary focus:ring-0"
                          />
                          <span className="text-sm font-bold text-text-primary">
                            {day.substring(0, 3)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-border-primary">
                  <button
                    type="button"
                    onClick={closeCopyModal}
                    className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="btn-primary flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md text-sm disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer"
                  >
                    {isApplying ? (
                      <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteSchedule(deleteId)}
        title="Delete Schedule Slot"
        message="Are you sure you want to delete this working slot? It will be removed immediately and employees won't receive bookings in this time frame."
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SlotsTab;
