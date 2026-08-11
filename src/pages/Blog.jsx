import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SEO from "../components/seo/SEO";

const Blog = () => {
  const featuredPost = {
    title: "How We Maintain a 99% Satisfaction Rate Among Our Top Tier Professionals",
    excerpt: "Quality isn't an accident. Discover the rigorous screening process and continuous support systems we use to ensure every TodayFix professional delivers exceptional service.",
    category: "Inside TodayFix",
    date: "Aug 12, 2026",
    author: "Product Team",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  };

  const posts = [
    {
      title: "5 Essential Tips for Preparing Your Home for a Deep Clean",
      excerpt: "Make the most of your professional cleaning service by following these simple preparation steps.",
      category: "Home Tips",
      date: "Aug 05, 2026",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "The Ultimate Guide to Hiring a Local Electrician",
      excerpt: "Safety first. Learn what credentials to look for and the right questions to ask before hiring an electrician.",
      category: "Guides",
      date: "Jul 28, 2026",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Spotlight: Meet Bangalore's Top Rated Interior Designer",
      excerpt: "An exclusive interview with Sarah M., who has transformed over 50 homes this year through TodayFix.",
      category: "Pro Spotlight",
      date: "Jul 20, 2026",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <main className="min-h-screen bg-surface-secondary font-sans selection:bg-surface-dark selection:text-white pb-24">
      <SEO 
        title="Blog & Insights | TodayFix"
        description="Read the latest news, home improvement tips, and stories from the TodayFix community."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary text-center">
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4">
          TodayFix <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900">Journal</span>
        </h1>
        <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">
          Insights on home improvement, pro highlights, and news from our team.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* Featured Post */}
        <Link to="#" className="block group mb-16">
          <div className="bg-surface-primary rounded-[2rem] border border-border-primary overflow-hidden shadow-sm hover:shadow-xl hover:border-black transition-all flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider">
                <span className="text-text-primary bg-surface-secondary px-3 py-1 rounded-full">{featuredPost.category}</span>
                <span className="text-text-muted">{featuredPost.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 leading-tight group-hover:underline decoration-2 underline-offset-4">
                {featuredPost.title}
              </h2>
              <p className="text-text-secondary font-medium leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="mt-auto font-bold text-sm text-text-primary flex items-center gap-2">
                By {featuredPost.author}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <Link to="#" key={idx} className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-surface-primary shadow-sm group-hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="text-text-primary">{post.category}</span>
                <span className="text-zinc-300">•</span>
                <span className="text-text-muted">{post.date}</span>
              </div>
              <h3 className="text-xl font-extrabold text-text-primary mb-3 leading-snug group-hover:text-text-muted transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm font-medium leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;
