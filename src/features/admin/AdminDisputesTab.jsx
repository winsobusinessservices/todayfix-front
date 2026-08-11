import React, { useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

// Mock data
const INITIAL_DISPUTES = [
  { id: "DISP-101", user: "Alice Walker", vendor: "Sparkle Clean", issue: "Unprofessional Behavior", date: "Aug 12, 2026", status: "Open" },
  { id: "DISP-102", user: "Bob Builder", vendor: "FixIt All", issue: "Overcharged", date: "Aug 10, 2026", status: "Resolved" },
];

const AdminDisputesTab = () => {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState(null);

  const handleResolve = (id) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, status: "Resolved" } : d));
    setSelectedDispute(null);
    alert("Dispute marked as resolved.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Disputes & Issues</h2>
        <p className="text-text-secondary font-medium mt-1">Review issues reported by users and mediate with vendors.</p>
      </div>

      <div className="bg-surface-primary border border-border-primary rounded-[1.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-secondary border-b border-border-secondary text-xs uppercase tracking-wider font-bold text-zinc-500">
            <tr>
              <th className="px-6 py-4">Issue Details</th>
              <th className="px-6 py-4">Parties Involved</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {disputes.map((dispute) => (
              <tr key={dispute.id} className="hover:bg-surface-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-text-primary flex items-center gap-2">
                    {dispute.status === "Open" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {dispute.issue}
                  </p>
                  <p className="text-xs text-text-secondary">{dispute.id} • {dispute.date}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-text-primary">User: {dispute.user}</p>
                  <p className="text-xs text-text-secondary">Vendor: {dispute.vendor}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    dispute.status === "Open" 
                      ? "bg-red-500/10 text-red-600 border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  }`}>
                    {dispute.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedDispute(dispute)}
                    className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:scale-[0.98] transition-transform cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-primary rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setSelectedDispute(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer">
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-black text-text-primary tracking-tight mb-1">Dispute Details</h3>
              <p className="text-text-secondary font-medium">{selectedDispute.id}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-surface-secondary rounded-xl border border-border-secondary">
                <p className="text-sm font-bold text-text-secondary mb-1">Issue Reported</p>
                <p className="font-bold text-text-primary">{selectedDispute.issue}</p>
                <p className="text-sm text-text-secondary mt-2">"The vendor was very rude and demanded extra money outside the app. I refused and he left the work half done."</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-secondary rounded-xl border border-border-secondary">
                  <p className="text-sm font-bold text-text-secondary mb-1">User</p>
                  <p className="font-bold text-text-primary">{selectedDispute.user}</p>
                </div>
                <div className="p-4 bg-surface-secondary rounded-xl border border-border-secondary">
                  <p className="text-sm font-bold text-text-secondary mb-1">Vendor</p>
                  <p className="font-bold text-text-primary">{selectedDispute.vendor}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border-secondary">
              <button 
                onClick={() => setSelectedDispute(null)}
                className="flex-1 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedDispute.status === "Open" && (
                <button 
                  onClick={() => handleResolve(selectedDispute.id)}
                  className="flex-[2] py-3 text-text-inverted bg-emerald-500 font-bold rounded-xl shadow-lg hover:bg-emerald-600 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle size={20} /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDisputesTab;
