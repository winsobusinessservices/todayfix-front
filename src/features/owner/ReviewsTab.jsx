import React, { useState } from "react";
import { Star, MessageSquare, Inbox } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "../../services/reviewApi";
import { useOutletContext } from "react-router";
import { dateFormater } from "../../utils/dateFormater";
import { IMAGE_URL } from "../../services/axiosClient";

const RatingStars = ({ rating }) => {
  const numRating = Number(rating) || 0;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= numRating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-zinc-700 text-zinc-700"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewsTab = () => {
  const profile = useOutletContext();
  const businessUuid =
    profile?.business_uuid || profile?.uuid || profile?.business_profile_uuid;

  const [draftReplies, setDraftReplies] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["businessRatingSummary", businessUuid],
    queryFn: () => reviewApi.ratingSummary({ business_uuid: businessUuid }),
    enabled: !!businessUuid,
  });

  const summaryData = data?.data || data || {};

  const averageRating = summaryData.average_rating || 0;
  const totalReviews = summaryData.total_reviews || 0;

  const reviews = Array.isArray(summaryData.results)
    ? summaryData.results
    : Array.isArray(summaryData.reviews)
      ? summaryData.reviews
      : [];

  const handleReplyChange = (id, text) => {
    setDraftReplies({ ...draftReplies, [id]: text });
  };

  const submitReply = (id) => {
    const text = draftReplies[id];
    if (!text || text.trim() === "") return;
    setDraftReplies({ ...draftReplies, [id]: "" });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-surface-secondary rounded-2xl w-full"></div>
        <div className="h-40 bg-surface-secondary rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
            Reviews
          </h1>
          <p className="text-zinc-400">
            See what customers are saying about your work.
          </p>
        </div>
        <div className="sm:text-right bg-surface-secondary border border-border-primary rounded-2xl p-4 flex sm:block items-center gap-4">
          <div>
            <p className="text-4xl font-black text-text-primary tracking-tight mb-1">
              {Number(averageRating).toFixed(1)}{" "}
              <span className="text-xl text-zinc-500">/ 5</span>
            </p>
            <RatingStars rating={averageRating} />
          </div>
          <div className="sm:mt-2 text-sm text-zinc-500 font-medium">
            Based on {totalReviews} review{totalReviews !== 1 && "s"}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {reviews.map((review) => (
            <div
              key={review.id || review.review_uuid}
              className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-surface-secondary border border-border-primary flex items-center justify-center font-bold text-text-primary">
                    {review?.customer}
                    {/* {console.log(review)} */}
                  </div>
                  <div>
                    <span className="flex items-center gap-2">
                      <h4 className="font-bold text-text-primary">
                        {review.customer ||
                          review.user?.first_name ||
                          "Anonymous"}
                      </h4>
                      <RatingStars rating={review.rating} />
                    </span>
                    <p className="text-xs text-zinc-500">
                      {dateFormater(review?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {review?.images?.map((image) => (
                  <span key={image?.image_uuid}>
                    <img
                      src={IMAGE_URL + image?.image}
                      alt=""
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  </span>
                ))}
              </div>

              <p className="text-text-primary font-medium leading-relaxed mb-6">
                "{review.comment || review.message || "No comment."}"
              </p>

              {/* {review.reply ? (
                <div className="bg-surface-secondary rounded-2xl p-4 border border-border-primary ml-4 md:ml-12 relative">
                  <div className="absolute -left-3 top-4 w-3 h-px bg-border-primary"></div>
                  <div className="absolute -left-3 top-0 w-px h-4 bg-border-primary"></div>
                  <h5 className="font-bold text-sm text-text-primary mb-1">
                    Your Reply
                  </h5>
                  <p className="text-sm text-zinc-500 font-medium">
                    {review.reply}
                  </p>
                </div>
              ) : (
                <div className="ml-0 md:ml-10 flex gap-2">
                  <input
                    type="text"
                    value={draftReplies[review.id || review.review_uuid] || ""}
                    onChange={(e) =>
                      handleReplyChange(
                        review.id || review.review_uuid,
                        e.target.value,
                      )
                    }
                    placeholder="Write a reply..."
                    className="flex-grow bg-surface-secondary border border-border-primary rounded-xl px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-text-primary focus:outline-none focus:border-text-primary font-medium transition-colors"
                  />
                  <button
                    onClick={() => submitReply(review.id || review.review_uuid)}
                    className="flex items-center justify-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-surface-dark text-text-inverted font-bold text-xs md:text-sm rounded-xl hover:scale-[0.98] transition-transform shadow-md"
                  >
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4" /> Reply
                  </button>
                </div>
              )} */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface-primary rounded-3xl border border-border-primary shadow-sm">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border-primary shadow-inner">
            <Inbox className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            No Reviews Yet
          </h3>
          <p className="text-zinc-500 max-w-sm mx-auto">
            When customers leave a review for your services, they will appear
            here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
