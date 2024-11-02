const MESSAGES = {
  SUCCESS: {
    BOOKING_CREATED: "Booking created successfully",
  },
  ERROR: {
    BOOKING_FAILED: "Unable to create booking",
    REQUIRED_NO_SEATS: "Required number of seats is not available",
    NO_OF_SEATS_EXCEEDS_AVAILABLE_SEATS:
      "Cannot book - Requested seats ({{requested}}) exceed available seats ({{available}})",
    BOOKING_NOT_FOUND: "Booking not found",
    PAYMENT_FAILED: "The amount of the payment doesn't match",
    PAYMENT_FAILED_1: "The user corresponding to the booking doesn't match",
  },
  INFO: {
    REQUEST_RECEIVED: "Request received and being processed",
  },
};

module.exports = {
  MESSAGES,
};
