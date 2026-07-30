import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ClassCard from '../components/ClassCard';
import BookingModal from '../components/BookingModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/services');
        if (res.data.success) {
          setFeaturedClasses(res.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured classes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* ASYMMETRIC 2-COLUMN HERO */}
      <section className="pt-12 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-brown-600 border-l-2 border-brown-600 pl-3 font-semibold">
                Studio Lab 01 — San Francisco, CA
              </span>

              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-espresso-800 leading-[1.1]">
                Movement for longevity. <br />
                <span className="text-brown-600 italic font-normal">Strength for performance.</span>
              </h1>

              <p className="text-espresso-700 text-base leading-relaxed max-w-xl">
                PulseFit is a boutique athletic training laboratory combining Reformer Pilates resistance, high-velocity interval conditioning, and progressive barbell kinematics.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  to="/classes"
                  className="px-8 py-4 rounded bg-brown-600 hover:bg-brown-700 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore Class Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 rounded bg-white border border-cream-border hover:border-brown-600 text-espresso-800 font-medium text-xs uppercase tracking-widest transition-all text-center shadow-sm"
                >
                  Our Philosophy
                </Link>
              </div>

              {/* Minimal Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-cream-border max-w-lg">
                <div>
                  <h4 className="text-2xl font-serif font-bold text-espresso-800">12 Max</h4>
                  <p className="text-[11px] text-espresso-500 uppercase tracking-wider">Group Size</p>
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-espresso-800">Studio A & B</h4>
                  <p className="text-[11px] text-espresso-500 uppercase tracking-wider">Turf & Reformer</p>
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-espresso-800">4.95 ★</h4>
                  <p className="text-[11px] text-espresso-500 uppercase tracking-wider">Member Rating</p>
                </div>
              </div>
            </div>

            {/* Right Asymmetric Photo Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden studio-panel p-2 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80"
                  alt="Reformer Pilates Training Session"
                  className="w-full h-[450px] object-cover rounded-xl"
                />
                
                {/* Overlay Quote Badge */}
                <div className="absolute bottom-6 left-6 right-6 studio-card p-4 rounded-xl border border-cream-border backdrop-blur-md">
                  <p className="text-xs italic text-espresso-800 font-serif">
                    "Precision movement coached by physical therapists and collegiate athletes."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED CLASSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-cream-border pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brown-600 font-semibold">Class Schedule Preview</span>
            <h2 className="text-3xl font-serif font-bold text-espresso-800 mt-1">Featured Programs</h2>
          </div>
          <Link
            to="/classes"
            className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-brown-600 hover:text-brown-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((item) => (
              <ClassCard
                key={item._id}
                service={item}
                onBook={(service) => setSelectedService(service)}
              />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL SPLIT SECTION (TEXT-FIRST STORY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="studio-panel rounded-2xl p-8 sm:p-12 border border-cream-border grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brown-600 font-semibold">Methodology & Facility</span>
            <h2 className="text-3xl font-serif font-bold text-espresso-800">
              Built for intentional, injury-free progress.
            </h2>
            <p className="text-espresso-700 text-sm leading-relaxed">
              We reject the noise of overcrowded gym floors and repetitive generic workouts. Every session at PulseFit is limited to 12 participants to guarantee hands-on form coaching, real anatomical adjustments, and measurable strength progression.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brown-600 hover:text-brown-700 transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80"
                alt="Strength Room"
                className="rounded-xl h-44 w-full object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80"
                alt="Yoga Flow Studio"
                className="rounded-xl h-44 w-full object-cover shadow-sm"
              />
            </div>
          </div>

        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSuccess={() => setSelectedService(null)}
        />
      )}

    </div>
  );
}
