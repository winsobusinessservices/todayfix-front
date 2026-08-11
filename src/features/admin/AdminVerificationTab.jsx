import React, { useState } from "react";
import { ShieldCheck, X, FileText, CheckCircle } from "lucide-react";

// Mock data
const INITIAL_VENDORS = [
  { id: 1, name: "AC Experts", email: "contact@acexperts.com", status: "Pending", submittedDate: "Aug 10, 2026" },
  { id: 2, name: "Sparkle Clean", email: "hello@sparkle.in", status: "Pending", submittedDate: "Aug 11, 2026" },
];

const AdminVerificationTab = () => {
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleApprove = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
    setSelectedVendor(null);
    alert("Vendor Approved!");
  };

  const handleReject = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
    setSelectedVendor(null);
    alert("Vendor Rejected!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Pending Verifications</h2>
        <p className="text-text-secondary font-medium mt-1">Review and approve vendor business documents.</p>
      </div>

      <div className="bg-surface-primary border border-border-primary rounded-[1.5rem] overflow-hidden shadow-sm">
        {vendors.length === 0 ? (
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
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-surface-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-text-primary">{vendor.name}</p>
                    <p className="text-xs text-text-secondary">{vendor.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-secondary">{vendor.submittedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedVendor(vendor)}
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
              <p className="text-text-secondary font-medium">Vendor: <span className="font-bold text-text-primary">{selectedVendor.name}</span></p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
                  <div>
                    <p className="font-bold text-text-primary text-sm">Business Registration (GST/CIN)</p>
                    <p className="text-xs text-text-secondary">PDF • 2.4 MB</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-blue-500 hover:underline cursor-pointer">View</button>
              </div>

              <div className="p-4 rounded-xl border border-border-secondary flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center"><FileText size={20} /></div>
                  <div>
                    <p className="font-bold text-text-primary text-sm">Owner Identity Proof (Aadhar/PAN)</p>
                    <p className="text-xs text-text-secondary">JPG • 1.1 MB</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-blue-500 hover:underline cursor-pointer">View</button>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border-secondary">
              <button 
                onClick={() => handleReject(selectedVendor.id)}
                className="flex-1 py-3 text-red-500 bg-red-500/10 font-bold rounded-xl hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                Reject & Request Changes
              </button>
              <button 
                onClick={() => handleApprove(selectedVendor.id)}
                className="flex-[2] py-3 text-text-inverted bg-emerald-500 font-bold rounded-xl shadow-lg hover:bg-emerald-600 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle size={20} /> Approve Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerificationTab;
