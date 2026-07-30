import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Membership Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Membership Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-white">We'd Love To Hear From You</h1>
        <p className="text-slate-400 text-sm">
          Have questions about memberships, private training sessions, or corporate wellness partnerships?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Information & Hours */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <h3 className="text-2xl font-extrabold text-white">Studio Location & Info</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white">Address</h5>
                  <p className="text-slate-400 text-xs mt-0.5">450 Fitness Boulevard, Suite 100, San Francisco, CA 94107</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white">Phone Support</h5>
                  <p className="text-slate-400 text-xs mt-0.5">+1 (555) 019-2831</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white">Email Address</h5>
                  <p className="text-slate-400 text-xs mt-0.5">hello@pulsefitstudio.com</p>
                </div>
              </div>
            </div>

          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4">
            <h4 className="text-lg font-bold text-white">Frequently Asked Questions</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-dark-card border border-slate-800">
                <p className="font-bold text-slate-200">Do I need to bring my own mat or equipment?</p>
                <p className="text-slate-400 mt-1">Complimentary Manduka mats, towels, and water filtration stations are provided at all sessions.</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-card border border-slate-800">
                <p className="font-bold text-slate-200">What is the class cancellation policy?</p>
                <p className="text-slate-400 mt-1">Free cancellation is available up to 12 hours prior to your scheduled class time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-700">
          <h3 className="text-2xl font-extrabold text-white mb-6">Send Us A Message</h3>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Message Sent!</h4>
              <p className="text-slate-300 text-xs">Thank you for reaching out. A studio representative will reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-slate-700 text-white text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-slate-700 text-white text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-slate-700 text-white text-sm focus:border-brand-500 focus:outline-none"
                >
                  <option value="Membership Inquiry">Membership Inquiry</option>
                  <option value="Personal Training">Personal Training</option>
                  <option value="Class Feedback">Class Feedback</option>
                  <option value="Corporate Partnerships">Corporate Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can we assist your fitness goals?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-slate-700 text-white text-sm focus:border-brand-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-glow-emerald transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
