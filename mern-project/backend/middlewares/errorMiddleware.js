const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  if ([200, 500].includes(statusCode)) console.log(err);
  res.status(statusCode === 200 ? 500 : statusCode);
  res.json({
    status: statusCode < 500 ? 'failed' : 'error',
    statusCode: statusCode === 200 ? 500 : statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' || (statusCode >= 400 && statusCode <= 500) ? null : err.stack
  });
};

module.exports = { errorHandler };
