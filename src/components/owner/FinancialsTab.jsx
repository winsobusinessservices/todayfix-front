import React, { useState } from 'react';
import { Wallet, IndianRupee, ArrowDownRight, ArrowUpRight, Download, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_TRANSACTIONS = [
  { id: 'TXN-001', type: 'earning', amount: '4500', date: 'Oct 24, 2026', description: 'Deep Home Cleaning - Sarah J.' },
  { id: 'TXN-002', type: 'payout', amount: '12500', date: 'Oct 23, 2026', description: 'Bank Transfer to xxxx-9012' },
  { id: 'TXN-003', type: 'fee', amount: '120', date: 'Oct 22, 2026', description: 'Platform Fee (AC Servicing)' },
  { id: 'TXN-004', type: 'earning', amount: '1200', date: 'Oct 22, 2026', description: 'AC Servicing - Michael C.' },
];

const FinancialsTab = () => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [balance, setBalance] = useState(14250);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseInt(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0 || amount > balance) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setBalance(prev => prev - amount);
      setTransactions([{
        id: `TXN-00${transactions.length + 1}`,
        type: 'payout',
        amount: amount.toString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: 'Bank Transfer to xxxx-9012'
      }, ...transactions]);
      
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        setWithdrawAmount('');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">Financials</h1>
        <p className="text-zinc-400">Track your earnings, payouts, and wallet balance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Card */}
        <div className="md:col-span-1 bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-32 h-32 text-text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-400 mb-2 relative z-10">Available Balance</h2>
            <div className="flex items-center gap-1 text-5xl font-black text-text-primary tracking-tight mb-8 relative z-10">
              <IndianRupee className="w-8 h-8 text-zinc-400" />
              {balance.toLocaleString()}
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md relative z-10"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Mini Stats */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-surface-secondary rounded-3xl border border-border-primary p-6 flex flex-col justify-center shadow-inner">
            <h3 className="text-sm font-medium text-zinc-500 mb-2">Total Earnings (Month)</h3>
            <div className="flex items-center gap-1 text-3xl font-black text-text-primary">
              <IndianRupee className="w-6 h-6 text-zinc-400" />45,200
            </div>
          </div>
          <div className="bg-surface-secondary rounded-3xl border border-border-primary p-6 flex flex-col justify-center shadow-inner">
            <h3 className="text-sm font-medium text-zinc-500 mb-2">Next Scheduled Payout</h3>
            <p className="text-3xl font-black text-text-primary">Oct 30</p>
          </div>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="bg-surface-primary rounded-3xl border border-border-primary shadow-2xl shadow-black/5 overflow-hidden">
        <div className="p-6 border-b border-border-primary flex justify-between items-center bg-surface-secondary/30">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">Recent Transactions</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-text-primary transition-colors bg-surface-primary px-4 py-2 rounded-xl border border-border-primary hover:border-zinc-500">
            <Download className="w-4 h-4" /> Statement
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-secondary text-xs uppercase tracking-wider text-zinc-500 font-bold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-surface-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-zinc-500">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400 font-medium">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-text-primary font-medium">
                    <div className="flex items-center gap-2">
                      {txn.type === 'earning' && <ArrowDownRight className="w-5 h-5 text-green-500 bg-green-500/10 p-1 rounded-full" />}
                      {txn.type === 'payout' && <ArrowUpRight className="w-5 h-5 text-blue-500 bg-blue-500/10 p-1 rounded-full" />}
                      {txn.type === 'fee' && <ArrowUpRight className="w-5 h-5 text-red-500 bg-red-500/10 p-1 rounded-full" />}
                      {txn.description}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm font-black text-right ${
                    txn.type === 'earning' ? 'text-green-500' : 'text-text-primary'
                  }`}>
                    {txn.type === 'earning' ? '+' : '-'}₹{Number(txn.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => !isProcessing && setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-surface-primary rounded-3xl border border-border-primary shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-border-primary flex justify-between items-center bg-surface-secondary/50">
                <h2 className="text-xl font-black text-text-primary tracking-tight">Withdraw Funds</h2>
                {!isProcessing && (
                  <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-text-primary transition-colors">
                    <X size={24} />
                  </button>
                )}
              </div>
              <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                
                <div className="text-center p-4 bg-surface-secondary rounded-2xl border border-border-primary">
                  <p className="text-sm font-bold text-zinc-500 mb-1">Available Balance</p>
                  <p className="text-3xl font-black text-text-primary tracking-tight">₹{balance.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">Amount to Withdraw</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input 
                      type="number" 
                      required
                      min="100"
                      max={balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl pl-12 pr-4 py-4 text-xl font-black focus:outline-none focus:border-text-primary transition-colors"
                      placeholder="0"
                      disabled={isProcessing || isSuccess}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-bold">
                    <span className="text-zinc-500">Min: ₹100</span>
                    <button type="button" onClick={() => setWithdrawAmount(balance.toString())} className="text-text-primary hover:underline">Max: ₹{balance.toLocaleString()}</button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing || isSuccess || !withdrawAmount || parseInt(withdrawAmount) > balance}
                  className="w-full py-4 bg-surface-dark text-text-inverted font-bold text-lg rounded-xl hover:scale-[0.98] transition-transform shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                     <span className="w-6 h-6 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                  ) : isSuccess ? (
                     <><Check className="w-6 h-6" /> Success</>
                  ) : (
                     "Confirm Withdrawal"
                  )}
                </button>
                
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FinancialsTab;
