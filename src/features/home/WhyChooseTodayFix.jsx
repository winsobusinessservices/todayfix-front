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
      className="relative overflow-hidden bg-[#f7f4ff] px-5 py-20 font-sans text-text-primary transition-colors duration-300 md:px-8 md:py-28 dark:bg-[#17131f] dark:text-white"
      aria-labelledby="why-todayfix-heading"
    >
      <div className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full border border-brand-primary/10 dark:border-white/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full border border-brand-primary/10 dark:border-white/10" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand-soft bg-surface-accent px-4 py-2 dark:border-white/15 dark:bg-white/[0.06]">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-brand dark:text-text-on-dark-muted">
              Why choose TodayFix
            </span>
          </div>

          <h2
            id="why-todayfix-heading"
            className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            More control,
            <span className="mt-1 block text-primary dark:text-brand-dark">at every step.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-7 text-text-secondary md:text-lg md:leading-8">
            TodayFix helps you move from “I need this done” to “it’s handled”
            with fewer tabs, fewer calls, and clearer choices.
          </p>

          <Link
            to="/services"
            className="group mt-9 inline-flex items-center gap-3 rounded-full btn-primary px-6 py-3.5 text-sm font-bold text-button-primary-text shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-[1.03] hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-4 focus:ring-offset-[#f7f4ff] dark:focus:ring-offset-[#17131f]"
          >
            Explore services
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 md:gap-6">
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
                className="group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-border-primary bg-white p-7 shadow-[0_16px_45px_rgba(76,29,149,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-soft hover:shadow-[0_22px_55px_rgba(76,29,149,0.13)] md:p-8 dark:border-white/10 dark:bg-[#221b2e] dark:shadow-black/20 dark:hover:border-brand-soft"
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-accent text-brand-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 dark:bg-brand-background dark:text-brand-accent">
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand-primary/55 dark:text-brand-accent/60">
                    {reason.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
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
