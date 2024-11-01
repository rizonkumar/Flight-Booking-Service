const { StatusCodes } = require("http-status-codes");

const Booking = require("../models/");

const CrudRepository = require("./crud-repository");
const db = require("../models/");

class BookingRespository extends CrudRepository {
  constructor() {
    super(db.Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }
}

module.exports = BookingRespository;
