import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_DATA = [
  { id: "USR-001", user: { name: "Arjun Mehta", email: "arjun@example.com" }, phone: "+91 98765 43210", role: "Customer", city: "Bengaluru", status: "Active", joined: "2023-11-10", totalRequests: 12 },
  { id: "USR-002", user: { name: "Neha Sharma", email: "neha@example.com" }, phone: "+91 87654 32109", role: "Customer", city: "Mumbai", status: "Suspended", joined: "2024-01-05", totalRequests: 3 },
  { id: "USR-003", user: { name: "Kiran Patel", email: "kiran@example.com" }, phone: "+91 76543 21098", role: "Business Admin", city: "Ahmedabad", status: "Active", joined: "2023-08-22", totalRequests: 45 },
  { id: "USR-004", user: { name: "Priya Singh", email: "priya@example.com" }, phone: "+91 65432 10987", role: "Customer", city: "Delhi", status: "Active", joined: "2024-02-15", totalRequests: 1 },
];

export default function AdminUsersTab() {
  const [users, setUsers] = useState(MOCK_DATA);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", role: "Customer", city: "" });
  const [profileModalUser, setProfileModalUser] = useState(null);
  const [messageModalUser, setMessageModalUser] = useState(null);
  const [messageText, setMessageText] = useState("");

  const columns = [
    {
      header: "User",
      accessor: "user",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary">{row.user.name}</p>
          <p className="text-xs text-text-secondary">{row.user.email}</p>
        </div>
      ),
    },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    { header: "City", accessor: "city" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { header: "Joined", accessor: "joined" },
    { header: "Total Requests", accessor: "totalRequests" },
  ];

  const handleActionChange = (e) => {
    const action = e.target.value;
    e.target.value = ""; // Reset dropdown
    
    if (action === "toggle_suspend") {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
      toast.success(`User ${selectedUser.user.name} has been ${selectedUser.status === "Suspended" ? "reactivated" : "suspended"}.`);
      setIsModalOpen(false);
    } else if (action === "delete") {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      toast.success(`User ${selectedUser.user.name} deleted.`);
      setIsModalOpen(false);
    } else if (action === "reset_pass") {
      toast.success(`Password reset email sent to ${selectedUser.user.email}`);
    } else if (action === "message") {
      setIsModalOpen(false);
      setMessageModalUser(selectedUser);
      setMessageText("");
    } else if (action === "view") {
      setIsModalOpen(false);
      setProfileModalUser(selectedUser);
    }
  };

  const handleAddUser = (e) => {
    e?.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error("Please enter user name and email");
      return;
    }

    const createdUser = {
      id: `USR-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      user: { name: newUser.name.trim(), email: newUser.email.trim() },
      phone: newUser.phone.trim() || "N/A",
      role: newUser.role || "Customer",
      city: newUser.city.trim() || "N/A",
      status: "Active",
      joined: new Date().toISOString().split("T")[0],
      totalRequests: 0,
    };

    setUsers([createdUser, ...users]);
    setNewUser({ name: "", email: "", phone: "", role: "Customer", city: "" });
    setIsAddModalOpen(false);
    toast.success(`User "${createdUser.user.name}" added successfully!`);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    toast.success(`Message sent to ${messageModalUser.user.name}`);
    setMessageModalUser(null);
    setMessageText("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Users Management</h2>
          <p className="text-text-secondary font-medium mt-1">Manage customer and admin accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
          <button 
            onClick={() => toast("User export started")}
            className="px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-200 cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        onRowClick={(row) => {
          setSelectedUser(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedUser(row);
          setIsModalOpen(true);
        }}
      />

      {selectedUser && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="User Details"
          footer={
            <select
              onChange={handleActionChange}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select Action...</option>
              <option value="view">View Profile</option>
              <option value="message">Send Message</option>
              <option value="reset_pass">Reset Password</option>
              <option value="toggle_suspend">
                {selectedUser.status === "Suspended" ? "Reactivate Account" : "Suspend Account"}
              </option>
              <option value="delete">Delete User</option>
            </select>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedUser.user.name}</h4>
                <p className="text-xs text-text-secondary">{selectedUser.user.email}</p>
              </div>
              <StatusBadge status={selectedUser.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">User ID</p>
                <p className="font-semibold">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Phone</p>
                <p className="font-semibold">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Role</p>
                <p className="font-semibold">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">City</p>
                <p className="font-semibold">{selectedUser.city}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Joined Date</p>
                <p className="font-semibold">{selectedUser.joined}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Total Requests</p>
                <p className="font-semibold">{selectedUser.totalRequests}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* View Profile Modal */}
      {profileModalUser && (
        <AdminModal
          isOpen={Boolean(profileModalUser)}
          onClose={() => setProfileModalUser(null)}
          title={`User Profile - ${profileModalUser.user.name}`}
          footer={
            <button
              onClick={() => setProfileModalUser(null)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{profileModalUser.user.name}</h4>
                <p className="text-xs text-text-secondary">{profileModalUser.user.email}</p>
              </div>
              <StatusBadge status={profileModalUser.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">User ID</p>
                <p className="font-semibold">{profileModalUser.id}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Phone</p>
                <p className="font-semibold">{profileModalUser.phone}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Role</p>
                <p className="font-semibold">{profileModalUser.role}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">City</p>
                <p className="font-semibold">{profileModalUser.city}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Joined Date</p>
                <p className="font-semibold">{profileModalUser.joined}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Total Requests</p>
                <p className="font-semibold">{profileModalUser.totalRequests}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Send Message Modal */}
      {messageModalUser && (
        <AdminModal
          isOpen={Boolean(messageModalUser)}
          onClose={() => setMessageModalUser(null)}
          title={`Message User - ${messageModalUser.user.name}`}
          footer={
            <>
              <button 
                onClick={() => setMessageModalUser(null)}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer"
              >
                Send Message
              </button>
            </>
          }
        >
          <form className="space-y-4" onSubmit={handleSendMessage}>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Recipient</label>
              <p className="text-sm font-bold text-text-primary px-4 py-2.5 bg-surface-secondary rounded-xl border border-border-primary">
                {messageModalUser.user.name} ({messageModalUser.user.email})
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Message</label>
              <textarea 
                rows={4}
                placeholder="Write message to user..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
            </div>
          </form>
        </AdminModal>
      )}

      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddUser}
              className="px-4 py-2 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 shadow-lg shadow-black/20 cursor-pointer"
            >
              Add User
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddUser}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Name</label>
            <input 
              type="text" 
              placeholder="e.g. Arjun Mehta"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
            <input 
              type="email" 
              placeholder="e.g. arjun@example.com"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Phone</label>
            <input 
              type="text" 
              placeholder="e.g. +91 98765 43210"
              value={newUser.phone}
              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Role</label>
            <select 
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="Customer">Customer</option>
              <option value="Business Admin">Business Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">City</label>
            <input 
              type="text" 
              placeholder="e.g. Bengaluru"
              value={newUser.city}
              onChange={(e) => setNewUser({...newUser, city: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

