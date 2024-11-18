import React from "react";

interface Review {
  id: string;
  author: string;
  content: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {reviews.map((review) => {
            const words = review.content.split(" ");
            const isLongReview = words.length > 40;

            return (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {review.author}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {isLongReview
                    ? words.slice(0, 40).join(" ") + "..."
                    : review.content}
                </p>
                {isLongReview && (
                  <button className="text-blue-500 mt-2">Read more</button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
