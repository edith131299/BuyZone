exports.notFound = (req, res, next) => {
  const error = new Error(`Not found:${req.orginalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    statck: err?.stack,
    message: err?.message,
  });
};
