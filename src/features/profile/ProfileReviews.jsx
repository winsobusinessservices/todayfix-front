import { Search } from "lucide-react";
import React from "react";

const ProfileReviews = ({ userReviews }) => {
  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-2xl font-black mb-8">My Reviews</h2>
        {userReviews?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {userReviews.map((review) => (
              <div
                key={review.providerId}
                className="bg-surface-secondary border border-border-secondary rounded-[1.5rem] p-8 hover:border-text-primary transition-all group shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-5">
                  <h3 className="font-black text-lg text-text-primary">
                    {review.businessName}
                  </h3>
                  <span className="text-xs font-bold text-text-muted bg-surface-primary px-3 py-1 rounded-full border border-border-primary">
                    {review.date}
                  </span>
                </div>
                <div className="flex text-amber-500 mb-4 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-border-secondary fill-current"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-text-secondary leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
        {userReviews?.length === 0 && (
          <div className="text-center py-16 bg-surface-secondary rounded-3xl border border-border-primary">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No Reviews Yet
            </h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              Once you complete a service, you can leave a review and share your
              experience with other users.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileReviews;
