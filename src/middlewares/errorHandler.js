const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: "Server error" });
};

module.exports = errorHandler;
