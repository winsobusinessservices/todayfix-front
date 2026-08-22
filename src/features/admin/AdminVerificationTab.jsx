import React, { useState } from "react";
import { ShieldCheck, X, FileText, CheckCircle } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const AdminVerificationTab = () => {
  const queryClient = useQueryClient();
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { data: applicationsData, isLoading } = useQuery({
    queryKey: ["businessApplications"],
    queryFn: adminApi.getBusinessApplications,
  });

  const applications = applicationsData?.results || applicationsData || [];

  const { mutate: approveApp, isPending: isApproving } = useMutation({
    mutationFn: adminApi.approveApplication,
    onSuccess: () => {
      toast.success("Application approved successfully!");
      queryClient.invalidateQueries(["businessApplications"]);
      setSelectedVendor(null);
    },
    onError: () => toast.error("Failed to approve application"),
  });

  const { mutate: rejectApp, isPending: isRejecting } = useMutation({
    mutationFn: (id) => adminApi.rejectApplication(id, "Rejected by admin"),
    onSuccess: () => {
      toast.success("Application rejected.");
      queryClient.invalidateQueries(["businessApplications"]);
      setSelectedVendor(null);
    },
    onError: () => toast.error("Failed to reject application"),
  });

  const handleApprove = (id) => approveApp(id);
  const handleReject = (id) => rejectApp(id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Pending Verifications</h2>
        <p className="text-text-secondary font-medium mt-1">Review and approve vendor business documents.</p>
      </div>

      <div className="bg-surface-primary border border-border-primary rounded-[1.5rem] overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-text-secondary font-medium">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-text-secondary font-medium">
            No pending verifications. All caught up!
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-surface-secondary border-b border-border-secondary text-xs uppercase tracking-wider font-bold text-zinc-500">
              <tr>
                <th className="px-6 py-4">Business Name</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {applications.map((app) => (
                <tr key={app.application_uuid} className="hover:bg-surface-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-text-primary">{app.business_type === 'INDIVIDUAL' ? `${app.user?.first_name} ${app.user?.last_name}` : 'Company/Investor'}</p>
                    <p className="text-xs text-text-secondary">{app.user?.email || 'N/A'}</p>
                    <span className="inline-block px-2 py-0.5 mt-1 rounded bg-surface-secondary text-[10px] font-bold text-zinc-400">{app.business_type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-secondary">
                    {dayjs(app.created_at).format("MMM D, YYYY")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedVendor(app)}
                      className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:scale-[0.98] transition-transform cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Review Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-primary rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setSelectedVendor(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer">
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-black text-text-primary tracking-tight mb-1">Review Documents</h3>
              <p className="text-text-secondary font-medium">Vendor: <span className="font-bold text-text-primary">{selectedVendor.business_type === 'INDIVIDUAL' ? `${selectedVendor.user?.first_name} ${selectedVendor.user?.last_name}` : 'Company/Investor'}</span></p>
            </div>

            <div className="space-y-4 mb-8">
              {selectedVendor.pan_document && (
                <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">PAN Document</p>
                      <p className="text-xs text-text-secondary">{selectedVendor.pan_number}</p>
                    </div>
                  </div>
                  <a href={selectedVendor.pan_document} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-500 hover:underline cursor-pointer">View</a>
                </div>
              )}

              {selectedVendor.aadhaar_document && (
                <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">Aadhaar Document</p>
                      <p className="text-xs text-text-secondary">{selectedVendor.aadhaar_number}</p>
                    </div>
                  </div>
                  <a href={selectedVendor.aadhaar_document} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-500 hover:underline cursor-pointer">View</a>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border-secondary">
              <button 
                onClick={() => handleReject(selectedVendor.application_uuid)}
                disabled={isRejecting || isApproving}
                className="flex-1 py-3 text-red-500 bg-red-500/10 font-bold rounded-xl hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isRejecting ? "Rejecting..." : "Reject & Request Changes"}
              </button>
              <button 
                onClick={() => handleApprove(selectedVendor.application_uuid)}
                disabled={isRejecting || isApproving}
                className="flex-[2] py-3 text-text-inverted bg-emerald-500 font-bold rounded-xl shadow-lg hover:bg-emerald-600 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle size={20} /> {isApproving ? "Approving..." : "Approve Vendor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerificationTab;
