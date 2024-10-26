function compareTime(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return start < end;
}

module.exports = {
  compareTime,
};
