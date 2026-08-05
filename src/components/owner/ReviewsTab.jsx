import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

const INITIAL_REVIEWS = [
  { id: 1, customer: 'Emily R.', rating: 5, date: 'Oct 20, 2026', comment: 'Absolutely fantastic service! The technician arrived on time and fixed my AC within an hour. Highly recommend.', reply: 'Thank you for the kind words, Emily! We are always here to help.' },
  { id: 2, customer: 'Mark T.', rating: 4, date: 'Oct 15, 2026', comment: 'Good work, but they were a bit late due to traffic. The repair itself was solid.', reply: null },
  { id: 3, customer: 'Sarah L.', rating: 5, date: 'Oct 10, 2026', comment: 'Very professional and clean. They wore shoe covers and left the place spotless.', reply: null },
];

const RatingStars = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-700 text-zinc-700'}`} 
      />
    ))}
  </div>
);

const ReviewsTab = () => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [draftReplies, setDraftReplies] = useState({});

  const handleReplyChange = (id, text) => {
    setDraftReplies({ ...draftReplies, [id]: text });
  };

  const submitReply = (id) => {
    const text = draftReplies[id];
    if (!text || text.trim() === "") return;
    
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: text } : r));
    setDraftReplies({ ...draftReplies, [id]: "" });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">Reviews</h1>
          <p className="text-zinc-400">See what customers are saying about your work.</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-text-primary tracking-tight mb-1">4.8 <span className="text-xl text-zinc-500">/ 5</span></p>
          <RatingStars rating={5} />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border-primary flex items-center justify-center font-bold text-text-primary">
                  {review.customer.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{review.customer}</h4>
                  <p className="text-xs text-zinc-500">{review.date}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} />
            </div>

            <p className="text-text-primary font-medium leading-relaxed mb-6">"{review.comment}"</p>

            {review.reply ? (
              <div className="bg-surface-secondary rounded-2xl p-4 border border-border-primary ml-4 md:ml-12 relative">
                <div className="absolute -left-3 top-4 w-3 h-px bg-border-primary"></div>
                <div className="absolute -left-3 top-0 w-px h-4 bg-border-primary"></div>
                <h5 className="font-bold text-sm text-text-primary mb-1">Your Reply</h5>
                <p className="text-sm text-zinc-500 font-medium">{review.reply}</p>
              </div>
            ) : (
              <div className="ml-0 md:ml-12 flex gap-2">
                <input 
                  type="text" 
                  value={draftReplies[review.id] || ""}
                  onChange={(e) => handleReplyChange(review.id, e.target.value)}
                  placeholder="Write a reply..." 
                  className="flex-grow bg-surface-secondary border border-border-primary rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-text-primary font-medium transition-colors"
                />
                <button 
                  onClick={() => submitReply(review.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-dark text-text-inverted font-bold text-sm rounded-xl hover:scale-[0.98] transition-transform shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> Reply
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default ReviewsTab;
