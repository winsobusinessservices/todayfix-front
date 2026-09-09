import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ClipboardCheck,
  LayoutGrid,
  MessagesSquare,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router";

const reasons = [
  {
    number: "01",
    title: "Matches built around your need",
    description:
      "Tell us what needs fixing and discover relevant professionals without scrolling through unrelated listings.",
    icon: SlidersHorizontal,
  },
  {
    number: "02",
    title: "Compare before you commit",
    description:
      "Review profiles, services, ratings, and quotes side by side—then choose what feels right for you.",
    icon: LayoutGrid,
  },
  {
    number: "03",
    title: "Everything stays in one place",
    description:
      "Keep booking details, conversations, and service progress together instead of chasing updates across apps.",
    icon: MessagesSquare,
  },
  {
    number: "04",
    title: "From small fixes to big projects",
    description:
      "Handle everyday repairs and larger home projects through one familiar, straightforward experience.",
    icon: ClipboardCheck,
  },
];

const WhyChooseTodayFix = () => {
  return (
    <section
      className="relative overflow-hidden bg-surface-dark px-5 py-20 font-sans text-text-inverted md:px-8 md:py-28"
      aria-labelledby="why-todayfix-heading"
    >
      <div className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full border border-white/10" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Why choose TodayFix
            </span>
          </div>

          <h2
            id="why-todayfix-heading"
            className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            More control,
            <span className="mt-1 block text-zinc-500">at every step.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            TodayFix helps you move from “I need this done” to “it’s handled”
            with fewer tabs, fewer calls, and clearer choices.
          </p>

          <Link
            to="/services"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black"
          >
            Explore services
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative min-h-64 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 transition-colors duration-300 hover:bg-white/[0.09] md:p-8 ${
                  index % 2 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.2em] text-zinc-600">
                    {reason.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTodayFix;
