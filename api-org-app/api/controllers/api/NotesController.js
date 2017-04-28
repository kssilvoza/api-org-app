module.exports = {
  create : function(req, res) {
    async.auto({
      validate: function(callback) {
        if (!req.body.title) {
          return callback(ApiErrors.bad_request);
        }
        if (!req.body.text) {
          return callback(ApiErrors.bad_request);
        }
        callback();
      },

      prepareParams: ["validate", function(callback) {
        var note = {};
        if (req.body.title) {
          note.title = req.body.title;
        }
        if (req.body.text) {
          note.text = req.body.text;
        }
        callback(null, note);
      }],

      createEntry: ["prepareParams", function(callback, result) {
        Note.create(result.prepareParams, function(err) {
          if (err) {
            return callback(ApiErrors.database_error);
          }
          callback()
        });
      }],

    }, function(error, result) {
      if (error) {
        res.status(error.http_status).json(error.response);
      } else {
        res.status(200).json({
          ok : true
        });
      }
    });
  },

  read : function(req, res) {
    var query = "SELECT id, title, text, created_at, updated_at " +
                "FROM notes " +
                "ORDER BY updated_at DESC;";
    Note.query(query, function(err, list) {
      if (err) {
        console.log(err)
        return res.status(ApiErrors.database_error.http_status)
                  .json(ApiErrors.database_error.response);
      }

      res.status(200).json(list.rows);
    });
  },

  update : function(req, res) {

  },

  delete : function(req, res) {

  }
}
