import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fixCoinsApi } from "../../services/fixCoinsApi";
import {
  Coins,
  IndianRupee,
  TrendingUp,
  History,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { dateFormater } from "../../utils/dateFormater";
// import { format } from "date-fns";

const ProfileTokensTab = () => {
  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ["fixCoinsBalance"],
    queryFn: fixCoinsApi.getBalance,
  });

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ["fixCoinsHistory"],
    queryFn: () => fixCoinsApi.getHistory(1),
  });

  const balance = balanceData?.data;

  // Handle nested history structure from API response description
  const historyResults = historyData?.[0]?.results || historyData?.results || [];
  // console.log(historyData);

  if (balanceLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
          <Coins className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-text-primary">
            My Fix-Coins Wallet
          </h2>
          <p className="text-sm text-zinc-500 font-medium mt-1">
            Earn coins on every completed booking and redeem them for discounts!
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Coins className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-white/80 font-bold uppercase tracking-wider text-sm mb-2">
              Available Balance
            </h3>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-6xl font-black tracking-tighter leading-none">
                {balance?.available_coins || 0}
              </span>
              <span className="text-xl font-bold text-white/90 mb-1">
                Coins
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
              <IndianRupee className="w-4 h-4 text-amber-200" />
              <span className="font-bold text-amber-50">
                Value: ₹{balance?.coin_value_rupees || "0.00"}
              </span>
              <span className="text-xs text-white/60 ml-2">
                (1 Rupee = {balance?.coins_per_rupee || 10} Coins)
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-secondary border border-border-secondary rounded-3xl p-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Lifetime Earned
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-black text-text-primary">
                {balance?.lifetime_earned_coins || 0}
              </span>
            </div>
          </div>

          <div className="bg-surface-secondary border border-border-secondary rounded-3xl p-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Total Redeemed
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Coins className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-black text-text-primary">
                {balance?.lifetime_redeemed_coins || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="mt-10">
        <h3 className="text-xl font-black tracking-tight text-text-primary mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-zinc-400" /> Transaction History
        </h3>

        {historyLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary"></div>
          </div>
        ) : historyResults.length === 0 ? (
          <div className="text-center py-12 bg-surface-secondary rounded-3xl border border-border-secondary border-dashed">
            <p className="text-zinc-500 font-medium">No transactions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {historyResults.map((tx) => {
              const isEarned = tx.balance_after > tx.balance_before;

              return (
                <div
                  key={tx.transaction_uuid}
                  className="flex items-center justify-between p-5 bg-surface-secondary border border-border-secondary rounded-2xl hover:bg-zinc-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${isEarned ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                    >
                      {isEarned ? (
                        <ArrowUpRight className="w-6 h-6" />
                      ) : (
                        <ArrowDownRight className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">
                        {tx.description}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-zinc-500 bg-surface-primary px-2 py-0.5 rounded-md border border-border-primary">
                          {tx.transaction_type.replace(/_/g, " ")}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {dateFormater(tx.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-lg font-black ${isEarned ? "text-green-600" : "text-red-600"}`}
                    >
                      {isEarned ? "+" : "-"}
                      {tx.coins}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTokensTab;
