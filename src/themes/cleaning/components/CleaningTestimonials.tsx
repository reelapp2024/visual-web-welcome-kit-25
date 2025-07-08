import React, { useEffect, useState } from "react";
import { httpFile } from "../../../config.js";
import { Star, StarHalf, Quote } from "lucide-react";

interface Testimonial {
  review_text: string;
  customer_image: string;
  customer_name: string;
  rating: number | string;
}

const CleaningTestimonials: React.FC = () => {
  const [projectReviews, setProjectReviews] = useState<Testimonial[]>([]);

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/fetch_faq_reviews", {
          projectId,
        });

        if (data) {

          setProjectReviews(data.testimonials || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <section className="py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied
            customers have to say about our cleaning services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectReviews.map((testimonial, index) => {
            // 1) Coerce rating into a number:
            const rawRating = Number(testimonial.rating) || 0;
            // 2) Compute how many full stars:
            const fullStars = Math.floor(rawRating);
            // 3) Check if there's a half star (only one half max):
            const hasHalf = rawRating - fullStars >= 0.5;
            // 4) Remaining empty stars to reach 5 total:
            const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col"
              >
                <div className="mb-6 flex-grow">
                  <Quote className="w-10 h-10 text-green-500 mb-4 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed text-lg">
                    "{testimonial.review_text}"
                  </p>
                </div>

                <div className="flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.customer_name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.customer_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    {/* Full stars */}
                    {[...Array(fullStars)].map((_, i) => (
                      <Star
                        key={`full-${index}-${i}`}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                    {/* One half star if needed */}
                    {hasHalf && (
                      <StarHalf
                        key={`half-${index}`}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    )}
                    {/* Empty stars */}
                    {[...Array(emptyStars)].map((_, i) => (
                      <Star
                        key={`empty-${index}-${i}`}
                        className="w-5 h-5 text-gray-300 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CleaningTestimonials;
