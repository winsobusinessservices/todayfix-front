import React, { useState } from "react";
import { X, RadioTower, CheckCircle2 } from "lucide-react";

// Mock data to simulate incoming user requests
const INITIAL_REQUESTS = [
  { id: "REQ-001", user: "Jane Doe", service: "Deep Home Cleaning", location: "Koramangala, Bengaluru", date: "Aug 15, 2026", status: "Pending Broadcast", payout: "₹2500" },
  { id: "REQ-002", user: "John Smith", service: "Plumbing Fix", location: "Indiranagar, Bengaluru", date: "Aug 16, 2026", status: "Broadcasted", payout: "₹800" },
];

const AdminRequestsTab = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleBroadcast = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Broadcasted" } : req
    ));
    setSelectedRequest(null);
    alert("Request broadcasted to local vendors successfully! (Mocked)");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Service Requests</h2>
        <p className="text-text-secondary font-medium mt-1">Manage user requests and broadcast them to verified vendors.</p>
      </div>

      <div className="bg-surface-primary border border-border-primary rounded-[1.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-secondary border-b border-border-secondary text-xs uppercase tracking-wider font-bold text-zinc-500">
            <tr>
              <th className="px-6 py-4">Request Details</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-surface-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-text-primary">{req.service}</p>
                  <p className="text-xs text-text-secondary">{req.location} • {req.date}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-text-primary">{req.user}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    req.status === "Pending Broadcast" 
                      ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedRequest(req)}
                    className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-primary rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setSelectedRequest(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer">
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-black text-text-primary tracking-tight mb-1">Manage Request</h3>
              <p className="text-text-secondary font-medium">{selectedRequest.id}</p>
            </div>

            <div className="space-y-4 mb-8 bg-surface-secondary p-5 rounded-2xl border border-border-secondary">
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm font-bold">Service</span>
                <span className="font-bold text-text-primary text-sm">{selectedRequest.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm font-bold">Location</span>
                <span className="font-bold text-text-primary text-sm text-right">{selectedRequest.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm font-bold">User</span>
                <span className="font-bold text-text-primary text-sm">{selectedRequest.user}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border-primary">
                <span className="text-text-secondary text-sm font-bold">Est. Payout</span>
                <span className="font-black text-text-primary text-lg">{selectedRequest.payout}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {selectedRequest.status === "Pending Broadcast" ? (
                <button 
                  onClick={() => handleBroadcast(selectedRequest.id)}
                  className="w-full py-4 text-white bg-blue-600 font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RadioTower size={20} /> Broadcast to Vendors
                </button>
              ) : (
                <div className="w-full py-4 text-emerald-600 bg-emerald-500/10 font-bold rounded-xl flex items-center justify-center gap-2 border border-emerald-500/20">
                  <CheckCircle2 size={20} /> Already Broadcasted
                </div>
              )}
              <button 
                onClick={() => setSelectedRequest(null)}
                className="w-full py-3 text-text-primary bg-surface-secondary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsTab;
