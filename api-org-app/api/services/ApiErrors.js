var ApiErrors = {
  bad_request: {
    http_status: 400,
    response: {
      code: -100,
      message: "Bad Request"
    }
  },
  database_error: {
    http_status: 503,
    response: {
      code: -200,
      message: "Database Error"
    }
  },
}

module.exports = ApiErrors;
