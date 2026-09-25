import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { reviewApi } from "../../services/reviewApi";
import { IMAGE_URL } from "../../services/axiosClient";

const ReviewModel = ({
  selectedBookingForReview,
  setReviewModalOpen,
  existingReview,
}) => {
  // console.log(selectedBookingForReview);
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(existingReview?.message || "");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImagesList, setExistingImagesList] = useState(
    existingReview?.images || [],
  );

  const queryClient = useQueryClient();

  const { mutate: addReview, isPending: isAdding } = useMutation({
    mutationFn: (data) => reviewApi.addReview(data),
    onSuccess: () => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries(["reviewEligibility"]);
      queryClient.invalidateQueries(["userReviews"]);
      queryClient.invalidateQueries(["bookingReview"]);
      closeModal();
    },
    onError: () => toast.error("Failed to add review"),
  });

  const { mutate: deleteReview, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      reviewApi.deleteReview({ review_uuid: existingReview.review_uuid }),
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries(["bookingReview"]);
      queryClient.invalidateQueries(["reviewEligibility"]);
      queryClient.invalidateQueries(["userReviews"]);
      closeModal();
    },
    onError: () => toast.error("Failed to delete review"),
  });

  const { mutate: deleteImage } = useMutation({
    mutationFn: (image_uuid) =>
      reviewApi.deleteReviewImages({
        review_uuid: existingReview.review_uuid,
        image_uuid,
      }),
    onSuccess: (_, image_uuid) => {
      toast.success("Image deleted");
      setExistingImagesList((prev) =>
        prev.filter((img) => img.image_uuid !== image_uuid),
      );
      queryClient.invalidateQueries(["bookingReview"]);
      queryClient.invalidateQueries(["userReviews"]);
    },
    onError: () => toast.error("Failed to delete image"),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length + existingImagesList.length > 5) {
      toast.error("You can only have up to 5 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }

    const formData = new FormData();
    if (!existingReview) {
      const targetId =
        selectedBookingForReview.booking_uuid ||
        selectedBookingForReview.uuid ||
        selectedBookingForReview.instant_booking_uuid ||
        selectedBookingForReview.id;
      const bookingType = selectedBookingForReview.booking_type;
      if (bookingType === "INSTANT") {
        formData.append("instant_booking_uuid", targetId);
      } else {
        formData.append("booking_uuid", targetId);
      }
    }

    formData.append("rating", rating);
    if (reviewText) formData.append("message", reviewText);

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (existingReview) {
      return;
    } else {
      addReview(formData);
    }
  };

  const closeModal = () => {
    setReviewModalOpen(false);
    setRating(0);
    setReviewText("");
    setImages([]);
    imagePreviews.forEach(URL.revokeObjectURL);
    setImagePreviews([]);
  };

  const isWorking = isAdding || isDeleting;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface-primary rounded-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 shadow-2xl relative max-h-[90vh] sm:max-h-[85vh] overflow-y-auto styled-scrollbar"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="mb-4 sm:mb-6 pr-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary mb-1 sm:mb-2">
            {existingReview ? "Update Review" : "Rate your experience"}
          </h3>
          <p className="text-zinc-500 font-medium text-xs sm:text-sm">
            {existingReview ? (
              "Modify your feedback below."
            ) : (
              <>
                How was the service provided by{" "}
                <span className="font-bold text-text-primary">
                  {selectedBookingForReview?.business?.name ||
                    "the professional"}
                </span>
                ?
              </>
            )}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-zinc-500 mb-2 sm:mb-3">
              Rating
            </label>
            <div className="flex gap-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer transition-transform hover:scale-110 ${
                    star <= (hoverRating || rating)
                      ? "fill-current"
                      : "text-zinc-200 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-zinc-500 mb-1.5 sm:mb-2">
              Review Details (Optional)
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us what you liked or what could be improved..."
              className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:border-zinc-500 transition-colors resize-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-zinc-500 mb-1.5 sm:mb-2">
              Add Photos (Optional)
            </label>

            {(existingImagesList.length > 0 || imagePreviews.length > 0) && (
              <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3 overflow-x-auto py-1">
                <AnimatePresence>
                  {/* Existing Images */}
                  {existingImagesList.map((img) => (
                    <motion.div
                      key={img.image_uuid}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border border-border-primary group"
                    >
                      <img
                        src={IMAGE_URL + img.image}
                        alt="Existing"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => deleteImage(img.image_uuid)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                    </motion.div>
                  ))}

                  {/* New Image Previews */}
                  {imagePreviews.map((preview, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      key={preview}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border border-border-primary group"
                    >
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <label className="flex items-center justify-center gap-2 w-full px-3 py-2 sm:px-4 sm:py-3 bg-surface-secondary text-text-primary font-bold text-sm sm:text-base rounded-xl border border-dashed border-zinc-400 hover:border-zinc-500 hover:bg-zinc-200 transition-colors cursor-pointer">
              <ImagePlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
            {existingReview && (
              <button
                type="button"
                onClick={() => deleteReview()}
                disabled={isWorking}
                className="flex-none px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-red-600/10 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={closeModal}
              disabled={isWorking}
              className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-surface-accent text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            {!existingReview && <button
              onClick={handleSubmitReview}
              disabled={isWorking}
              className="btn-primary flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-text-primary text-surface-primary font-bold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isAdding ? "Saving..." : "Submit Review"}
            </button>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModel;
