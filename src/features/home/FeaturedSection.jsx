import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { featuredData as businesses } from "../../data/collectedData";

const FeaturedSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="w-full border-t border-border-secondary bg-[#fbfaff] pb-20 pt-20 font-sans dark:bg-surface-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col  mb-16 gap-6"
        >
          <div className="max-w-full flex md:items-center md:justify-between gap-6 flex-col md:flex-row">
            <h2 className="text-4xl text-center md:text-5xl lg:text-6xl font-extrabold text-text-primary  tracking-tight leading-tight">
              Featured
              <span className="text-primary"> Businesses.</span>
            </h2>

             <button
            onClick={() => navigate("/services")}
            className="btn-primary shrink-0 h-12 px-6 rounded-full font-medium hover:scale-105 transition-transform duration-300"
          >
            View All Providers
          </button>
          </div>
             <p className="text-lg text-text-secondary leading-relaxed line-height-[1.6]">
            Connect with highly vetted, top-performing local businesses you can trust. TodayFix makes it easy to discover reliable service providers, explore their services, and find the right professionals for your needs. We bring quality businesses closer to you, helping you make confident decisions and get the job done with ease.
             <br />
        
            Whether you need a quick repair, regular maintenance, or a specialized service, you can explore trusted providers all in one place. Find businesses that match your requirements and enjoy a simple, convenient way to get the services you need.

            </p>

        </motion.div>

        {/* Standard Grid (3 columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[420px]">
          {businesses.map((business, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={business.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex min-h-[430px] cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-border-primary bg-surface-primary shadow-[0_14px_40px_rgba(76,29,149,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-soft hover:shadow-[0_22px_55px_rgba(76,29,149,0.15)] dark:bg-[#221b2e] ${
                  isHovered ? "z-10" : ""
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={business.bg}
                    alt={business.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                  <div
                    className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-sm backdrop-blur-md"
                  >
                    {business.service}
                  </div>
                  <div
                    className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-zinc-950/80 px-3.5 py-2 text-sm font-bold text-white shadow-sm backdrop-blur-md"
                  >
                    <svg
                      className="h-4 w-4 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {business.rating}
                  </div>
                </div>

                {/* Bottom: Details & Action */}
                <div className="relative flex flex-1 flex-col px-6 pb-6 pt-11 md:px-7">
                  <div className="absolute -top-8 left-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-surface-primary bg-white p-2 shadow-lg dark:border-[#221b2e]">
                    <img
                      src={business.logo}
                      alt={`${business.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="relative z-10 flex h-full flex-col gap-2">
                    <h3 className="text-2xl font-extrabold tracking-tight text-text-primary">
                      {business.name}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                      {business.description}
                    </p>
                    <Link
                      to={"/partners/" + business.name.split(" ").join("-")}
                      className="mt-auto flex items-center justify-between border-t border-border-primary pt-5"
                    >
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {business.location}
                      </span>

                      {/* View Action - Translates on hover */}
                      <motion.div
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-button-primary text-button-primary-text shadow-md shadow-brand-primary/20 transition-colors group-hover:bg-button-primary-hover"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

{
  /* Middle: Empty space for layout balance, or custom illustration */
}
// <div className="flex-grow flex items-center justify-center my-6 z-10">
//   <motion.div
//     animate={
//       isHovered
//         ? { scale: 1.1, rotate: 2 }
//         : { scale: 1, rotate: 0 }
//     }
//     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${
//       isFeatured ? "bg-white/10" : "bg-black/5"
//     }`}
//   >
//     <img
//       src={business.logo}
//       alt={business.name}
//       className="rounded-full h-full w-full"
//     />
//     {/* <svg
//       className={`w-10 h-10 ${
//         isFeatured ? "text-text-inverted" : "text-text-primary"
//       }`}
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={1.5}
//     >
//       {business.icon}
//     </svg> */}
//   </motion.div>
// </div>

// {/* Bottom: Details & Action */}
// <div className="relative z-10 flex flex-col gap-2">
//   <h3 className="font-bold tracking-tight text-2xl md:text-3xl text-text-inverted">
//     {business.name}
//   </h3>
//   <p className={`text-sm leading-relaxed max-w-md text-white`}>
//     {business.description}
//   </p>
//   <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
//     <span
//       className={`text-sm font-medium flex items-center gap-1.5 text-white/80`}
//     >
//       <svg
//         className="w-4 h-4"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//       </svg>
//       {business.location}
//     </span>

//     {/* View Action - Translates on hover */}
//     <motion.div
//       animate={isHovered ? { x: 5 } : { x: 0 }}
//       className={`p-2 rounded-full ${
//         isFeatured
//           ? "bg-surface-primary text-text-primary"
//           : "bg-surface-dark text-text-inverted"
//       }`}
//     >
//       <svg
//         className="w-4 h-4"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//         />
//       </svg>
//     </motion.div>
//   </div>
// </div>
