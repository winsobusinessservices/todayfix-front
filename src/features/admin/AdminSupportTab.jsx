import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { LifeBuoy, MessageSquare, AlertTriangle, CheckCircle2, Send } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_TICKETS = [
  { id: "TKT-1042", subject: "Provider didn't show up", user: "Jane Doe (Customer)", priority: "High", status: "Open", date: "Aug 11, 2026, 14:30", resolutionHours: 0 },
  { id: "TKT-1041", subject: "Payment deducted but request failed", user: "Rahul V (Customer)", priority: "Critical", status: "Investigating", date: "Aug 11, 2026, 11:15", resolutionHours: 0 },
  { id: "TKT-1040", subject: "Customer refused to pay balance", user: "AC Experts (Provider)", priority: "High", status: "Open", date: "Aug 10, 2026, 16:45", resolutionHours: 0 },
  { id: "TKT-1039", subject: "How to upgrade to Pro plan?", user: "Elite Painters (Business)", priority: "Low", status: "Resolved", date: "Aug 10, 2026, 09:20", resolutionHours: 2.5 },
  { id: "TKT-1038", subject: "Service quality was very poor", user: "Amit Patel (Customer)", priority: "Medium", status: "Resolved", date: "Aug 09, 2026, 18:05", resolutionHours: 6.5 },
];

const MOCK_CONVERSATIONS = {
  "TKT-1042": [
    { sender: "Jane Doe", text: "I booked a home cleaning for 2 PM but nobody arrived.", time: "Aug 11, 14:30", isUser: true },
    { sender: "Support Agent", text: "We are reaching out to the service provider right now.", time: "Aug 11, 14:45", isUser: false },
  ],
  "TKT-1041": [
    { sender: "Rahul V", text: "₹1,500 was deducted from my account but the app says booking failed.", time: "Aug 11, 11:15", isUser: true },
    { sender: "Support Agent", text: "Our payment gateway team is investigating this issue.", time: "Aug 11, 11:30", isUser: false },
  ],
  "TKT-1040": [
    { sender: "AC Experts", text: "Customer refused to pay the extra ₹500 for replacement parts.", time: "Aug 10, 16:45", isUser: true },
  ],
  "TKT-1039": [
    { sender: "Elite Painters", text: "Can you guide us on how to upgrade to Pro business plan?", time: "Aug 10, 09:20", isUser: true },
    { sender: "Support Agent", text: "You can upgrade directly from your Business Dashboard under Subscription tab.", time: "Aug 10, 11:50", isUser: false },
  ],
  "TKT-1038": [
    { sender: "Amit Patel", text: "The technician left a mess after fixing the tap.", time: "Aug 09, 18:05", isUser: true },
    { sender: "Support Agent", text: "We sincerely apologize. A partial refund has been processed.", time: "Aug 10, 00:35", isUser: false },
  ],
};

const AdminSupportTab = () => {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compose Modal state
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [composeForm, setComposeForm] = useState({ user: "", subject: "", priority: "Medium", message: "" });

  // Conversation Modal state
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false);
  const [conversationTicket, setConversationTicket] = useState(null);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [replyText, setReplyText] = useState("");

  // Dynamic Avg Resolution Metric calculation
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved" && t.resolutionHours > 0);
  const avgResolutionTime = resolvedTickets.length > 0
    ? `${(resolvedTickets.reduce((acc, t) => acc + t.resolutionHours, 0) / resolvedTickets.length).toFixed(1)} Hrs`
    : "N/A";

  const handleComposeSubmit = (e) => {
    e?.preventDefault();
    if (!composeForm.user.trim() || !composeForm.subject.trim()) {
      toast.error("Please provide recipient name and subject");
      return;
    }

    const newTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) + `, ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;

    const newTicketObj = {
      id: newTicketId,
      subject: composeForm.subject.trim(),
      user: composeForm.user.trim(),
      priority: composeForm.priority || "Medium",
      status: "Open",
      date: formattedDate,
      resolutionHours: 0,
    };

    setTickets((prev) => [newTicketObj, ...prev]);

    if (composeForm.message.trim()) {
      setConversations((prev) => ({
        ...prev,
        [newTicketId]: [
          { sender: "Admin (You)", text: composeForm.message.trim(), time: formattedDate, isUser: false },
        ],
      }));
    }

    setComposeForm({ user: "", subject: "", priority: "Medium", message: "" });
    setIsComposeModalOpen(false);
    toast.success(`Message sent and ticket ${newTicketId} created successfully!`);
  };

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim() || !conversationTicket) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newMsg = {
      sender: "Admin (You)",
      text: replyText.trim(),
      time: formattedTime,
      isUser: false,
    };

    setConversations((prev) => ({
      ...prev,
      [conversationTicket.id]: [...(prev[conversationTicket.id] || []), newMsg],
    }));

    setReplyText("");
    toast.success("Reply sent to customer!");
  };

  const columns = [
    { 
      header: "Ticket details", 
      accessor: "subject",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary text-sm line-clamp-1">{row.subject}</p>
          <p className="text-xs text-text-secondary mt-0.5">{row.id} • {row.date}</p>
        </div>
      )
    },
    { header: "Raised By", accessor: "user", render: (row) => <span className="font-medium text-text-primary text-sm">{row.user}</span> },
    { 
      header: "Priority", 
      accessor: "priority",
      render: (row) => {
        let color = "text-zinc-500 bg-zinc-100";
        if(row.priority === "Critical") color = "text-red-600 bg-red-50 font-bold";
        if(row.priority === "High") color = "text-amber-600 bg-amber-50 font-bold";
        return <span className={`px-2 py-1 text-xs rounded-md ${color}`}>{row.priority}</span>;
      }
    },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Support & Disputes</h2>
          <p className="text-text-secondary font-medium mt-1">Manage customer complaints, provider disputes, and general inquiries.</p>
        </div>
        <button
          onClick={() => setIsComposeModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" /> Compose Message
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Open Tickets", value: tickets.filter(t => t.status === "Open").length, color: "text-amber-600", icon: AlertTriangle, bg: "bg-amber-50" },
          { label: "Investigating", value: tickets.filter(t => t.status === "Investigating").length, color: "text-red-600", icon: LifeBuoy, bg: "bg-red-50" },
          { label: "Avg Resolution", value: avgResolutionTime, color: "text-blue-600", icon: MessageSquare, bg: "bg-blue-50" },
          { label: "Resolved Today", value: tickets.filter(t => t.status === "Resolved").length, color: "text-emerald-600", icon: CheckCircle2, bg: "bg-emerald-50" },
        ].map((stat, i) => (
           <div key={i} className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm flex items-center gap-4">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
             </div>
             <div>
               <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
               <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
             </div>
           </div>
        ))}
      </div>

      <DataTable 
        columns={columns}
        data={tickets}
        searchPlaceholder="Search by Ticket ID, User, or Subject..."
        onRowClick={(row) => {
          setSelectedTicket(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedTicket(row);
          setIsModalOpen(true);
        }}
      />

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Ticket Details"
          footer={
            <select
              onChange={(e) => {
                const action = e.target.value;
                e.target.value = ""; // Reset dropdown
                if (action === "view") {
                  setConversationTicket(selectedTicket);
                  setIsConversationModalOpen(true);
                  setIsModalOpen(false);
                } else if (action === "escalate") {
                  setTickets((prev) =>
                    prev.map((t) =>
                      t.id === selectedTicket.id
                        ? { ...t, priority: "Critical", status: "Open" }
                        : t
                    )
                  );
                  setSelectedTicket((prev) =>
                    prev ? { ...prev, priority: "Critical", status: "Open" } : prev
                  );
                  toast.success(`Ticket ${selectedTicket.id} escalated to Level 2.`);
                  setIsModalOpen(false);
                } else if (action === "investigate") {
                  setTickets((prev) =>
                    prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: "Investigating" } : t))
                  );
                  setSelectedTicket((prev) => (prev ? { ...prev, status: "Investigating" } : prev));
                  toast.success(`Now investigating ticket ${selectedTicket.id}.`);
                  setIsModalOpen(false);
                } else if (action === "resolve") {
                  setTickets((prev) =>
                    prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: "Resolved", resolutionHours: t.resolutionHours || 4.0 } : t))
                  );
                  setSelectedTicket((prev) => (prev ? { ...prev, status: "Resolved", resolutionHours: prev.resolutionHours || 4.0 } : prev));
                  toast.success(`Ticket ${selectedTicket.id} marked as resolved.`);
                  setIsModalOpen(false);
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select Action...</option>
              <option value="view">View Conversation</option>
              <option value="escalate">Escalate to Level 2</option>
              {selectedTicket.status !== "Investigating" && selectedTicket.status !== "Resolved" && (
                <option value="investigate">Investigate</option>
              )}
              {selectedTicket.status !== "Resolved" && (
                <option value="resolve">Mark Resolved</option>
              )}
            </select>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedTicket.subject}</h4>
                <p className="text-xs text-text-secondary">{selectedTicket.id} • {selectedTicket.date}</p>
              </div>
              <StatusBadge status={selectedTicket.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Raised By</p>
                <p className="font-semibold">{selectedTicket.user}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Priority</p>
                <p className="font-semibold">{selectedTicket.priority}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Status</p>
                <p className="font-semibold">{selectedTicket.status}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Date</p>
                <p className="font-semibold">{selectedTicket.date}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Compose Message Modal */}
      <AdminModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        title="Compose Support Message"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsComposeModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleComposeSubmit}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Send & Create Ticket
            </button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleComposeSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Recipient / User</label>
            <input
              type="text"
              placeholder="e.g. Jane Doe (Customer) or Provider Name"
              value={composeForm.user}
              onChange={(e) => setComposeForm({ ...composeForm, user: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Subject</label>
            <input
              type="text"
              placeholder="Brief description of the issue"
              value={composeForm.subject}
              onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Priority</label>
            <select
              value={composeForm.priority}
              onChange={(e) => setComposeForm({ ...composeForm, priority: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">Message</label>
            <textarea
              placeholder="Type your message..."
              value={composeForm.message}
              onChange={(e) => setComposeForm({ ...composeForm, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[100px]"
            />
          </div>
        </form>
      </AdminModal>

      {/* View Conversation Modal */}
      {conversationTicket && (
        <AdminModal
          isOpen={isConversationModalOpen}
          onClose={() => setIsConversationModalOpen(false)}
          title={`Conversation: ${conversationTicket.id}`}
          footer={
            <button
              onClick={() => setIsConversationModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4">
            <div className="p-3 bg-surface-secondary rounded-xl border border-border-primary flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-text-primary">{conversationTicket.subject}</p>
                <p className="text-xs text-text-secondary">{conversationTicket.user}</p>
              </div>
              <StatusBadge status={conversationTicket.status} />
            </div>

            {/* Conversation Messages */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {(conversations[conversationTicket.id] || [
                { sender: conversationTicket.user, text: conversationTicket.subject, time: conversationTicket.date, isUser: true }
              ]).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.isUser
                      ? "bg-surface-secondary text-text-primary mr-auto"
                      : "bg-purple-600 text-white ml-auto"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs opacity-75 mb-1 gap-2">
                    <span className="font-bold">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-border-primary">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminSupportTab;

