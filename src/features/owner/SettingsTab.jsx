import React, { useState } from "react";
import {
  Bell,
  Smartphone,
  Mail,
  Shield,
  Moon,
  Check,
  Building2,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import BusinessUpgradeModal from "../../components/modals/BusinessUpgradeModal";

const SettingsToggle = ({ title, description, active, onToggle }) => (
  <div className="flex items-center justify-between py-4 border-b border-border-primary last:border-0">
    <div className="pr-8">
      <h4 className="font-bold text-text-primary mb-1">{title}</h4>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`shrink-0 w-12 h-6 rounded-full p-1 transition-colors duration-300 ${active ? "bg-text-primary" : "bg-surface-secondary border border-border-primary"}`}
    >
      <div
        className={`w-4 h-4 rounded-full transition-transform duration-300 ${active ? "bg-surface-primary translate-x-6" : "bg-zinc-500 translate-x-0"}`}
      />
    </button>
  </div>
);

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    vacationMode: false,
    smsAlerts: true,
    emailAlerts: true,
    marketing: false,
  });

  const [passwordForm, setPasswordForm] = useState({ current: "", new: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Queries for Account & Plan
  const { data: profilesData } = useQuery({
    queryKey: ["businessProfiles"],
    queryFn: businessApi.getProfiles,
  });

  const { data: upgradeRequestsData } = useQuery({
    queryKey: ["upgrade-requests"],
    queryFn: businessApi.getUpgradeRequests,
  });

  const profile = profilesData?.results?.[0] || profilesData?.[0] || {};
  const currentBusinessType = profile?.business_type || "INDIVIDUAL";

  const upgradeRequests = upgradeRequestsData?.data || upgradeRequestsData?.results || [];
  const latestRequest = upgradeRequests[0];
  const pendingUpgrade = latestRequest?.status === "PENDING" ? latestRequest : null;
  const rejectedUpgrade = latestRequest?.status === "REJECTED" ? latestRequest : null;

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.new) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setPasswordForm({ current: "", new: "" });
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-zinc-400">
          Manage your account preferences and notifications.
        </p>
      </div>

      {/* Vacation Mode */}
      <div
        className={`rounded-3xl border p-6 shadow-2xl shadow-black/5 transition-colors duration-500 ${
          settings.vacationMode
            ? "bg-blue-500/10 border-blue-500/30"
            : "bg-surface-primary border-border-primary"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl ${settings.vacationMode ? "bg-blue-500/20 text-blue-500" : "bg-surface-secondary text-zinc-400"}`}
          >
            <Moon size={24} />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <h3
                className={`text-xl font-bold tracking-tight ${settings.vacationMode ? "text-blue-500" : "text-text-primary"}`}
              >
                Vacation Mode
              </h3>
              <SettingsToggle
                active={settings.vacationMode}
                onToggle={() => toggle("vacationMode")}
              />
            </div>
            <p className="text-sm text-zinc-400">
              When turned on, your profile will be hidden from search results
              and you won't receive new booking requests. Existing bookings are
              not affected.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-primary">
          <Bell className="text-zinc-400" />
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Notification Preferences
          </h2>
        </div>

        <div>
          <SettingsToggle
            title="SMS Alerts"
            description="Receive text messages for new bookings and cancellations."
            active={settings.smsAlerts}
            onToggle={() => toggle("smsAlerts")}
          />
          <SettingsToggle
            title="Email Notifications"
            description="Daily summaries and detailed booking information."
            active={settings.emailAlerts}
            onToggle={() => toggle("emailAlerts")}
          />
          <SettingsToggle
            title="Marketing & Tips"
            description="Occasional emails on how to grow your business on Todayfix."
            active={settings.marketing}
            onToggle={() => toggle("marketing")}
          />
        </div>
      </div>

      {/* Account & Plan Section */}
      <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-primary">
          <Building2 className="text-zinc-400" />
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Account & Plan
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-text-primary mb-1">
              Current Business Type
            </h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-surface-secondary border border-border-primary rounded-full text-sm font-bold text-indigo-500">
                {currentBusinessType}
              </span>
              {pendingUpgrade && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-500">
                  <Clock className="w-3 h-3" /> Upgrade Pending Approval
                </span>
              )}
              {rejectedUpgrade && !pendingUpgrade && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-bold text-red-500">
                  Upgrade Rejected
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-400 mt-3">
              Your business type determines your account capabilities and
              verification requirements.
            </p>
            {rejectedUpgrade && !pendingUpgrade && rejectedUpgrade.rejection_reason && (
              <div className="mt-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                <p className="text-xs font-bold text-red-500 mb-1">Rejection Reason:</p>
                <p className="text-sm text-text-primary">{rejectedUpgrade.rejection_reason}</p>
              </div>
            )}
          </div>

          {currentBusinessType === "INDIVIDUAL" && !pendingUpgrade && (
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="shrink-0 px-5 py-2.5 bg-text-primary text-surface-primary font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md flex items-center gap-2"
            >
              Upgrade Account <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-primary">
          <Shield className="text-zinc-400" />
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Security
          </h2>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-2">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current: e.target.value })
              }
              placeholder="••••••••"
              className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-primary mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.new}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, new: e.target.value })
              }
              placeholder="Enter new password"
              className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md mt-2 flex items-center justify-center gap-2 min-w-[180px]"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
            ) : isSaved ? (
              <>
                <Check className="w-5 h-5" /> Updated
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>

      <BusinessUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentType={currentBusinessType}
      />
    </div>
  );
};

export default SettingsTab;
