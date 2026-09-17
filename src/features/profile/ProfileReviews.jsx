import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Star, MessageSquareQuote, Trash2, X, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { reviewApi } from "../../services/reviewApi";
import { dateFormater, dateMonthYearFormater } from "../../utils/dateFormater";
import { IMAGE_URL } from "../../services/axiosClient";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProfileReviews = () => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState({ type: null, reviewId: null, imageId: null });

  const { data, isLoading, error } = useQuery({
    queryKey: ["userReviews"],
    queryFn: reviewApi.getMyReviews,
  });

  const reviewsData = Array.isArray(data?.data) ? data.data : [];

  const { mutate: deleteReview, isPending: isDeletingReview } = useMutation({
    mutationFn: ({ review_uuid }) => reviewApi.deleteReview({ review_uuid }),
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries(["userReviews"]);
      setConfirmDelete({ type: null, reviewId: null, imageId: null });
    },
    onError: () => {
      toast.error("Failed to delete review");
      setConfirmDelete({ type: null, reviewId: null, imageId: null });
    },
  });

  const { mutate: deleteImage, isPending: isDeletingImage } = useMutation({
    mutationFn: ({ review_uuid, image_uuid }) => reviewApi.deleteReviewImages({ review_uuid, image_uuid }),
    onSuccess: () => {
      toast.success("Image deleted successfully");
      queryClient.invalidateQueries(["userReviews"]);
      setConfirmDelete({ type: null, reviewId: null, imageId: null });
    },
    onError: () => {
      toast.error("Failed to delete image");
      setConfirmDelete({ type: null, reviewId: null, imageId: null });
    },
  });

  const confirmAction = () => {
    if (confirmDelete.type === "REVIEW") {
      deleteReview({ review_uuid: confirmDelete.reviewId });
    } else if (confirmDelete.type === "IMAGE") {
      deleteImage({ review_uuid: confirmDelete.reviewId, image_uuid: confirmDelete.imageId });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            My Reviews
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Track and manage feedback you've shared.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-surface-secondary border border-border-primary rounded-[1.5rem] p-6 h-48 animate-pulse"
            />
          ))}
        </div>
      ) : reviewsData.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl"
        >
          {reviewsData.map((review) => (
            <motion.div
              variants={itemVariants}
              key={review.review_uuid}
              className="bg-surface-primary border border-border-primary rounded-[1.5rem] p-6 md:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group shadow-sm hover:shadow-lg relative flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-lg text-text-primary group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {review.businessName || "Unknown Service"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-current text-amber-500"
                              : "text-zinc-200 dark:text-zinc-700 fill-current"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-bold text-text-secondary bg-surface-secondary px-3 py-1.5 rounded-full border border-border-primary whitespace-nowrap">
                    {dateFormater(review?.created_at)}
                  </span>
                  <button
                    onClick={() => setConfirmDelete({ type: "REVIEW", reviewId: review.review_uuid, imageId: null })}
                    className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow mb-6 relative">
                <MessageSquareQuote className="absolute -top-1 -left-2 w-8 h-8 text-zinc-100 dark:text-zinc-800 -z-10 rotate-12" />
                <p className="text-sm font-medium text-text-primary leading-relaxed z-10 relative">
                  "{review.message || "No comment provided."}"
                </p>
              </div>

              {/* Image Grid */}
              {review?.images && review.images.length > 0 && (
                <div className="pt-4 border-t border-border-primary mt-auto">
                  <div className="flex flex-wrap gap-3">
                    {review.images.map((image) => (
                      <div
                        key={image?.image_uuid}
                        className="relative group/img w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-border-primary cursor-pointer"
                      >
                        <img
                          src={IMAGE_URL + image?.image}
                          alt="Review attachment"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2">
                          <p className="text-[0.6rem] font-bold text-white leading-tight">
                            {dateMonthYearFormater(image?.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete({ type: "IMAGE", reviewId: review.review_uuid, imageId: image.image_uuid });
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity text-white hover:bg-red-500 cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 px-6 bg-surface-secondary rounded-[2rem] border border-border-primary shadow-inner"
        >
          <div className="w-20 h-20 bg-surface-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border-primary">
            <Star className="w-10 h-10 text-amber-500 fill-amber-500/20" />
          </div>
          <h3 className="text-xl font-black text-text-primary mb-3 tracking-tight">
            No Reviews Yet
          </h3>
          <p className="text-text-secondary font-medium max-w-md mx-auto leading-relaxed">
            Once you complete a service, you can leave a review and share your
            experience with other users.
          </p>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete.type && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-sm w-full p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setConfirmDelete({ type: null, reviewId: null, imageId: null })}
                className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertCircle size={24} />
                <h3 className="text-xl font-black tracking-tight text-text-primary">
                  Delete {confirmDelete.type === "REVIEW" ? "Review" : "Image"}?
                </h3>
              </div>
              <p className="text-zinc-500 font-medium text-sm mb-8 leading-relaxed">
                Are you sure you want to delete this {confirmDelete.type === "REVIEW" ? "review" : "image"}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete({ type: null, reviewId: null, imageId: null })}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  disabled={isDeletingReview || isDeletingImage}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 text-sm"
                >
                  {isDeletingReview || isDeletingImage ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileReviews;
