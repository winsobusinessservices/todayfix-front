import { useState } from "react";
import {
  UserCheck,
  Users,
  Briefcase,
  ChevronRight,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "../../services/serviceApi";
import { businessApi } from "../../services/businessApi";
import toast from "react-hot-toast";

const extractErrorMessage = (error, defaultMsg) => {
  if (error?.response?.data) {
    const data = error.response.data;
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) {
      return data[firstKey][0];
    }
  }
  return defaultMsg;
};

const ServiceAssignmentsTab = () => {
  const queryClient = useQueryClient();
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [employeeToAssign, setEmployeeToAssign] = useState("");

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ["ownerServices"],
    queryFn: async () => {
      const res = await serviceApi.getBusinessServices();
      return res.data || res;
    },
  });

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

  const { data: assignedEmployeesData, isLoading: assignedLoading } = useQuery({
    queryKey: ["serviceEmployees", selectedServiceId],
    queryFn: async () => {
      const res = await serviceApi.getServiceEmployees({
        service_uuid: selectedServiceId,
      });
      return res.data || res;
    },
    enabled: !!selectedServiceId,
  });

  const { mutate: assignEmployee, isPending: isAssigning } = useMutation({
    mutationFn: serviceApi.assignEmployee,
    onSuccess: () => {
      toast.success("Employee assigned successfully!");
      queryClient.invalidateQueries(["serviceEmployees", selectedServiceId]);
      setEmployeeToAssign("");
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to assign employee"));
    },
  });

  const { mutate: removeEmployee, isPending: isRemoving } = useMutation({
    mutationFn: serviceApi.removeEmployee,
    onSuccess: () => {
      toast.success("Employee removed successfully!");
      queryClient.invalidateQueries(["serviceEmployees", selectedServiceId]);
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to remove employee"));
    },
  });

  const allServices = Array.isArray(servicesData)
    ? servicesData
    : servicesData?.data || [];

  const allEmployees = employeesData?.results?.filter((emp) => emp.is_active) || [];

  const assignedEmployees = Array.isArray(assignedEmployeesData)
    ? assignedEmployeesData
    : assignedEmployeesData?.results || [];

  const handleAssign = (e) => {
    e.preventDefault();
    if (!employeeToAssign) return toast.error("Please select an employee");
    assignEmployee({
      service_uuid: selectedServiceId,
      employee_uuid: employeeToAssign,
    });
  };

  const selectedService = allServices.find(
    (s) => s.service_uuid === selectedServiceId,
  );
  const assignedUuids = assignedEmployees.map((ae) => ae.employee_uuid);
  const availableEmployees = allEmployees.filter(
    (emp) => !assignedUuids.includes(emp.employee_uuid),
  );

  if (servicesLoading || employeesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
      </div>
    );
  }

  // Handle Individual Business Model Restriction
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
          Employee management is not available for Individual businesses.
          Upgrade your business model to Company or Investor to unlock team
          management, assign tasks, and grow your workforce.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col md:flex-row gap-6">
      {/* Left Pane: Services List */}
      <div className="w-full md:w-1/3 flex flex-col bg-surface-primary rounded-3xl border border-border-primary shadow-sm overflow-hidden h-fit min-h-80">
        <div className="p-6 border-b border-border-primary shrink-0">
          <h2 className="text-xl font-black text-text-primary tracking-tight flex items-center gap-2">
            <Briefcase size={20} className="text-zinc-500" /> Services
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Select a service to manage its staff.
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {allServices.length === 0 ? (
            <div className="text-center text-zinc-500 py-10 font-medium">
              No services found.
            </div>
          ) : (
            allServices.map((service) => (
              <button
                key={service.service_uuid}
                onClick={() => {
                  setSelectedServiceId(service.service_uuid);
                  setEmployeeToAssign("");
                }}
                className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border cursor-pointer ${
                  selectedServiceId === service.service_uuid
                    ? "bg-surface-dark text-text-inverted border-transparent shadow-lg scale-[0.98]"
                    : "bg-surface-secondary text-text-primary border-border-primary hover:border-zinc-400"
                }`}
              >
                <div>
                  <h3 className="font-bold text-sm">{service.name}</h3>
                  {service.subcategory?.name && (
                    <p
                      className={`text-xs mt-1 ${selectedServiceId === service.service_uuid ? "text-zinc-300" : "text-zinc-500"}`}
                    >
                      {service.subcategory.name}
                    </p>
                  )}
                </div>
                <ChevronRight
                  size={18}
                  className={
                    selectedServiceId === service.service_uuid
                      ? "text-text-inverted"
                      : "text-zinc-400"
                  }
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Pane: Assignment Details */}
      <div className="w-full md:w-2/3 flex flex-col bg-surface-primary rounded-3xl border border-border-primary shadow-sm overflow-hidden h-fit min-h-80">
        {!selectedServiceId ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center p-10">
            <div className="w-20 h-20 bg-surface-secondary border border-border-primary rounded-full flex items-center justify-center mb-4 shadow-inner">
              <UserCheck size={32} className="text-zinc-400" />
            </div>
            <h3 className="text-xl font-black text-text-primary mb-2">
              No Service Selected
            </h3>
            <p className="text-zinc-500 font-medium max-w-sm">
              Choose a service from the left menu to view or assign employees to
              it.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-border-primary shrink-0 bg-surface-secondary/30">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                {selectedService?.name}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-bold text-zinc-500 bg-surface-secondary px-3 py-1 rounded-full border border-border-primary">
                  Requires {selectedService?.required_employees} staff
                </span>
                <span className="text-sm font-bold text-zinc-500 bg-surface-secondary px-3 py-1 rounded-full border border-border-primary flex items-center gap-1.5">
                  <Users size={14} />
                  {assignedEmployees.length} currently assigned
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {/* Assign Form */}
              <div className="bg-surface-secondary p-5 rounded-2xl border border-border-primary">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
                  Assign New Employee
                </h3>
                <form
                  onSubmit={handleAssign}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <select
                    value={employeeToAssign}
                    onChange={(e) => setEmployeeToAssign(e.target.value)}
                    className="flex-1 bg-surface-primary border border-border-primary rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-text-primary transition-colors appearance-none"
                  >
                    <option value="" disabled>
                      Select an available employee...
                    </option>
                    {availableEmployees.map((emp) => (
                      <option key={emp.employee_uuid} value={emp.employee_uuid}>
                        {emp.name} ({emp.phone})
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={isAssigning || !employeeToAssign}
                    className="px-6 py-3 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  >
                    {isAssigning ? "Assigning..." : "Assign to Service"}
                  </button>
                </form>
                {availableEmployees.length === 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-orange-500 bg-orange-50 p-2 rounded-lg border border-orange-200">
                    <AlertCircle size={14} />
                    All active employees are already assigned to this service.
                  </div>
                )}
              </div>

              {/* Assigned Employees List */}
              <div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <UserCheck size={16} /> Assigned Staff
                </h3>
                {assignedLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-text-primary"></div>
                  </div>
                ) : assignedEmployees.length === 0 ? (
                  <div className="text-center py-10 bg-surface-secondary rounded-2xl border border-dashed border-border-primary">
                    <p className="text-zinc-500 font-medium">
                      No employees assigned yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assignedEmployees.map((ae) => {
                      // Attempt to enrich with employee details from the main list
                      const fullEmp = allEmployees.find(
                        (e) => e.employee_uuid === ae.employee_uuid,
                      );
                      const dispName =
                        ae.employee_name || fullEmp?.name || "Unknown Employee";

                      return (
                        <div
                          key={ae.employee_uuid}
                          className="flex items-center justify-between gap-4 p-4 bg-surface-primary border border-border-primary rounded-2xl shadow-sm group"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border-primary flex items-center justify-center shrink-0">
                              <span className="font-bold text-text-primary text-sm">
                                {dispName.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-text-primary text-sm truncate">
                                {dispName}
                              </h4>
                              <p className="text-xs font-medium text-zinc-500 truncate">
                                {fullEmp?.phone || "Assigned"}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              removeEmployee({
                                service_uuid: selectedServiceId,
                                employee_uuid: ae.employee_uuid,
                              })
                            }
                            disabled={isRemoving}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Remove Employee"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceAssignmentsTab;
