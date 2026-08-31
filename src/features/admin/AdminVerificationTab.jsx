import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import { FileText, Building2, User } from "lucide-react";

const AdminVerificationTab = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectingState, setIsRejectingState] = useState(false); // To toggle reason input

  const fetchApplications = async () => {
    switch (activeTab) {
      case "pending":
        return await adminApi.getPendingApplications();
      case "accepted":
        return await adminApi.getAcceptedApplications();
      case "rejected":
        return await adminApi.getRejectedApplications();
      case "all":
      default:
        return await adminApi.getBusinessApplications();
    }
  };

  const { data: applicationsData, isLoading } = useQuery({
    queryKey: ["businessApplications", activeTab],
    queryFn: fetchApplications,
  });

  const applications = applicationsData?.data || [];

  const { mutate: approveApp, isPending: isApproving } = useMutation({
    mutationFn: adminApi.approveApplication,
    onSuccess: () => {
      toast.success("Application approved successfully!");
      queryClient.invalidateQueries(["businessApplications"]);
      setIsModalOpen(false);
      setSelectedVendor(null);
    },
    onError: () => toast.error("Failed to approve application"),
  });

  const { mutate: rejectApp, isPending: isRejecting } = useMutation({
    mutationFn: ({ id, reason }) => adminApi.rejectApplication(id, reason),
    onSuccess: () => {
      toast.success("Application rejected.");
      queryClient.invalidateQueries(["businessApplications"]);
      setIsModalOpen(false);
      setSelectedVendor(null);
      setRejectionReason("");
      setIsRejectingState(false);
    },
    onError: () => toast.error("Failed to reject application"),
  });

  const handleApprove = () => {
    if (selectedVendor) approveApp(selectedVendor.business_application_uuid);
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    if (selectedVendor) {
      rejectApp({
        id: selectedVendor.business_application_uuid,
        reason: rejectionReason,
      });
    }
  };

  const columns = [
    {
      header: "Business Type",
      accessor: "business_type",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-purple-500">
            {row.business_type === "INDIVIDUAL" ? (
              <User size={16} />
            ) : (
              <Building2 size={16} />
            )}
          </div>
          <div>
            <p className="font-bold text-text-primary text-sm">
              {row.business_type}
            </p>
            <p className="text-xs text-text-secondary">
              {row.location || "N/A"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "user_email",
      render: (row) => (
        <span className="text-sm font-medium text-text-secondary">
          {row.user_email || "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Submitted",
      accessor: "created_at",
      render: (row) => (
        <span className="text-sm font-medium text-text-secondary">
          {dayjs(row.created_at).format("MMM D, YYYY")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">
          Business Applications
        </h2>
        <p className="text-text-secondary font-medium mt-1">
          Review and approve vendor business documents.
        </p>
      </div>

      <div className="flex gap-2 p-1.5 bg-surface-secondary border border-border-primary rounded-xl w-fit">
        {["all", "pending", "accepted", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsRejectingState(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-surface-primary text-text-primary shadow-sm"
                : "text-zinc-500 hover:text-text-primary hover:bg-surface-primary/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12 bg-surface-primary border border-border-primary rounded-[1.25rem]">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={applications}
          searchPlaceholder="Search applications..."
          onRowClick={(row) => {
            setSelectedVendor(row);
            setIsRejectingState(false);
            setRejectionReason("");
            setIsModalOpen(true);
          }}
          onActionClick={(row) => {
            setSelectedVendor(row);
            setIsRejectingState(false);
            setRejectionReason("");
            setIsModalOpen(true);
          }}
        />
      )}

      {selectedVendor && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVendor(null);
            setIsRejectingState(false);
            setRejectionReason("");
          }}
          title="Review Application"
          footer={
            selectedVendor.status === "PENDING" ? (
              isRejectingState ? (
                <div className="flex gap-2 w-full justify-end">
                  <button
                    onClick={() => setIsRejectingState(false)}
                    className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectSubmit}
                    disabled={isRejecting}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isRejecting ? "Rejecting..." : "Confirm Rejection"}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRejectingState(true)}
                    className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 cursor-pointer"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isApproving ? "Approving..." : "Approve Application"}
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Close
              </button>
            )
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface-secondary p-4 rounded-xl border border-border-secondary">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Status
                </p>
                <StatusBadge status={selectedVendor.status} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Email
                </p>
                <p className="font-semibold">
                  {selectedVendor.user_email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Business Type
                </p>
                <p className="font-semibold">{selectedVendor.business_type}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Location
                </p>
                <p className="font-semibold">
                  {selectedVendor.location || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Identity / PAN / Registration
                </p>
                <p className="font-semibold break-all">
                  {typeof selectedVendor.identity === "object" &&
                  selectedVendor.identity !== null
                    ? `PAN: ${selectedVendor.identity.pan_number || "N/A"} | Aadhaar: ${selectedVendor.identity.aadhaar_number || "N/A"}`
                    : selectedVendor.identity || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-zinc-400 font-bold uppercase mb-1">
                  Bank Account
                </p>
                <p className="font-semibold break-all">
                  {typeof selectedVendor.bank_account === "object" &&
                  selectedVendor.bank_account !== null
                    ? `A/C: ${selectedVendor.bank_account.account_number || "N/A"} | IFSC: ${selectedVendor.bank_account.ifsc_code || "N/A"}`
                    : selectedVendor.bank_account || "N/A"}
                </p>
              </div>
            </div>

            {selectedVendor.status === "REJECTED" &&
              selectedVendor.rejection_reason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs text-red-500 font-bold uppercase mb-1">
                    Rejection Reason
                  </p>
                  <p className="text-sm font-semibold text-red-700">
                    {selectedVendor.rejection_reason}
                  </p>
                </div>
              )}

            <div className="space-y-4">
              <h4 className="font-bold text-text-primary text-sm">
                Uploaded Documents
              </h4>
              {/* Assuming identity field holds document details or there are actual fields like pan_document */}
              {selectedVendor.identity?.pan_document && (
                <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between hover:border-purple-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">
                        PAN Document
                      </p>
                      <p className="text-xs text-text-secondary">
                        Click to view
                      </p>
                    </div>
                  </div>
                  <a
                    href={selectedVendor.identity.pan_document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-blue-500 hover:underline cursor-pointer"
                  >
                    View
                  </a>
                </div>
              )}
              {selectedVendor.identity?.aadhaar_document && (
                <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between hover:border-purple-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">
                        Aadhaar Document
                      </p>
                      <p className="text-xs text-text-secondary">
                        Click to view
                      </p>
                    </div>
                  </div>
                  <a
                    href={selectedVendor.identity.aadhaar_document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-blue-500 hover:underline cursor-pointer"
                  >
                    View
                  </a>
                </div>
              )}
              {!selectedVendor.identity?.pan_document &&
                !selectedVendor.identity?.aadhaar_document && (
                  <p className="text-sm text-text-secondary italic">
                    No documents uploaded or parsed from response.
                  </p>
                )}
            </div>

            {isRejectingState && (
              <div className="space-y-2 pt-4 border-t border-border-secondary animate-in slide-in-from-bottom-2">
                <label className="text-sm font-bold text-text-primary">
                  Reason for Rejection *
                </label>
                <textarea
                  placeholder="Explain why this application is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-red-500 min-h-[100px]"
                />
                <p className="text-xs text-zinc-500">
                  This reason will be visible to the applicant.
                </p>
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminVerificationTab;
