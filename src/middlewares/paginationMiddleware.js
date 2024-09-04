const { paginateResponse } = require('../utils/pagination.js');

const paginationMiddleware = (req, res, next) => {
  res.paginate = (data) => {
    return paginateResponse(req, data);
  };
  next();
};

module.exports = { paginationMiddleware };
