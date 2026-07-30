import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ClassCard from '../components/ClassCard';
import BookingModal from '../components/BookingModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, Filter, AlertCircle } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const categories = ['All', 'HIIT', 'Yoga', 'Strength', 'Pilates', 'Cycling', 'Recovery'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedLevel !== 'All') params.level = selectedLevel;
      if (search.trim()) params.search = search;

      const res = await API.get('/services', { params });
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, selectedLevel]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchServices();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-brown-600 border-l-2 border-brown-600 pl-3 font-semibold">
          Class Schedule & Catalog
        </span>
        <h1 className="text-4xl font-serif font-bold text-espresso-800">Studio Programs & Sessions</h1>
        <p className="text-espresso-700 text-sm">
          Reserve your spot in Studio A or Studio B for athletic conditioning, Reformer Pilates, and power strength work.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="studio-panel p-6 rounded-xl space-y-6">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-espresso-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search classes or trainers (e.g. Reformer, Marcus, HIIT)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded bg-white border border-cream-border text-espresso-800 text-xs font-medium focus:border-brown-600 focus:outline-none transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded bg-brown-600 hover:bg-brown-700 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Category Pills & Level Selector */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-cream-border">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-brown-600 text-white shadow-sm'
                    : 'bg-white border border-cream-border text-espresso-700 hover:text-brown-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-espresso-500" />
            <span className="text-xs text-espresso-700 font-medium">Difficulty:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 rounded bg-white border border-cream-border text-espresso-800 text-xs font-medium focus:outline-none shadow-sm"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Service Catalog Grid */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : services.length === 0 ? (
        <div className="studio-panel p-12 rounded-xl text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-espresso-500 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-espresso-800">No Programs Found</h3>
          <p className="text-espresso-700 text-xs max-w-sm mx-auto">
            No active classes matched your search. Try resetting your selected filters.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSearch(''); }}
            className="px-4 py-2 rounded bg-white border border-cream-border text-espresso-800 text-xs font-bold uppercase tracking-wider hover:border-brown-600 shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ClassCard
              key={service._id}
              service={service}
              onBook={(serv) => setSelectedService(serv)}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
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
