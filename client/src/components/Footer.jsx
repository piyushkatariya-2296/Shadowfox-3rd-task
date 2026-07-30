import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cream-surface border-t border-cream-border text-espresso-700 text-xs mt-auto py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-lg font-serif font-bold text-espresso-800 uppercase tracking-widest block">
              PULSEFIT <span className="text-brown-600 font-sans text-xs font-normal">/ STUDIO</span>
            </span>
            <p className="text-espresso-500 text-xs leading-relaxed">
              A boutique conditioning lab combining mechanical resistance, Reformer Pilates, and movement longevity.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="space-y-2">
            <h5 className="text-espresso-800 font-bold uppercase tracking-wider text-[11px] mb-3">San Francisco Lab</h5>
            <p className="text-espresso-500">450 Fitness Boulevard, Suite 100</p>
            <p className="text-espresso-500">San Francisco, CA 94107</p>
            <p className="text-brown-600 pt-2 font-mono text-[11px]">+1 (415) 890-3412</p>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <h5 className="text-espresso-800 font-bold uppercase tracking-wider text-[11px] mb-3">Session Schedule</h5>
            <div className="space-y-1 text-espresso-500">
              <div className="flex justify-between"><span>Mon — Fri</span> <span className="text-espresso-800 font-medium">06:00 AM – 08:30 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span> <span className="text-espresso-800 font-medium">07:30 AM – 06:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span> <span className="text-espresso-800 font-medium">08:00 AM – 04:00 PM</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h5 className="text-espresso-800 font-bold uppercase tracking-wider text-[11px] mb-3">Navigation</h5>
            <ul className="space-y-2">
              <li><Link to="/classes" className="hover:text-brown-600 transition-colors">Class Catalog</Link></li>
              <li><Link to="/about" className="hover:text-brown-600 transition-colors">Our Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-brown-600 transition-colors">Studio Inquiries</Link></li>
              <li><Link to="/login" className="hover:text-brown-600 transition-colors">Member Portal</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between text-espresso-500 text-[11px]">
          <p>© {new Date().getFullYear()} PulseFit Studio LLC. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-espresso-800">Privacy Policy</a>
            <a href="#" className="hover:text-espresso-800">Terms of Service</a>
            <a href="#" className="hover:text-espresso-800">Studio Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
