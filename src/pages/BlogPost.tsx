import { SEO } from "@/components/aryan/SEO";
import { Footer } from "@/components/aryan/Footer";
import { Nav } from "@/components/aryan/Nav";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === id);
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [id, post, navigate]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <SEO 
        title={`${post.title} | Aryan Heights Hostel Kota`} 
        description={post.excerpt}
        keywords={`${post.category}, JEE preparation, NEET preparation, student tips Kota, hostel Kota`}
        canonical={`https://aryanheights.in/blog/${post.id}`}
        ogImage={`https://aryanheights.in${post.imageUrl}`}
      />
      <Nav />
      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-accent hover:text-accent-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>
        
        <article className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 shadow-xl" itemScope itemType="https://schema.org/BlogPosting">
          <div className="h-64 sm:h-80 md:h-[400px] w-full overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
              itemProp="image"
            />
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/30" itemProp="articleSection">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-neutral-400">
                <Clock className="w-4 h-4 mr-1.5" />
                {post.readTime}
              </div>
            </div>

            <div className="flex flex-wrap items-center text-sm text-neutral-400 mb-6 gap-6">
              <div className="flex items-center" itemProp="datePublished" content={post.date}>
                <Calendar className="w-4 h-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center" itemProp="author">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold text-white mb-8 leading-tight" itemProp="headline">
              {post.title}
            </h1>

            <p className="text-lg text-neutral-300 mb-8 leading-relaxed border-l-4 border-accent pl-4 italic" itemProp="description">
              {post.excerpt}
            </p>
            
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-cinzel prose-headings:text-white prose-headings:mt-8 prose-headings:mb-4 prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-accent hover:prose-a:text-accent-light prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
              itemProp="articleBody"
            />

            {/* Author Box */}
            <div className="mt-12 p-6 bg-neutral-700/50 rounded-xl border border-neutral-600">
              <h3 className="text-white font-bold mb-2">About Aryan Heights Hostel</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Aryan Heights is a premium boys hostel in Kota, Rajasthan, serving JEE and NEET aspirants since 2010. Located in Indra Vihar, Kota, within walking distance of top coaching institutes including Allen, Resonance, and Vibrant. We provide AC rooms with attached bathrooms, four daily nutritious meals, an in-house gym, 300 Mbps Wi-Fi, and 24×7 security — everything a serious aspirant needs to focus completely on their preparation.
              </p>
              <Link to="/contact" className="inline-block mt-3 text-accent hover:text-accent-light text-sm font-semibold transition-colors">
                Contact us for admission enquiries →
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-cinzel font-bold text-white mb-8">More Articles You May Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <article key={related.id} className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-36 overflow-hidden">
                    <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="text-accent text-xs font-semibold">{related.category}</span>
                    <h3 className="text-sm font-bold text-white mt-1 mb-2 leading-snug line-clamp-2">
                      <Link to={`/blog/${related.id}`} className="hover:text-accent transition-colors">
                        {related.title}
                      </Link>
                    </h3>
                    <Link to={`/blog/${related.id}`} className="text-xs text-accent font-semibold hover:text-accent-light transition-colors">
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
