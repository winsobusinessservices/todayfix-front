import { useState } from "react";
import {
  CalendarDays,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  User,
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
  const [editingSlot, setEditingSlot] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    employee_uuid: "",
    day_of_week: "MONDAY",
    slot_type: "MORNING",
    start_time: "09:00",
    end_time: "12:00",
    is_active: true,
  });

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

  const allEmployees = Array.isArray(employeesData)
    ? employeesData
    : employeesData?.results.filter((emp) => emp.is_active) || [];

  const allSchedules = Array.isArray(schedulesData)
    ? schedulesData
    : schedulesData?.results || [];

  // Individual Business Check
  if (
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

  if (employeesLoading || schedulesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
      </div>
    );
  }

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
    if (!formData.employee_uuid) {
      return toast.error("Please select an employee");
    }

    const payload = {
      ...formData,
      // Optional: Add seconds back for backend if required
      start_time: `${formData.start_time}:00`,
      end_time: `${formData.end_time}:00`,
    };

    if (editingSlot) {
      // Backend does not allow changing the provider when updating.
      const { employee_uuid, ...updatePayload } = payload;
      updateSchedule({
        id: editingSlot.employee_working_schedule_uuid,
        data: updatePayload,
      });
    } else {
      createSchedule(payload);
    }
  };

  return (
    <div className="space-y-6 min-h-[60vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-text-primary flex items-center gap-2">
            <CalendarDays className="text-zinc-500" /> Working Schedules
          </h2>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            Manage availability slots for your employees.
          </p>
        </div>
        <button
          onClick={openModalForNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md border border-zinc-700 text-sm cursor-pointer"
        >
          <Plus size={16} /> Add Slot
        </button>
      </div>

      {/* Grid of Slots */}
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
            className="px-6 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md border border-zinc-700 text-sm cursor-pointer"
          >
            Add First Slot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSchedules.map((slot) => {
            const employee = allEmployees.find(
              (emp) =>
                emp.employee_uuid === (slot?.employee?.employee_uuid || slot.employee),
            );
            return (
              <div
                key={slot.employee_working_schedule_uuid}
                className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center border border-border-secondary shrink-0">
                      <User size={18} className="text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm line-clamp-1">
                        {slot ? `${slot?.employee?.name}` : "Unknown Employee"}
                      </h4>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                          slot.is_active
                            ? "bg-green-500/10 text-green-600"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {slot.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModalForEdit(slot)}
                      className="p-1.5 text-zinc-400 hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteId(slot.employee_working_schedule_uuid)
                      }
                      className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 bg-surface-secondary/50 rounded-xl p-4 border border-border-secondary">
                  <div className="flex justify-start gap-3 items-center text-sm">
                    <span className="text-zinc-500 font-medium">Day</span>
                    <span className="font-bold text-text-primary">
                      {slot.day_of_week}
                    </span>
                  </div>
                  <div className="flex justify-start gap-3 items-center text-sm">
                    <span className="text-zinc-500 font-medium">Type</span>
                    <span className="font-bold text-text-primary">
                      {slot.slot_type}
                    </span>
                  </div>
                  <div className="flex justify-start gap-3 items-center text-sm">
                    <span className="text-zinc-500 font-medium">Time</span>
                    <span className="font-bold text-text-primary">
                      {slot.start_time?.substring(0, 5)} -{" "}
                      {slot.end_time?.substring(0, 5)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Employee
                </label>
                <select
                  required
                  disabled={!!editingSlot}
                  value={formData.employee_uuid}
                  onChange={(e) =>
                    setFormData({ ...formData, employee_uuid: e.target.value })
                  }
                  className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {allEmployees.map((emp) => (
                    <option key={emp.employee_uuid} value={emp.employee_uuid}>
                      {emp?.name}
                    </option>
                  ))}
                </select>
              </div>

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
                  className="flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md text-sm disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer"
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
