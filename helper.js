const Str = require('@supercharge/strings');

const getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
};

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

const getContextFromRequest = (req) => {
  const instance = req.headers['x-instance'];
  const application = req.headers['x-application'];

  return { instance, application };
};

const generateKeySecret = (keySize = 12, secretSize = 24) => {
  return {
    key: Str.random(keySize),
    secret: Str.random(secretSize),
  };
};

module.exports = {
  getOffset,
  emptyOrRows,
  getContextFromRequest,
  generateKeySecret,
};
