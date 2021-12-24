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

module.exports = {
  getOffset,
  emptyOrRows,
  getContextFromRequest,
};
