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
import { ArrowRight, Building2, User } from "lucide-react";

const AdminUpgradesTab = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectingState, setIsRejectingState] = useState(false);

  const fetchUpgradeRequests = async () => {
    let statusParam = activeTab;
    if (activeTab === "all") statusParam = "";
    return await adminApi.getUpgradeRequests(statusParam.toUpperCase());
  };

  const { data: requestsData, isLoading } = useQuery({
    queryKey: ["upgradeRequests", activeTab],
    queryFn: fetchUpgradeRequests,
  });

  const requests = requestsData?.data || requestsData?.results || [];

  const { mutate: approveReq, isPending: isApproving } = useMutation({
    mutationFn: adminApi.approveUpgradeRequest,
    onSuccess: () => {
      toast.success("Upgrade request approved successfully!");
      queryClient.invalidateQueries(["upgradeRequests"]);
      setIsModalOpen(false);
      setSelectedRequest(null);
    },
    onError: () => toast.error("Failed to approve upgrade request"),
  });

  const { mutate: rejectReq, isPending: isRejecting } = useMutation({
    mutationFn: ({ id, reason }) => adminApi.rejectUpgradeRequest(id, reason),
    onSuccess: () => {
      toast.success("Upgrade request rejected.");
      queryClient.invalidateQueries(["upgradeRequests"]);
      setIsModalOpen(false);
      setSelectedRequest(null);
      setRejectionReason("");
      setIsRejectingState(false);
    },
    onError: () => toast.error("Failed to reject upgrade request"),
  });

  const handleApprove = () => {
    if (selectedRequest)
      approveReq(selectedRequest.business_upgrade_request_uuid);
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    if (selectedRequest) {
      rejectReq({
        id: selectedRequest.business_upgrade_request_uuid,
        reason: rejectionReason,
      });
    }
  };

  const columns = [
    {
      header: "Business Name",
      accessor: "business_name",
      render: (row) => (
        <span className="font-bold text-text-primary text-sm">
          {row.business_name || "N/A"}
        </span>
      ),
    },
    {
      header: "Upgrade Requested",
      accessor: "requested_business_type",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary line-through">
            {row.current_business_type}
          </span>
          <ArrowRight size={14} className="text-text-secondary" />
          <span className="text-sm font-bold text-indigo-500">
            {row.requested_business_type}
          </span>
        </div>
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
          Business Upgrades
        </h2>
        <p className="text-text-secondary font-medium mt-1">
          Review and approve requests for businesses upgrading their plans.
        </p>
      </div>

      <div className="flex gap-2 p-1.5 bg-surface-secondary border border-border-primary rounded-xl w-fit">
        {["all", "pending", "approved", "rejected"].map((tab) => (
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
          data={requests}
          searchPlaceholder="Search upgrade requests..."
          onRowClick={(row) => {
            setSelectedRequest(row);
            setIsRejectingState(false);
            setRejectionReason("");
            setIsModalOpen(true);
          }}
          onActionClick={(row) => {
            setSelectedRequest(row);
            setIsRejectingState(false);
            setRejectionReason("");
            setIsModalOpen(true);
          }}
        />
      )}

      {selectedRequest && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
            setIsRejectingState(false);
            setRejectionReason("");
          }}
          title="Review Upgrade Request"
          footer={
            selectedRequest.status === "PENDING" ? (
              isRejectingState ? (
                <div className="flex gap-2 w-full justify-end">
                  <button
                    className="px-4 py-2 font-bold text-text-secondary hover:bg-surface-secondary rounded-lg"
                    onClick={() => setIsRejectingState(false)}
                    disabled={isRejecting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectSubmit}
                    disabled={isRejecting}
                    className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl shadow-md hover:scale-[0.98] transition-transform flex items-center justify-center min-w-[100px]"
                  >
                    {isRejecting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Confirm Reject"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 w-full justify-end">
                  <button
                    className="px-4 py-2 font-bold text-red-500 hover:bg-red-500/10 rounded-lg"
                    onClick={() => setIsRejectingState(true)}
                  >
                    Reject Request
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="px-6 py-2 bg-green-500 text-white font-bold rounded-xl shadow-md hover:scale-[0.98] transition-transform flex items-center justify-center min-w-[100px]"
                  >
                    {isApproving ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Approve Request"
                    )}
                  </button>
                </div>
              )
            ) : null
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-secondary border border-border-primary rounded-2xl">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Current Type
                </p>
                <p className="font-medium text-text-primary">
                  {selectedRequest.current_business_type}
                </p>
              </div>
              <div className="p-4 bg-surface-secondary border border-border-primary rounded-2xl">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">
                  Requested Type
                </p>
                <p className="font-medium text-indigo-500">
                  {selectedRequest.requested_business_type}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-secondary border border-border-primary rounded-2xl space-y-3">
              <h4 className="font-bold text-text-primary">Options Requested</h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">
                  Keep Employees & Schedules
                </span>
                <span
                  className={`font-bold ${selectedRequest.keep_employees_and_schedules ? "text-green-500" : "text-red-500"}`}
                >
                  {selectedRequest.keep_employees_and_schedules ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">
                  Bank Details Changed
                </span>
                <span
                  className={`font-bold ${selectedRequest.bank_details_changed ? "text-amber-500" : "text-text-secondary"}`}
                >
                  {selectedRequest.bank_details_changed ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {isRejectingState && (
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-2 animate-in slide-in-from-top-2">
                <label className="text-sm font-bold text-red-500">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this request is being rejected..."
                  className="w-full bg-surface-primary border border-border-primary rounded-xl p-3 text-text-primary text-sm focus:outline-none focus:border-red-500 transition-colors"
                  rows={3}
                />
              </div>
            )}

            {selectedRequest.status === "REJECTED" &&
              selectedRequest.rejection_reason && (
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-2">
                  <label className="text-sm font-bold text-red-500">
                    Rejection Reason
                  </label>
                  <p className="text-sm text-text-primary">
                    {selectedRequest.rejection_reason}
                  </p>
                </div>
              )}
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminUpgradesTab;
