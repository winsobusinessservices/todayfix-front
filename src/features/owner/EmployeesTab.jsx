import React, { useState } from "react";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import { Users, Plus, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import { validatePhone } from "../../utils/phoneValidator";

const EmployeesTab = () => {
  const queryClient = useQueryClient();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    is_active: true,
  });

  // Edit Modal
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    is_active: true,
  });

  const {
    data: employeesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["businessEmployees"],
    queryFn: () => businessApi.getEmployees(1),
    retry: false, // Do not retry on 403/400 errors
  });

  // Depending on how backend returns data (e.g. { count, results: [] } vs direct array)
  const employees =
    employeesData?.results || employeesData?.data || employeesData || [];

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationFn: businessApi.createEmployee,
    onSuccess: () => {
      toast.success("Employee added successfully!");
      queryClient.invalidateQueries(["businessEmployees"]);
      setNewEmployee({
        name: "",
        email: "",
        phone: "",
        is_active: true,
      });
      setIsAddModalOpen(false);
    },
    onError: () => toast.error("Failed to create employee"),
  });

  const { mutate: updateEmployee, isPending: isUpdating } = useMutation({
    mutationFn: businessApi.updateEmployee,
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      queryClient.invalidateQueries(["businessEmployees"]);
      setIsEditing(false);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to update employee"),
  });

  const { mutate: deleteEmployee, isPending: isDeleting } = useMutation({
    mutationFn: businessApi.deleteEmployee,
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      queryClient.invalidateQueries(["businessEmployees"]);
      setIsModalOpen(false);
      setSelectedRow(null);
    },
    onError: () => toast.error("Failed to delete employee"),
  });

  if (
    isError &&
    error?.response?.data?.detail?.includes(
      "not available for Individual businesses",
    )
  ) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-[60vh] text-center max-w-xl mx-auto">
        <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Users size={32} className="text-amber-500" />
        </div>
        <h2 className="text-3xl font-black text-text-primary tracking-tight mb-4">
          Feature Unavailable
        </h2>
        <p className="text-zinc-500 font-medium leading-relaxed">
          {error.response.data.detail}
          <br />
          <br />
          Currently, only <strong>Company</strong> and <strong>Investor</strong>{" "}
          accounts have access to the Employee Management tools.
        </p>
      </div>
    );
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
      return toast.error("Please fill all required fields");
    }

    const phoneErrors = validatePhone(newEmployee.phone);
    if (phoneErrors.length > 0) {
      return toast.error(`Phone number ${phoneErrors[0]}`);
    }

    createEmployee(newEmployee);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const phoneErrors = validatePhone(editEmployee.phone);
    if (phoneErrors.length > 0) {
      return toast.error(`Phone number ${phoneErrors[0]}`);
    }

    updateEmployee({
      id: selectedRow.employee_uuid,
      data: editEmployee,
    });
  };

  const handleDelete = () => {
    if (selectedRow) {
      deleteEmployee(selectedRow.employee_uuid);
    }
  };

  const columns = [
    {
      header: "Employee Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border-primary flex items-center justify-center shrink-0">
            <span className="font-bold text-text-primary text-sm">
              {row.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-bold text-text-primary text-sm">
              {row.name}
            </div>
            <div className="text-xs font-medium text-zinc-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Phone",
      accessor: "phone",
      render: (row) => (
        <div className="text-sm font-medium text-zinc-600">{row.phone}</div>
      ),
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (row) => (
        <StatusBadge status={row.is_active ? "Active" : "Inactive"} />
      ),
    },
    {
      header: "Added On",
      accessor: "created_at",
      render: (row) => (
        <div className="text-sm font-medium text-zinc-600">
          {row.created_at
            ? new Date(row.created_at).toLocaleDateString()
            : "N/A"}
        </div>
      ),
    },
    {
      header: "",
      accessor: "actions",
      render: (row) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-end pr-2 gap-2"
        >
          <button
            onClick={() => {
              setSelectedRow(row);
              setEditEmployee({
                name: row.name,
                email: row.email,
                phone: row.phone,
                is_active: row.is_active,
              });
              setIsEditing(true);
              setIsModalOpen(true);
            }}
            className="p-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-zinc-200 transition-colors"
            title="Edit Employee"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setSelectedRow(row);
              setIsEditing(false);
              setIsModalOpen(true);
            }}
            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            title="Delete Employee"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight flex items-center gap-2">
            <Users className="text-text-primary" />
            Employees
          </h2>
          <p className="text-sm font-medium text-zinc-500 mt-1">
            Manage your staff members and their system access.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-surface-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={employees}
            searchPlaceholder="Search employees by name, email, or phone..."
            onRowClick={(row) => {
              setSelectedRow(row);
              setEditEmployee({
                name: row.name,
                email: row.email,
                phone: row.phone,
                is_active: row.is_active,
              });
              setIsEditing(true);
              setIsModalOpen(true);
            }}
          />
        )}
      </div>

      {/* ADD EMPLOYEE MODAL */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Employee"
        icon={Plus}
      >
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
              value={newEmployee.phone}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, phone: e.target.value })
              }
              placeholder="+91 9876543210"
            />
          </div>

          <div className="pt-4 border-t border-border-primary flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 font-bold text-zinc-500 hover:text-text-primary transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-2.5 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isCreating ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* EDIT / DELETE MODAL */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        title={isEditing ? "Edit Employee" : "Delete Employee"}
        icon={Users}
      >
        {isEditing ? (
          <form onSubmit={handleUpdateSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
                  value={editEmployee.name}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
                  value={editEmployee.email}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-surface-secondary border border-border-primary rounded-xl focus:outline-none focus:border-text-primary font-medium text-text-primary"
                  value={editEmployee.phone}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <label className="flex items-center gap-3 p-3 bg-surface-secondary border border-border-primary rounded-xl cursor-pointer hover:border-text-primary transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-text-primary"
                    checked={editEmployee.is_active}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        is_active: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-bold text-text-primary">
                    Active Status
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-border-primary flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 font-bold text-zinc-500 hover:text-text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-2.5 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
              <p className="text-red-700 font-medium mb-2">
                Are you sure you want to delete{" "}
                <span className="font-bold">{selectedRow?.name}</span>?
              </p>
              <p className="text-sm text-red-600/80">
                This action is permanent and this employee will be completely
                removed from the system.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 font-bold text-zinc-500 hover:text-text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default EmployeesTab;
