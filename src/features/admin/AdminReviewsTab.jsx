import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { Star, MessageSquareWarning } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_REVIEWS = [
  { id: "REV-901", customer: "Priya Sharma", provider: "Sparkle Clean", service: "Deep Cleaning", rating: 5, review: "Excellent work, very professional team.", date: "Aug 11, 2026", status: "Published" },
  { id: "REV-902", customer: "Rahul V", provider: "AC Experts", service: "AC Repair", rating: 4, review: "Good service but arrived 15 mins late.", date: "Aug 10, 2026", status: "Published" },
  { id: "REV-903", customer: "Amit Patel", provider: "Urban Plumbers", service: "Pipe Fix", rating: 1, review: "Terrible experience. The pipe is still leaking and they charged me double.", date: "Aug 09, 2026", status: "Reported" },
  { id: "REV-904", customer: "Neha Gupta", provider: "Elite Painters", service: "Wall Painting", rating: 5, review: "Beautiful finish and cleaned up afterwards.", date: "Aug 08, 2026", status: "Published" },
  { id: "REV-905", customer: "John Doe", provider: "FixIt All", service: "TV Mount", rating: 2, review: "Very unprofessional behavior.", date: "Aug 07, 2026", status: "Hidden" },
];

const AdminReviewsTab = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterReported, setFilterReported] = useState(false);

  // View Context modal state
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [contextReview, setContextReview] = useState(null);

  // Message Customer modal state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageReview, setMessageReview] = useState(null);
  const [messageText, setMessageText] = useState("");

  const displayedReviews = filterReported
    ? reviews.filter((r) => r.status === "Reported" || r.status === "Hidden")
    : reviews;

  // Dynamic Platform Average Calculation
  const platformAvg = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsMessageModalOpen(false);
    toast.success(`Message sent to ${messageReview?.customer}!`);
    setMessageText("");
    setMessageReview(null);
  };

  const columns = [
    { 
      header: "Review details", 
      accessor: "review",
      render: (row) => (
        <div className="max-w-md">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < row.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'}`} />
            ))}
          </div>
          <p className="font-medium text-text-primary text-sm line-clamp-2">"{row.review}"</p>
        </div>
      )
    },
    { 
      header: "Context", 
      accessor: "service",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary text-sm">{row.service}</p>
          <p className="text-xs text-text-secondary">By {row.customer} to {row.provider}</p>
        </div>
      )
    },
    { header: "Date", accessor: "date", render: (row) => <span className="text-sm text-text-secondary">{row.date}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Reviews & Ratings</h2>
          <p className="text-text-secondary font-medium mt-1">Monitor platform sentiment and manage reported reviews.</p>
        </div>
        <button 
          onClick={() => setFilterReported((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-bold shadow-sm hover:bg-rose-100 transition-colors cursor-pointer"
        >
          <MessageSquareWarning className="w-4 h-4" /> {filterReported ? "Show All Reviews" : `View Reported (${reviews.filter(r => r.status === "Reported" || r.status === "Hidden").length})`}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Platform Average", value: `${platformAvg} / 5`, color: "text-text-primary" },
          { label: "Total Reviews", value: reviews.length.toLocaleString(), color: "text-text-primary" },
          { label: "Reported Reviews", value: reviews.filter(r => r.status === "Reported").length, color: "text-rose-600" },
          { label: "Hidden", value: reviews.filter(r => r.status === "Hidden").length, color: "text-zinc-500" },
        ].map((stat, i) => (
           <div key={i} className="bg-surface-primary border border-border-primary rounded-2xl p-5 shadow-sm">
             <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
             <p className={`text-2xl font-black mt-2 ${stat.color} flex items-center gap-2`}>
                {i === 0 && <Star className="w-5 h-5 text-amber-400 fill-amber-400" />}
                {stat.value}
             </p>
           </div>
        ))}
      </div>

      <DataTable 
        columns={columns}
        data={displayedReviews}
        searchPlaceholder="Search reviews, customers, or providers..."
        onRowClick={(row) => {
          setSelectedReview(row);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedReview(row);
          setIsModalOpen(true);
        }}
      />

      {selectedReview && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Review Details"
          footer={
            <select
              onChange={(e) => {
                const action = e.target.value;
                e.target.value = ""; // Reset dropdown
                if (action === "view") {
                  setContextReview(selectedReview);
                  setIsContextModalOpen(true);
                  setIsModalOpen(false);
                } else if (action === "message") {
                  setMessageReview(selectedReview);
                  setMessageText("");
                  setIsMessageModalOpen(true);
                  setIsModalOpen(false);
                } else if (action === "publish") {
                  setReviews((prev) =>
                    prev.map((item) => (item.id === selectedReview.id ? { ...item, status: "Published" } : item))
                  );
                  setSelectedReview((prev) => (prev ? { ...prev, status: "Published" } : prev));
                  toast.success("Review has been approved and published.");
                } else if (action === "hide") {
                  setReviews((prev) =>
                    prev.map((item) => (item.id === selectedReview.id ? { ...item, status: "Hidden" } : item))
                  );
                  setSelectedReview((prev) => (prev ? { ...prev, status: "Hidden" } : prev));
                  toast.success("Review has been hidden from the platform.");
                } else if (action === "delete") {
                  setReviews((prev) => prev.filter((item) => item.id !== selectedReview.id));
                  toast.success("Review deleted permanently.");
                  setIsModalOpen(false);
                }
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select Action...</option>
              <option value="view">View Context</option>
              <option value="message">Message Customer</option>
              {selectedReview.status !== "Published" && (
                <option value="publish">Publish Review</option>
              )}
              {selectedReview.status !== "Hidden" && (
                <option value="hide">Hide from Platform</option>
              )}
              <option value="delete">Delete Review</option>
            </select>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="flex justify-between items-center pb-3 border-b border-border-primary">
              <div>
                <h4 className="text-lg font-bold">{selectedReview.id}</h4>
                <p className="text-xs text-text-secondary">Customer: {selectedReview.customer} | Provider: {selectedReview.provider}</p>
              </div>
              <StatusBadge status={selectedReview.status} />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Rating & Review</p>
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < selectedReview.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'}`} />
                  ))}
                  <span className="ml-1 font-bold text-xs">({selectedReview.rating}/5)</span>
                </div>
                <p className="p-3 bg-surface-secondary rounded-xl text-text-primary italic">"{selectedReview.review}"</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Service</p>
                  <p className="font-semibold">{selectedReview.service}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Date</p>
                  <p className="font-semibold">{selectedReview.date}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Customer</p>
                  <p className="font-semibold">{selectedReview.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">Provider</p>
                  <p className="font-semibold">{selectedReview.provider}</p>
                </div>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* View Context Modal */}
      {contextReview && (
        <AdminModal
          isOpen={isContextModalOpen}
          onClose={() => {
            setIsContextModalOpen(false);
            setContextReview(null);
          }}
          title="Review Context Details"
          footer={
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsContextModalOpen(false);
                  setContextReview(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-text-primary">
            <div className="pb-3 border-b border-border-primary">
              <h4 className="text-lg font-bold">{contextReview.service}</h4>
              <p className="text-xs text-text-secondary">Review ID: {contextReview.id} • Date: {contextReview.date}</p>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Customer Info</p>
                <p className="font-semibold">{contextReview.customer}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Provider</p>
                <p className="font-semibold">{contextReview.provider}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Service Details</p>
                <p className="font-semibold">{contextReview.service}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase">Full Review Text</p>
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < contextReview.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'}`} />
                  ))}
                  <span className="ml-1 font-bold text-xs">({contextReview.rating}/5)</span>
                </div>
                <p className="p-3 bg-surface-secondary rounded-xl text-text-primary italic">"{contextReview.review}"</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Message Customer Modal */}
      {messageReview && (
        <AdminModal
          isOpen={isMessageModalOpen}
          onClose={() => {
            setIsMessageModalOpen(false);
            setMessageReview(null);
          }}
          title={`Message ${messageReview.customer}`}
          footer={
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsMessageModalOpen(false);
                  setMessageReview(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          }
        >
          <form className="space-y-4" onSubmit={handleSendMessage}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">Customer</label>
              <input
                type="text"
                disabled
                value={messageReview.customer}
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary opacity-80 cursor-not-allowed"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">Regarding Review</label>
              <input
                type="text"
                disabled
                value={`${messageReview.id} - ${messageReview.service} (${messageReview.rating}★)`}
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary opacity-80 cursor-not-allowed"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase">Message</label>
              <textarea
                placeholder="Write a message to the customer..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500 min-h-[100px]"
              />
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminReviewsTab;

