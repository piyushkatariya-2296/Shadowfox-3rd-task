import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Wordmark Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-widest font-serif text-espresso-800 uppercase">
              PULSEFIT <span className="text-brown-600 font-sans text-xs font-normal tracking-normal ml-1">/ STUDIO</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
            <Link to="/" className={isActive('/') ? 'text-brown-600 font-bold border-b-2 border-brown-600 pb-1' : 'text-espresso-700 hover:text-brown-600 transition-colors'}>Home</Link>
            <Link to="/classes" className={isActive('/classes') ? 'text-brown-600 font-bold border-b-2 border-brown-600 pb-1' : 'text-espresso-700 hover:text-brown-600 transition-colors'}>Classes & Schedule</Link>
            <Link to="/about" className={isActive('/about') ? 'text-brown-600 font-bold border-b-2 border-brown-600 pb-1' : 'text-espresso-700 hover:text-brown-600 transition-colors'}>Our Philosophy</Link>
            <Link to="/contact" className={isActive('/contact') ? 'text-brown-600 font-bold border-b-2 border-brown-600 pb-1' : 'text-espresso-700 hover:text-brown-600 transition-colors'}>Contact</Link>
          </div>

          {/* User Auth Controls */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-600/30 text-amber-700 text-xs font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-white border border-cream-border text-espresso-800 text-xs font-medium hover:border-brown-600 transition-all shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-brown-600" /> Account
                </Link>
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="p-2 rounded text-espresso-500 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-xs font-medium uppercase tracking-widest text-espresso-700 hover:text-brown-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded bg-brown-600 hover:bg-brown-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Reserve Class
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-espresso-800 hover:text-brown-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-surface border-b border-cream-border px-4 py-6 space-y-4 text-xs font-medium uppercase tracking-widest">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-espresso-800 hover:text-brown-600">Home</Link>
          <Link to="/classes" onClick={() => setMobileMenuOpen(false)} className="block text-espresso-800 hover:text-brown-600">Classes & Schedule</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-espresso-800 hover:text-brown-600">Our Philosophy</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-espresso-800 hover:text-brown-600">Contact</Link>
          
          <div className="pt-4 border-t border-cream-border flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center rounded bg-white text-espresso-800 border border-cream-border">Account</Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full py-2.5 text-center rounded bg-rose-100 text-rose-700">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center rounded border border-cream-border text-espresso-800 bg-white">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center rounded bg-brown-600 text-white font-bold">Reserve Class</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
