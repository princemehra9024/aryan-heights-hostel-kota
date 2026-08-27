import { SEO } from "@/components/aryan/SEO";
import { Footer } from "@/components/aryan/Footer";
import { Nav } from "@/components/aryan/Nav";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <SEO 
        title="Student Blog & Guides | JEE NEET Preparation Tips | Aryan Heights Hostel Kota" 
        description="Expert articles, guides, and tips for JEE and NEET aspirants in Kota. Topics include study strategies, mental health, time management, hostel life, nutrition, and more from Aryan Heights Hostel." 
        keywords="JEE preparation tips, NEET preparation guide, student hostel Kota, study tips for JEE, stress management students, how to study Kota, hostel guide Kota, JEE topper routine, NEET study habits"
        canonical="https://aryanheights.in/blog"
      />
      <Nav />
      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Knowledge Hub</p>
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">Student Guide & Blog</h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Actionable advice, science-backed strategies, and real insights on JEE/NEET preparation, mental health, hostel life, and achieving your best in Kota. Written for aspirants, by people who understand the journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-700 hover:border-accent/50 transition-all duration-300 flex flex-col hover:-translate-y-1">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-accent/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-neutral-400 mb-3 space-x-4 flex-wrap gap-y-1">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white mb-3 leading-snug">
                  <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light transition-colors mt-auto"
                >
                  Read Full Article <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom descriptive section for SEO */}
        <div className="mt-20 max-w-4xl mx-auto border-t border-neutral-700 pt-16">
          <h2 className="text-2xl font-cinzel font-bold text-white mb-6 text-center">About Our Student Resource Hub</h2>
          <div className="grid md:grid-cols-2 gap-8 text-neutral-400 text-sm leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">For JEE & NEET Aspirants</h3>
              <p>Our articles are written specifically for students preparing for JEE Main, JEE Advanced, and NEET-UG — many of whom live away from home in Kota for the first time. We cover study strategies that are grounded in cognitive science, not just anecdote.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Holistic Student Wellbeing</h3>
              <p>At Aryan Heights, we believe academic success requires more than just study hours. Our guides cover mental health, nutrition, sleep, exercise, and the emotional challenges of hostel life — because a healthy student is a high-performing student.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">For Parents</h3>
              <p>We also publish guides specifically written for parents of students in Kota — helping you understand how to provide the right kind of support, how to communicate effectively with your child during this period, and what to look for in a quality hostel.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Practical, Actionable Advice</h3>
              <p>Every article in our blog is designed to give you something you can implement immediately — a new study technique to try, a habit to build, a mindset shift to make. We avoid vague inspiration and focus on specific, practical guidance.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
