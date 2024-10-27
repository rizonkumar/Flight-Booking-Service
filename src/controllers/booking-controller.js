const { StatusCodes } = require("http-status-codes");
const { MESSAGES } = require("../utils/constants");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { BookingService } = require("../services");

async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noofSeats: req.body.noofSeats,
    });
    SuccessResponse.data = booking;
    SuccessResponse.message = MESSAGES.SUCCESS.BOOKING_CREATED;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("Error", error);
    ErrorResponse.error = error.explanation || error.message;
    ErrorResponse.message = error.explanation || MESSAGES.ERROR.BOOKING_FAILED;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = { createBooking };
