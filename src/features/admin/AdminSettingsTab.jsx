import React, { useState } from "react";
import { Settings, Shield, Bell, Key, Globe, CreditCard, Save, Loader2, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminModal } from "../../components/ui/AdminShared";

const SETTINGS_SECTIONS = [
  { id: "general", label: "General", icon: Settings },
  { id: "security", label: "Security & Roles", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Key },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "billing", label: "Platform Billing", icon: CreditCard },
];

const AdminSettingsTab = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // General Settings State
  const [settings, setSettings] = useState({
    platformName: "TodayFix",
    supportEmail: "support@todayfix.com",
    platformFee: 10,
    minPayout: 1000,
    maintenanceMode: false,
  });

  // Security & Roles State
  const [roles, setRoles] = useState([
    { id: "1", name: "Super Admin", description: "Full access to all platform settings and financials.", users: 3, color: "text-text-primary" },
    { id: "2", name: "Operations Admin", description: "Can manage providers, users, and disputes. No financial access.", users: 12, color: "text-blue-600" },
    { id: "3", name: "Finance Admin", description: "Access to payments, payouts, and subscriptions only.", users: 5, color: "text-emerald-600" },
  ]);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  // Notification Settings State
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    systemEmail: "alerts@todayfix.com",
    slackWebhook: "https://hooks.slack.com/services/todayfix/alerts",
  });

  // API Keys State
  const [apiKeys, setApiKeys] = useState([
    { id: "key-1", name: "Stripe Gateway Key", key: "tf_live_9981273918237192", environment: "Production", created: "Jan 10, 2026", status: "Active" },
    { id: "key-2", name: "Twilio SMS Service", key: "tf_live_4412983719827391", environment: "Production", created: "Feb 05, 2026", status: "Active" },
  ]);
  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState("Production");

  // Platform Billing State
  const [billingSettings, setBillingSettings] = useState({
    billingEmail: "billing@todayfix.com",
    taxId: "GSTIN-29AAAAA0000A1Z5",
    currency: "INR (₹)",
    invoicePrefix: "INV-2026-",
    autoPayout: true,
  });

  // Localization State
  const [locSettings, setLocSettings] = useState({
    defaultLanguage: "English (US)",
    timezone: "Asia/Kolkata (GMT+5:30)",
    dateFormat: "DD/MM/YYYY",
    currencyFormat: "INR (₹)",
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network delay
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Platform settings saved successfully!");
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    const newRole = {
      id: `role-${Date.now()}`,
      name: newRoleName,
      description: newRoleDesc || "Custom administrative role",
      users: 0,
      color: "text-text-primary",
    };
    setRoles([...roles, newRole]);
    setIsAddRoleOpen(false);
    setNewRoleName("");
    setNewRoleDesc("");
    toast.success(`Role "${newRole.name}" added successfully!`);
  };

  const handleNotifChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotifSettings({
      ...notifSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveNotifSettings = (e) => {
    e.preventDefault();
    toast.success("Notification settings saved successfully!");
  };

  const handleAddApiKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const generatedKey = `tf_${newKeyEnv.toLowerCase().slice(0, 4)}_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: generatedKey,
      environment: newKeyEnv,
      created: "Aug 12, 2026",
      status: "Active",
    };
    setApiKeys([...apiKeys, newKey]);
    setIsAddKeyOpen(false);
    setNewKeyName("");
    setNewKeyEnv("Production");
    toast.success(`API Key "${newKey.name}" generated successfully!`);
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
    toast.success("API key revoked.");
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingSettings({
      ...billingSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveBilling = (e) => {
    e.preventDefault();
    toast.success("Platform billing settings saved successfully!");
  };

  const handleLocChange = (e) => {
    const { name, value } = e.target;
    setLocSettings({ ...locSettings, [name]: value });
  };

  const handleSaveLoc = (e) => {
    e.preventDefault();
    toast.success("Localization settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Platform Settings</h2>
          <p className="text-text-secondary font-medium mt-1">Configure global platform preferences and administrative roles.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm cursor-pointer ${
                  isActive
                    ? "bg-surface-dark text-text-inverted shadow-md shadow-black/20"
                    : "text-zinc-500 hover:text-text-primary hover:bg-surface-secondary"
                }`}
              >
                <Icon size={18} className={isActive ? "text-text-inverted" : "text-zinc-400"} />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content area */}
        <div className="flex-1 bg-surface-primary border border-border-primary rounded-[1.5rem] p-6 md:p-8 shadow-sm">
          
          {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <h3 className="text-lg font-black text-text-primary">Platform Information</h3>
                <p className="text-sm text-text-secondary mb-6 mt-1">Update the core details of the marketplace.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Platform Name</label>
                    <input 
                      type="text" 
                      name="platformName"
                      value={settings.platformName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Support Email</label>
                    <input 
                      type="email" 
                      name="supportEmail"
                      value={settings.supportEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Platform Fee (%)</label>
                    <input 
                      type="number" 
                      name="platformFee"
                      value={settings.platformFee}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Minimum Payout (₹)</label>
                    <input 
                      type="number" 
                      name="minPayout"
                      value={settings.minPayout}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border-secondary" />

              <div>
                <h3 className="text-lg font-black text-text-primary">Maintenance Mode</h3>
                <p className="text-sm text-text-secondary mb-4 mt-1">Temporarily disable customer access to the platform.</p>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-primary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-surface-dark transition-colors"></div>
                  </div>
                  <span className="text-sm font-bold text-text-primary group-hover:text-text-primary transition-colors">Enable Maintenance Mode</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-text-primary">Role-Based Access Control (RBAC)</h3>
                  <p className="text-sm text-text-secondary mt-1">Manage admin privileges and administrative roles.</p>
                </div>
                <button 
                  onClick={() => setIsAddRoleOpen(true)}
                  className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Role
                </button>
              </div>
              
              <div className="border border-border-secondary rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-secondary text-xs uppercase text-zinc-500 font-bold border-b border-border-secondary">
                    <tr>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Users</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-secondary">
                    {roles.map((r) => (
                      <tr key={r.id}>
                        <td className={`px-4 py-4 font-bold ${r.color || "text-text-primary"}`}>{r.name}</td>
                        <td className="px-4 py-4 text-sm text-text-secondary">{r.description}</td>
                        <td className="px-4 py-4 font-medium">{r.users}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleSaveNotifSettings} className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-black text-text-primary">Notification Channels & Delivery</h3>
                <p className="text-sm text-text-secondary mb-6 mt-1">Configure broadcast alerts and automated notification preferences.</p>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-primary rounded-xl cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-text-primary">Email Notifications</p>
                      <p className="text-xs text-text-secondary">Send automated emails for platform events and reports.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      name="emailAlerts" 
                      checked={notifSettings.emailAlerts} 
                      onChange={handleNotifChange} 
                      className="w-4 h-4 rounded border-zinc-300"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-primary rounded-xl cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-text-primary">Push Notifications</p>
                      <p className="text-xs text-text-secondary">Deliver instant push alerts to mobile applications.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      name="pushAlerts" 
                      checked={notifSettings.pushAlerts} 
                      onChange={handleNotifChange} 
                      className="w-4 h-4 rounded border-zinc-300"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-primary rounded-xl cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-text-primary">SMS Broadcast Alerts</p>
                      <p className="text-xs text-text-secondary">Send SMS alerts for critical system updates.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      name="smsAlerts" 
                      checked={notifSettings.smsAlerts} 
                      onChange={handleNotifChange} 
                      className="w-4 h-4 rounded border-zinc-300"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Admin System Email</label>
                    <input 
                      type="email" 
                      name="systemEmail" 
                      value={notifSettings.systemEmail} 
                      onChange={handleNotifChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Slack Webhook URL</label>
                    <input 
                      type="text" 
                      name="slackWebhook" 
                      value={notifSettings.slackWebhook} 
                      onChange={handleNotifChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="px-5 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Save Notification Settings
              </button>
            </form>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-text-primary">API Keys & Webhooks</h3>
                  <p className="text-sm text-text-secondary mt-1">Manage external service integrations and API authentication tokens.</p>
                </div>
                <button 
                  onClick={() => setIsAddKeyOpen(true)} 
                  className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Generate New Key
                </button>
              </div>

              <div className="border border-border-secondary rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-secondary text-xs uppercase text-zinc-500 font-bold border-b border-border-secondary">
                    <tr>
                      <th className="px-4 py-3">Key Name</th>
                      <th className="px-4 py-3">API Key</th>
                      <th className="px-4 py-3">Environment</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-secondary">
                    {apiKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="px-4 py-4 font-bold text-text-primary">{key.name}</td>
                        <td className="px-4 py-4 font-mono text-xs text-zinc-600">{key.key}</td>
                        <td className="px-4 py-4 text-xs font-bold text-text-primary">{key.environment}</td>
                        <td className="px-4 py-4 text-xs text-zinc-500">{key.created}</td>
                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteApiKey(key.id)} 
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Revoke Key"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <form onSubmit={handleSaveBilling} className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-black text-text-primary">Platform Billing & Financial Preferences</h3>
                <p className="text-sm text-text-secondary mb-6 mt-1">Configure invoicing, tax identifiers, and merchant payout rules.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Billing Contact Email</label>
                    <input 
                      type="email" 
                      name="billingEmail" 
                      value={billingSettings.billingEmail} 
                      onChange={handleBillingChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">GSTIN / Tax ID Number</label>
                    <input 
                      type="text" 
                      name="taxId" 
                      value={billingSettings.taxId} 
                      onChange={handleBillingChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Settlement Currency</label>
                    <input 
                      type="text" 
                      name="currency" 
                      value={billingSettings.currency} 
                      onChange={handleBillingChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Invoice Prefix</label>
                    <input 
                      type="text" 
                      name="invoicePrefix" 
                      value={billingSettings.invoicePrefix} 
                      onChange={handleBillingChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="autoPayout" 
                      checked={billingSettings.autoPayout} 
                      onChange={handleBillingChange} 
                      className="w-4 h-4 rounded border-zinc-300"
                    />
                    <span className="text-sm font-bold text-text-primary">Enable Automated Weekly Provider Payouts</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="px-5 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Save Billing Settings
              </button>
            </form>
          )}

          {activeTab === "localization" && (
            <form onSubmit={handleSaveLoc} className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-black text-text-primary">Localization & Regional Preferences</h3>
                <p className="text-sm text-text-secondary mb-6 mt-1">Configure language, timezone, and regional date formatting.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Default Language</label>
                    <input 
                      type="text" 
                      name="defaultLanguage" 
                      value={locSettings.defaultLanguage} 
                      onChange={handleLocChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Timezone</label>
                    <input 
                      type="text" 
                      name="timezone" 
                      value={locSettings.timezone} 
                      onChange={handleLocChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Date Format</label>
                    <input 
                      type="text" 
                      name="dateFormat" 
                      value={locSettings.dateFormat} 
                      onChange={handleLocChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Currency Display</label>
                    <input 
                      type="text" 
                      name="currencyFormat" 
                      value={locSettings.currencyFormat} 
                      onChange={handleLocChange} 
                      className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="px-5 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Save Localization Preferences
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Add Role Modal */}
      <AdminModal
        isOpen={isAddRoleOpen}
        onClose={() => setIsAddRoleOpen(false)}
        title="Add Administrative Role"
        footer={
          <>
            <button
              onClick={() => setIsAddRoleOpen(false)}
              className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRole}
              className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold hover:bg-zinc-800 cursor-pointer"
            >
              Create Role
            </button>
          </>
        }
      >
        <form onSubmit={handleAddRole} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Role Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Support Manager"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Description</label>
            <textarea
              rows={3}
              placeholder="Describe access privileges for this role..."
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-medium text-text-primary focus:outline-none focus:border-black resize-none"
            />
          </div>
        </form>
      </AdminModal>

      {/* Add API Key Modal */}
      <AdminModal
        isOpen={isAddKeyOpen}
        onClose={() => setIsAddKeyOpen(false)}
        title="Generate New API Key"
        footer={
          <>
            <button
              onClick={() => setIsAddKeyOpen(false)}
              className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddApiKey}
              className="px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold hover:bg-zinc-800 cursor-pointer"
            >
              Generate Key
            </button>
          </>
        }
      >
        <form onSubmit={handleAddApiKey} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Key Name / Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Analytics Webhook"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Environment</label>
            <select
              value={newKeyEnv}
              onChange={(e) => setNewKeyEnv(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-black"
            >
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminSettingsTab;
