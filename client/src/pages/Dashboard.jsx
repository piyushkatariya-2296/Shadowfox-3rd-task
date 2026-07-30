import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import Toast from '../components/Toast';
import { Calendar, Clock, CreditCard, Edit, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '');
  const [toast, setToast] = useState(null);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const res = await API.get('/bookings/my');
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Cancel this session reservation?')) return;
    try {
      const res = await API.patch(`/bookings/${bookingId}/cancel`);
      if (res.data.success) {
        setToast({ message: 'Reservation cancelled', type: 'info' });
        fetchMyBookings();
      }
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to cancel', type: 'error' });
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ name: nameInput, phone: phoneInput });
      setEditingProfile(false);
      setToast({ message: 'Profile updated', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update profile', type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Member Profile Banner */}
      <div className="studio-panel p-8 rounded-xl border border-charcoal-border flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-terracotta-500 flex items-center justify-center text-white text-xl font-serif font-bold">
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-sand-100">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded bg-charcoal-card border border-charcoal-border text-terracotta-400 text-[10px] font-mono uppercase">
                {user?.role === 'admin' ? 'Admin' : 'Studio Member'}
              </span>
            </div>
            <p className="text-charcoal-muted text-xs mt-1">{user?.email} • Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</p>
          </div>
        </div>

        <button
          onClick={() => setEditingProfile(!editingProfile)}
          className="px-4 py-2 rounded bg-charcoal-card border border-charcoal-border hover:border-terracotta-500 text-sand-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all w-fit"
        >
          <Edit className="w-3.5 h-3.5 text-terracotta-400" />
          <span>{editingProfile ? 'Close' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Profile Drawer */}
      {editingProfile && (
        <form onSubmit={handleProfileSave} className="studio-panel p-6 rounded-xl border border-terracotta-500/30 space-y-4">
          <h3 className="text-base font-serif font-bold text-sand-100">Update Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-sand-300 mb-1">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded bg-charcoal-card border border-charcoal-border text-sand-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sand-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-3 py-2 rounded bg-charcoal-card border border-charcoal-border text-sand-100 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded bg-terracotta-500 text-white text-xs font-bold uppercase tracking-wider"
          >
            Save
          </button>
        </form>
      )}

      {/* Reservation List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-charcoal-border pb-4">
          <h2 className="text-2xl font-serif font-bold text-sand-100">My Session Reservations</h2>
          <button
            onClick={fetchMyBookings}
            className="p-2 text-charcoal-muted hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-charcoal-muted text-xs animate-pulse">Loading reservations...</div>
        ) : bookings.length === 0 ? (
          <div className="studio-panel p-12 rounded-xl text-center space-y-3">
            <Calendar className="w-10 h-10 text-charcoal-muted mx-auto" />
            <h3 className="text-lg font-serif font-bold text-sand-100">No Reserved Sessions</h3>
            <p className="text-charcoal-muted text-xs max-w-sm mx-auto">
              You haven't reserved any classes yet. Browse the schedule to lock in your next workout.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => {
              const isCancelled = b.status === 'cancelled';
              return (
                <div
                  key={b._id}
                  className={`studio-card p-6 rounded-xl border transition-all ${
                    isCancelled ? 'border-charcoal-border opacity-50' : 'border-charcoal-border hover:border-terracotta-500/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-terracotta-400">
                        {b.service?.category || 'Program'}
                      </span>
                      <h4 className="text-lg font-serif font-bold text-sand-100">{b.service?.title || 'Session'}</h4>
                      <p className="text-xs text-charcoal-muted">Trainer: {b.service?.trainer || 'PulseFit Staff'}</p>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isCancelled
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : 'bg-moss-600/20 text-moss-500 border border-moss-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-charcoal-border text-sand-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-terracotta-400" />
                      <span>{b.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-moss-500" />
                      <span>{b.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>${b.totalAmount} (Paid)</span>
                    </div>
                    <div className="text-right text-[11px] text-charcoal-muted font-mono">
                      #{b._id.slice(-6)}
                    </div>
                  </div>

                  {!isCancelled && (
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => handleCancelBooking(b._id)}
                        className="px-3 py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
