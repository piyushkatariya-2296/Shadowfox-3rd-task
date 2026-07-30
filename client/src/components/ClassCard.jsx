import React from 'react';
import { Clock, User, ArrowUpRight } from 'lucide-react';

export default function ClassCard({ service, onBook }) {
  return (
    <div className="studio-card rounded-xl overflow-hidden flex flex-col group hover:border-brown-500 transition-all duration-300">
      
      {/* Real Photography Header */}
      <div className="relative h-52 overflow-hidden bg-cream-surface">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded bg-white/95 backdrop-blur-md border border-cream-border text-[10px] font-bold uppercase tracking-widest text-brown-600 shadow-sm">
          {service.category}
        </span>

        {/* Level Tag */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-white/95 border border-cream-border text-[10px] font-medium text-espresso-700 shadow-sm">
          {service.level}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-espresso-800 group-hover:text-brown-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-espresso-500 text-xs leading-relaxed mt-2 line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-cream-border text-xs text-espresso-700">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brown-600" />
              <span>{service.trainer}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sage-500" />
              <span>{service.duration} mins</span>
            </div>
          </div>
        </div>

        {/* Footer Price & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-cream-border/60">
          <div>
            <span className="text-[10px] text-espresso-500 block uppercase tracking-wider">Session Price</span>
            <span className="text-xl font-bold font-serif text-espresso-800">${service.price}</span>
          </div>
          <button
            onClick={() => onBook(service)}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-brown-600 hover:bg-brown-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
