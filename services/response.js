class Response {
  constructor(data, metadata) {
    this.data = data;
    this.metadata = metadata;
  }
};

class Metadata {
  constructor(page, pageSize, total) {
    this.page = page;
    this.page_size = pageSize;
    this.total = total;
  }
}

module.exports = {
  Response,
  Metadata,
};
