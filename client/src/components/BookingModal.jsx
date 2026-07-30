import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { X, Calendar, Clock, CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function BookingModal({ service, onClose, onSuccess }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState(
    service?.schedule?.[0] || '07:00 AM'
  );
  const [cardHolder, setCardHolder] = useState(user?.name || '');
  const [cardNumber] = useState('4242 •••• •••• 4242');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!service) return null;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please sign in to reserve a class.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const paymentRes = await API.post('/payments/create-intent', {
        amount: service.price,
        serviceId: service._id
      });

      const paymentIntentId = paymentRes.data.paymentIntentId || 'pi_test_simulated';

      const bookingRes = await API.post('/bookings', {
        serviceId: service._id,
        bookingDate,
        timeSlot,
        paymentIntentId
      });

      if (bookingRes.data.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process reservation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl border border-cream-border overflow-hidden relative shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-cream-border bg-cream-surface">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brown-600 font-semibold">Reservation Lab</span>
            <h3 className="text-xl font-serif font-bold text-espresso-800">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-espresso-500 hover:text-espresso-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-sage-500/10 text-sage-500 border border-sage-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-espresso-800">Spot Reserved</h4>
            <p className="text-espresso-700 text-xs max-w-md mx-auto leading-relaxed">
              Your session for <strong className="text-espresso-800">{service.title}</strong> on <span className="text-brown-600 font-semibold">{bookingDate}</span> at <span className="text-brown-600 font-semibold">{timeSlot}</span> has been confirmed.
            </p>
            <p className="text-[11px] text-espresso-500">A confirmation notice was dispatched to {user?.email}.</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-medium text-espresso-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brown-600" /> Select Session Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded bg-cream-bg border border-cream-border text-espresso-800 text-xs font-medium focus:border-brown-600 focus:outline-none"
              />
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-medium text-espresso-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sage-500" /> Choose Session Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(service.schedule && service.schedule.length > 0
                  ? service.schedule
                  : ['07:00 AM', '12:00 PM', '05:30 PM']
                ).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-3 rounded border text-xs font-medium transition-all ${
                      timeSlot === slot
                        ? 'bg-brown-600 text-white border-brown-600 font-bold shadow-sm'
                        : 'bg-white border-cream-border text-espresso-700 hover:border-brown-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Section */}
            <div className="p-4 rounded bg-cream-surface border border-cream-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-espresso-800 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-600" /> Stripe Test Mode Payment
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-cream-border text-espresso-700 font-mono text-[10px]">PRE-SET TEST CARD</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-espresso-500 block mb-1">Cardholder Name</span>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded bg-white border border-cream-border text-espresso-800 focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <span className="text-espresso-500 block mb-1">Test Card</span>
                  <input
                    type="text"
                    disabled
                    value={cardNumber}
                    className="w-full px-3 py-2 rounded bg-cream-bg border border-cream-border text-espresso-500 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between pt-2 border-t border-cream-border text-xs">
              <span className="text-espresso-700">Total Due:</span>
              <span className="text-2xl font-serif font-bold text-espresso-800">${service.price}</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded bg-brown-600 hover:bg-brown-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Reservation (${service.price})</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
