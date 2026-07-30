// @desc    Simulate Stripe payment intent creation
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'usd', serviceId } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required'
      });
    }

    // In a live Stripe setup, you'd call:
    // const paymentIntent = await stripe.paymentIntents.create({ amount: amount * 100, currency });

    // Simulated Stripe Payment Intent response
    const clientSecret = `pi_test_simulated_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;

    res.status(200).json({
      success: true,
      message: 'Stripe PaymentIntent created (simulated)',
      clientSecret,
      paymentIntentId: `pi_test_simulated_${Date.now()}`,
      amount,
      currency
    });
  } catch (error) {
    next(error);
  }
};
