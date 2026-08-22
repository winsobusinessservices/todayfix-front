import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { Send, History, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_PAYOUTS = [
  { id: "PO-5011", provider: "Sparkle Clean", amount: "₹2,250", bankRef: "HDFC0001234", status: "Processing", requestedDate: "Aug 11, 2026", processedDate: "-" },
  { id: "PO-5010", provider: "AC Experts", amount: "₹1,620", bankRef: "SBIN0004567", status: "Completed", requestedDate: "Aug 10, 2026", processedDate: "Aug 11, 2026" },
  { id: "PO-5009", provider: "Urban Plumbers", amount: "₹12,450", bankRef: "ICIC0007890", status: "Completed", requestedDate: "Aug 09, 2026", processedDate: "Aug 10, 2026" },
  { id: "PO-5008", provider: "FixIt All", amount: "₹450", bankRef: "AXIS0009876", status: "Failed", requestedDate: "Aug 09, 2026", processedDate: "Aug 09, 2026" },
  { id: "PO-5007", provider: "Elite Painters", amount: "₹45,000", bankRef: "KKBK0003456", status: "Pending", requestedDate: "Aug 11, 2026", processedDate: "-" },
];

const AdminPayoutsTab = () => {
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const columns = [
    { 
      header: "Payout ID", 
      accessor: "id",
      render: (row) => <span className="font-bold text-text-primary">{row.id}</span>
    },
    { 
      header: "Provider", 
      accessor: "provider",
      render: (row) => <span className="font-medium text-text-primary">{row.provider}</span>
    },
    { 
      header: "Final Amount", 
      accessor: "amount",
      render: (row) => <span className="font-black text-emerald-600">{row.amount}</span>
    },
    { 
      header: "Bank Ref (IFSC)", 
      accessor: "bankRef",
      render: (row) => <span className="text-xs font-mono text-text-secondary bg-surface-secondary px-2 py-1 rounded">{row.bankRef}</span>
    },
    { 
      header: "Timeline", 
      accessor: "requestedDate",
      render: (row) => (
        <div>
          <p className="text-xs text-text-primary">Req: {row.requestedDate}</p>
          <p className="text-[10px] text-zinc-400">Proc: {row.processedDate}</p>
        </div>
      )
    },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const handleProcessBatch = () => {
    let count = 0;
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const newPayouts = payouts.map(p => {
      if (p.status === "Pending") {
        count++;
        return { ...p, status: "Completed", processedDate: formattedDate };
      }
      return p;
    });
    
    if (count > 0) {
      setPayouts(newPayouts);
      toast.success(`Successfully processed ${count} pending payouts.`);
    } else {
      toast.error("No pending payouts found in the current batch.");
    }
  };

  const handleRetryFailed = () => {
    setPayouts(payouts.map(p => p.id === selectedPayout.id ? { ...p, status: "Processing" } : p));
    toast.success(`Payout ${selectedPayout.id} queued for retry.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Provider Payouts</h2>
          <p className="text-text-secondary font-medium mt-1">Manage earning disbursements to vendors and businesses.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary border border-border-primary text-text-primary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <History className="w-4 h-4" /> Payout History
          </button>
          <button onClick={handleProcessBatch} className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm shadow-black/20 hover:bg-zinc-800 transition-colors cursor-pointer">
            <Send className="w-4 h-4" /> Process Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending Payouts", value: "₹4.2L", color: "text-amber-600", count: "124 Providers" },
          { label: "Processing", value: "₹1.8L", color: "text-blue-600", count: "45 Providers" },
          { label: "Completed (30d)", value: "₹28.5L", color: "text-emerald-600", count: "890 Providers" },
          { label: "Failed Transfers", value: "₹12.4K", color: "text-red-600", count: "3 Providers" },
        ].map((stat, i) => (
           <div key={i} className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm">
             <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
             <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
             <p className="text-xs font-medium text-zinc-400 mt-1">{stat.count}</p>
           </div>
        ))}
      </div>

      <DataTable 
        columns={columns}
        data={payouts}
        searchPlaceholder="Search by Provider or Payout ID..."
        onActionClick={(row) => {
          setSelectedPayout(row);
          setIsModalOpen(true);
        }}
      />

      {selectedPayout && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Payout Details"
          footer={
            <div className="flex gap-2 justify-end w-full">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-surface-secondary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Close
              </button>
              {selectedPayout.status === "Failed" && (
                <button 
                  onClick={handleRetryFailed}
                  className="px-4 py-2 bg-emerald-500 text-text-inverted font-bold rounded-xl hover:bg-emerald-600 cursor-pointer"
                >
                  Retry Payout
                </button>
              )}
            </div>
          }
        >
          <div className="space-y-4 text-text-primary">
            <p><strong>ID:</strong> {selectedPayout.id}</p>
            <p><strong>Provider:</strong> {selectedPayout.provider}</p>
            <p><strong>Amount:</strong> {selectedPayout.amount}</p>
            <p><strong>Bank Ref:</strong> {selectedPayout.bankRef}</p>
            <p><strong>Current Status:</strong> <StatusBadge status={selectedPayout.status} /></p>
          </div>
        </AdminModal>
      )}

      <AdminModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title="Payout History"
        footer={
          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="px-4 py-2 bg-surface-secondary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
          >
            Close
          </button>
        }
      >
        <div className="space-y-4 text-text-primary">
          <p className="text-sm text-text-secondary font-medium">
            Historical log of processed and pending payout transactions.
          </p>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {payouts.map((payout) => (
              <div key={payout.id} className="p-3 bg-surface-secondary border border-border-primary rounded-xl flex items-center justify-between text-sm">
                <div>
                  <p className="font-bold">{payout.provider}</p>
                  <p className="text-xs text-text-secondary">{payout.id} • Bank: {payout.bankRef}</p>
                  <p className="text-[10px] text-zinc-400">Req: {payout.requestedDate} | Proc: {payout.processedDate}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-black text-emerald-600">{payout.amount}</p>
                  <StatusBadge status={payout.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminPayoutsTab;
