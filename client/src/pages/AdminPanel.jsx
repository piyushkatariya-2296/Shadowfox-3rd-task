import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Toast from '../components/Toast';
import { Plus, Edit, Trash2, ShieldCheck, Users, Calendar, DollarSign, Dumbbell, X, Check, Loader2 } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'bookings'
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Modal State for Create/Edit Service
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'HIIT',
    trainer: '',
    price: 35,
    duration: 50,
    capacity: 20,
    level: 'All Levels',
    schedule: '07:00 AM, 12:00 PM, 05:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60'
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resServices, resBookings] = await Promise.all([
        API.get('/services'),
        API.get('/bookings')
      ]);
      if (resServices.data.success) setServices(resServices.data.data);
      if (resBookings.data.success) setBookings(resBookings.data.data);
    } catch (err) {
      console.error('Failed to fetch admin metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingServiceId(null);
    setFormData({
      title: '',
      description: '',
      category: 'HIIT',
      trainer: '',
      price: 35,
      duration: 50,
      capacity: 20,
      level: 'All Levels',
      schedule: '07:00 AM, 12:00 PM, 05:30 PM',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60'
    });
    setShowServiceModal(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingServiceId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      trainer: service.trainer,
      price: service.price,
      duration: service.duration,
      capacity: service.capacity,
      level: service.level,
      schedule: Array.isArray(service.schedule) ? service.schedule.join(', ') : service.schedule,
      imageUrl: service.imageUrl
    });
    setShowServiceModal(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        capacity: Number(formData.capacity),
        schedule: formData.schedule.split(',').map((s) => s.trim())
      };

      if (editingServiceId) {
        await API.put(`/services/${editingServiceId}`, payload);
        setToast({ message: 'Service updated successfully!', type: 'success' });
      } else {
        await API.post('/services', payload);
        setToast({ message: 'New class created successfully!', type: 'success' });
      }

      setShowServiceModal(false);
      fetchAdminData();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to save service', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      await API.delete(`/services/${serviceId}`);
      setToast({ message: 'Class deleted successfully', type: 'info' });
      fetchAdminData();
    } catch (err) {
      setToast({ message: 'Failed to delete class', type: 'error' });
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await API.patch(`/bookings/${bookingId}/status`, { status: newStatus });
      setToast({ message: `Booking marked as ${newStatus}`, type: 'success' });
      fetchAdminData();
    } catch (err) {
      setToast({ message: 'Failed to update booking status', type: 'error' });
    }
  };

  // Metrics calculation
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);
  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-3xl font-extrabold text-white">Studio Management Portal</h1>
          </div>
          <p className="text-slate-400 text-xs mt-1">Manage fitness classes, schedules, and member reservations.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow-emerald transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-white">${totalRevenue}</h3>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Classes</span>
            <Dumbbell className="w-4 h-4 text-brand-400" />
          </div>
          <h3 className="text-2xl font-black text-white">{services.length}</h3>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Bookings</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-black text-white">{bookings.length}</h3>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Confirmed Reservations</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-white">{activeBookingsCount}</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'services'
              ? 'bg-brand-500 text-white shadow-glow-emerald'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Classes Catalog ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'bookings'
              ? 'bg-brand-500 text-white shadow-glow-emerald'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Member Reservations ({bookings.length})
        </button>
      </div>

      {/* TAB 1: SERVICES MANAGER */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div key={item._id} className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800 p-5 space-y-4">
              <div className="flex gap-4 items-start">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">{item.category}</span>
                  <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Trainer: {item.trainer}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs py-2 border-y border-slate-800 text-slate-300">
                <span>Duration: {item.duration}m</span>
                <span className="font-bold text-white">${item.price}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-2 rounded-lg bg-dark-card border border-slate-700 hover:border-brand-500 text-slate-200 text-xs font-semibold"
                >
                  <Edit className="w-4 h-4 text-brand-400" />
                </button>
                <button
                  onClick={() => handleDeleteService(item._id)}
                  className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BOOKINGS TABLE */}
      {activeTab === 'bookings' && (
        <div className="glass-panel rounded-2xl overflow-x-auto border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No member bookings found.</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {b.user?.name || 'Member'}
                      <span className="block text-[10px] text-slate-500 font-normal">{b.user?.email}</span>
                    </td>
                    <td className="py-3.5 px-4">{b.service?.title || 'Fitness Session'}</td>
                    <td className="py-3.5 px-4 font-mono">{b.bookingDate} @ {b.timeSlot}</td>
                    <td className="py-3.5 px-4 font-bold text-white">${b.totalAmount}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : b.status === 'completed'
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {b.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleUpdateBookingStatus(b._id, 'completed')}
                            className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')}
                            className="px-2 py-1 rounded bg-red-500/20 text-red-300 font-semibold text-[10px]"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT CLASS MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-xl rounded-2xl border border-slate-700 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                {editingServiceId ? 'Edit Fitness Class' : 'Create New Fitness Class'}
              </h3>
              <button onClick={() => setShowServiceModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                  >
                    {['HIIT', 'Yoga', 'Strength', 'Pilates', 'Cycling', 'Recovery'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                  >
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Trainer</label>
                  <input
                    type="text"
                    required
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Schedule Time Slots (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="07:00 AM, 12:00 PM, 05:30 PM"
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-glow-emerald transition-all flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save Class</span>}
              </button>
            </form>
          </div>
        </div>
      )}

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
