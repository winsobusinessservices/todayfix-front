import React from "react";

const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-64 bg-surface-primary border border-border-primary rounded-[1.5rem] p-8 shadow-sm">
    <div className="text-center">
      <h2 className="text-2xl font-black text-text-primary mb-2">{title}</h2>
      <p className="text-text-secondary">This module is under construction.</p>
    </div>
  </div>
);

export const AdminUsersTab = () => <Placeholder title="Users Management" />;
export const AdminProvidersTab = () => <Placeholder title="Providers Management" />;
export const AdminBusinessesTab = () => <Placeholder title="Businesses Management" />;
export const AdminServicesTab = () => <Placeholder title="Services Management" />;
export const AdminCategoriesTab = () => <Placeholder title="Categories Management" />;
export const AdminCitiesTab = () => <Placeholder title="Cities & Locations" />;
export const AdminReviewsTab = () => <Placeholder title="Reviews Management" />;
export const AdminPaymentsTab = () => <Placeholder title="Payments Ledger" />;
export const AdminPayoutsTab = () => <Placeholder title="Provider Payouts" />;
export const AdminSubscriptionsTab = () => <Placeholder title="SaaS Subscriptions" />;
export const AdminNotificationsTab = () => <Placeholder title="System Notifications" />;
export const AdminReportsTab = () => <Placeholder title="Reports & Analytics" />;
export const AdminAuditLogTab = () => <Placeholder title="Audit Logs" />;
export const AdminSettingsTab = () => <Placeholder title="Admin Settings" />;
export const AdminSupportTab = () => <Placeholder title="Support & Tickets" />;
