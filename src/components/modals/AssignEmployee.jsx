import React, { useState } from "react";
import { motion } from "framer-motion";
import { XCircle, UserCheck } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "../../services/employeeApi";
import { bookingApi } from "../../services/bookingApi";
import toast from "react-hot-toast";

const AssignEmployee = ({ activeModal, setActiveModal }) => {
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const { data: employeesData, isLoading } = useQuery({
    queryKey: ["businessEmployees"],
    queryFn: employeeApi.getEmployees,
  });

  const employees = employeesData?.results || employeesData || [];

  const { mutate: assignEmployee, isPending } = useMutation({
    mutationFn: ({ bookingId, employeeId }) =>
      bookingApi.assignEmployee(bookingId, employeeId),
    onSuccess: () => {
      toast.success("Employee assigned successfully!");
      queryClient.invalidateQueries(["businessBookings"]);
      setActiveModal(null);
    },
    onError: () => toast.error("Failed to assign employee"),
  });

  const handleAssign = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    assignEmployee({
      bookingId: activeModal.bookingId,
      employeeId: selectedEmployee,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md bg-surface-primary rounded-3xl overflow-hidden shadow-2xl border border-border-primary"
      >
        <div className="p-6 border-b border-border-primary flex justify-between items-center bg-surface-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-text-primary">
                Assign Employee
              </h2>
              <p className="text-xs font-medium text-zinc-500">
                Select an employee for this job
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-zinc-400 hover:text-text-primary hover:bg-surface-dark rounded-full transition-colors cursor-pointer"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-6">
              <span className="w-6 h-6 border-2 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
            </div>
          ) : employees.length === 0 ? (
            <div className="text-center py-6 text-zinc-500">
              No employees found. Please add employees first.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Select Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-text-primary font-medium"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.employee_uuid || emp.id} value={emp.employee_uuid || emp.id}>
                      {emp.user?.first_name} {emp.user?.last_name} ({emp.role || "Employee"})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAssign}
                disabled={isPending || !selectedEmployee}
                className="w-full py-3.5 bg-purple-600 text-white font-black text-lg rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {isPending ? "Assigning..." : "Assign Job"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssignEmployee;
