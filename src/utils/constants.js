const MESSAGES = {
  SUCCESS: {
    BOOKING_CREATED: "Booking created successfully",
  },
  ERROR: {
    BOOKING_FAILED: "Unable to create booking",
    REQUIRED_NO_SEATS: "Required number of seats is not available",
    NO_OF_SEATS_EXCEEDS_AVAILABLE_SEATS:
      "Cannot book - Requested seats ({{requested}}) exceed available seats ({{available}})",
  },
  INFO: {
    REQUEST_RECEIVED: "Request received and being processed",
  },
};

module.exports = {
  MESSAGES,
};
