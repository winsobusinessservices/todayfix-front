import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { Download, IndianRupee, RefreshCcw, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_PAYMENTS = [
  { id: "TXN-98214", customer: "Jane Doe", provider: "Sparkle Clean", service: "Deep Cleaning", amount: "₹2500", fee: "₹250", method: "UPI", status: "Successful", date: "Aug 11, 2026, 14:30" },
  { id: "TXN-98213", customer: "John Smith", provider: "AC Experts", service: "AC Gas Leak", amount: "₹1800", fee: "₹180", method: "Card", status: "Successful", date: "Aug 11, 2026, 11:15" },
  { id: "TXN-98212", customer: "Rahul V", provider: "Quick Plumbers", service: "Pipe Leakage", amount: "₹850", fee: "₹85", method: "UPI", status: "Refunded", date: "Aug 10, 2026, 16:45" },
  { id: "TXN-98211", customer: "Priya S", provider: "Elite Painters", service: "Wall Painting", amount: "₹14500", fee: "₹1450", method: "Net Banking", status: "Pending", date: "Aug 10, 2026, 09:20" },
  { id: "TXN-98210", customer: "Amit Patel", provider: "FixIt All", service: "TV Wall Mount", amount: "₹499", fee: "₹50", method: "UPI", status: "Failed", date: "Aug 09, 2026, 18:05" },
];

const AdminPaymentsTab = () => {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const columns = [
    { 
      header: "Transaction details", 
      accessor: "id",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary">{row.id}</p>
          <p className="text-xs text-text-secondary">{row.date}</p>
        </div>
      )
    },
    { 
      header: "Participants", 
      accessor: "customer",
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-text-primary">Cust: {row.customer}</p>
          <p className="text-xs text-text-secondary">Prov: {row.provider}</p>
        </div>
      )
    },
    { header: "Service", accessor: "service" },
    { 
      header: "Amount", 
      accessor: "amount",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary">{row.amount}</p>
          <p className="text-[10px] uppercase font-bold text-purple-600">Fee: {row.fee}</p>
        </div>
      )
    },
    { header: "Method", accessor: "method", render: (row) => <span className="font-medium text-text-secondary">{row.method}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Payments ledger synced successfully.");
    }, 800);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Payments ledger exported successfully.");
    }, 800);
  };

  const handleRefund = () => {
    if (!selectedPayment) return;
    setPayments(
      payments.map((p) =>
        p.id === selectedPayment.id ? { ...p, status: "Refunded" } : p
      )
    );
    setSelectedPayment((prev) => (prev ? { ...prev, status: "Refunded" } : null));
    toast.success(`Refund processed for transaction ${selectedPayment.id}.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Payments Ledger</h2>
          <p className="text-text-secondary font-medium mt-1">Track all incoming customer transactions and platform fees.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary border border-border-primary text-text-primary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <RefreshCcw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} /> 
            {isSyncing ? "Syncing..." : "Sync"}
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isExporting ? "Exporting..." : "Export Ledger"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Volume", value: "₹42.5L", color: "text-blue-600" },
          { label: "Successful", value: "34.2L", color: "text-emerald-600" },
          { label: "Platform Fees", value: "₹3.4L", color: "text-purple-600" },
          { label: "Refunded", value: "₹1.2L", color: "text-amber-600" },
        ].map((stat, i) => (
           <div key={i} className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm">
             <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
             <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
           </div>
        ))}
      </div>

      <DataTable 
        columns={columns}
        data={payments}
        searchPlaceholder="Search by TXN ID, Customer, or Provider..."
        onRowClick={(row) => {
          setSelectedPayment(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedPayment(row);
          setIsModalOpen(true);
        }}
      />

      {selectedPayment && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Payment Details"
          footer={
            <div className="flex gap-2 justify-end w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-surface-secondary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedPayment.status !== "Refunded" && (
                <button
                  onClick={handleRefund}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Refund Payment
                </button>
              )}
            </div>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedPayment.id}</h4>
                <p className="text-xs text-text-secondary">{selectedPayment.date}</p>
              </div>
              <StatusBadge status={selectedPayment.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Customer</p>
                <p className="font-semibold">{selectedPayment.customer}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Provider</p>
                <p className="font-semibold">{selectedPayment.provider}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Service</p>
                <p className="font-semibold">{selectedPayment.service}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Payment Method</p>
                <p className="font-semibold">{selectedPayment.method}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Amount</p>
                <p className="font-semibold">{selectedPayment.amount}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Platform Fee</p>
                <p className="font-semibold text-purple-600">{selectedPayment.fee}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminPaymentsTab;
