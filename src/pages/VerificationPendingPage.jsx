import React from "react";
import { useNavigate } from "react-router";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { businessApi } from "../services/businessApi";
import { useUserStore } from "../store/userStore";
import { userDetails } from "../services/userApi";
import toast from "react-hot-toast";

const VerificationPendingPage = () => {
  const navigate = useNavigate();
  const userData = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBusinessApplications"],
    queryFn: businessApi.getBusinessApplicationList,
    refetchInterval: 20000, // Poll every 5 seconds to catch status changes automatically
  });

  const handleReapply = async () => {
    setIsRefreshing(true);
    try {
      const data = await userDetails();
      setUser({ ...userData, ...data });
      navigate("/list-business", { state: { bypassRejection: true } });
    } catch (e) {
      console.error(e);
      toast.error("Failed to refresh user profile.");
    }
    setIsRefreshing(false);
  };

  const handleGoToDashboard = async () => {
    setIsRefreshing(true);
    try {
      const data = await userDetails();
      setUser({ ...userData, ...data });
      navigate("/owner-dashboard");
    } catch (e) {
      console.error(e);
      toast.error("Failed to refresh user profile.");
    }
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="font-sans flex flex-col items-center justify-center p-6 py-20 min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-bold text-zinc-500">
          Checking application status...
        </p>
      </div>
    );
  }

  // Get the most recent application
  const appList = applications?.results || applications?.data || [];
  const latestApp = appList.length > 0 ? appList[0] : null;

  if (!latestApp) {
    // If they have no applications, they shouldn't be on this page.
    return (
      <div className="font-sans flex flex-col items-center justify-center p-6 py-20">
        <div className="bg-surface-primary border border-border-primary rounded-xl p-10 md:p-14 max-w-xl w-full text-center shadow-2xl relative overflow-hidden">
          <h1 className="text-2xl font-black text-text-primary mb-4">
            No Applications Found
          </h1>
          <p className="text-zinc-500 font-medium mb-8">
            It looks like you haven't applied to list a business yet.
          </p>
          <button
            onClick={() => navigate("/list-business")}
            className="px-6 py-3 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Start Application
          </button>
        </div>
      </div>
    );
  }

  const { status, rejection_reason } = latestApp;

  React.useEffect(() => {
    if (status === "ACCEPTED") {
      // Instantly refresh user profile globally so navbars/roles update
      userDetails()
        .then((data) => setUser({ ...userData, ...data }))
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="font-sans flex flex-col items-center justify-center p-6 py-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-surface-primary border border-border-primary rounded-xl p-10 md:p-14 max-w-xl w-full text-center shadow-2xl relative overflow-hidden">
        {status === "PENDING" && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-surface-secondary border border-border-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Clock
                  size={40}
                  className="text-amber-500 animate-[spin_4s_linear_infinite]"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-4">
                Under Review
              </h1>
              <p className="text-zinc-500 font-medium leading-relaxed mb-8">
                Thank you for submitting your documents. Our team is carefully
                reviewing your profile to ensure marketplace quality.
                <br />
                <br />
                This process typically takes <strong>24-48 hours</strong>. We
                will notify you via email once your business is verified.
              </p>
              <div className="bg-surface-secondary border border-border-primary rounded-2xl p-4 text-sm font-bold text-text-secondary flex items-center justify-center gap-2 mb-10">
                <ShieldCheck className="w-5 h-5 text-text-primary" />
                Your Dashboard is locked during this period.
              </div>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-bold text-text-primary hover:text-text-muted transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </>
        )}

        {status === "REJECTED" && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <AlertOctagon size={40} className="text-red-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-4">
                Application Rejected
              </h1>
              <p className="text-zinc-500 font-medium leading-relaxed mb-6">
                Unfortunately, your business application was not approved at
                this time.
              </p>

              {rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm font-medium text-red-700 text-left mb-8 shadow-sm">
                  <span className="font-bold block mb-1 uppercase text-xs">
                    Reason for Rejection:
                  </span>
                  {rejection_reason}
                </div>
              )}

              <button
                onClick={handleReapply}
                disabled={isRefreshing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-text-primary text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg hover:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={20} />
                {isRefreshing ? "Refreshing..." : "Update Details & Re-apply"}
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-bold text-text-primary hover:text-text-muted transition-colors mt-6 block mx-auto cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </>
        )}

        {status === "ACCEPTED" && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-4">
                Application Approved!
              </h1>
              <p className="text-zinc-500 font-medium leading-relaxed mb-8">
                Congratulations! Your business profile has been successfully
                verified. You can now access your Owner Dashboard and start
                managing your services.
              </p>

              <button
                onClick={handleGoToDashboard}
                disabled={isRefreshing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 hover:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                {isRefreshing
                  ? "Loading Dashboard..."
                  : "Go to Owner Dashboard"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPendingPage;
