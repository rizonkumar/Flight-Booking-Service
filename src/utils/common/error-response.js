const { MESSAGES } = require("../constants");

const error = {
  success: false,
  message: MESSAGES.ERROR.DEFAULT,
  data: {},
  error: {},
};

module.exports = error;
