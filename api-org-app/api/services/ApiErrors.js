var ApiErrors = {
  bad_request: {
    http_status: 400,
    response: {
      code: -100,
      message: "Bad Request"
    }
  },
  resource_not_found: {
    http_status: 404,
    response: {
      code: -101,
      message: "Resource Not Found"
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
