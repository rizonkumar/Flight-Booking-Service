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

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new Error(MESSAGES.ERROR.BOOKING_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async update(id, data, transaction) {
    const response = await this.model.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );
    return response;
  }
}

module.exports = BookingRespository;
