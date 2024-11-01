const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { ServerConfig } = require("../config");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

const bookingRespository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;

    if (data.noofSeats > flightData.totalSeats) {
      throw new AppError(
        MESSAGES.ERROR.NO_OF_SEATS_EXCEEDS_AVAILABLE_SEATS.replace(
          "{{requested}}",
          flightData.totalSeats
        ).replace("{{available}}", flightData),
        StatusCodes.BAD_REQUEST
      );
    }

    const totalBookingAmount = data.noofSeats * flightData.price;
    const bookingPayload = { ...data, totalCost: totalBookingAmount };

    // Pass transaction to create metho
    const booking = await bookingRespository.create(
      bookingPayload,
      transaction
    );

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noofSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      MESSAGES.ERROR.BOOKING_FAILED,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createBooking };
