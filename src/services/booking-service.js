const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { ServerConfig } = require("../config");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { MESSAGES, CONFIG } = require("../utils/constants");

async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(async function bookingImpl(
      t
    ) {
      const flight = await axios.get(
        `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
      );
      const flightData = flight.data.data.totalSeats;
      console.log("Flight Data", flightData);

      if (data.noofSeats > flightData) {
        throw new AppError(
          MESSAGES.ERROR.NO_OF_SEATS_EXCEEDS_AVAILABLE_SEATS.replace(
            "{{requested}}",
            data.noofSeats
          ).replace("{{available}}", flightData),
          StatusCodes.BAD_REQUEST
        );
      }

      // Add your booking creation logic here
      return true;
    });

    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw AppError directly
    }
    console.log("Error ------------->>>>>>>", error);
    throw new AppError(
      MESSAGES.ERROR.BOOKING_FAILED,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createBooking };
