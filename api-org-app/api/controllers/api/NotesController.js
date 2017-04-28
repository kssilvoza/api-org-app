module.exports = {
  create : function(req, res) {
    async.auto({
      prepareParams: function(callback) {
        var note = {};

        if (req.body.title) {
          note.title = req.body.title;
        } else {
          return callback(ApiErrors.bad_request);
        }
        if (req.body.text) {
          note.text = req.body.text;
        } else {
          return callback(ApiErrors.bad_request);
        }
        
        callback(null, note);
      },

      createEntry: ["prepareParams", function(callback, result) {
        Notes.create(result.prepareParams, function(err) {
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
    Notes.query(query, function(err, list) {
      if (err) {
        return res.status(ApiErrors.database_error.http_status)
                  .json(ApiErrors.database_error.response);
      }

      res.status(200).json(list.rows);
    });
  },

  update : function(req, res) {
    async.auto({
      prepareParams: function(callback) {
        var note = {};

        if (req.body.title) {
          note.title = req.body.title;
        }
        if (req.body.text) {
          note.text = req.body.text;
        }

        if (!JsonUtils.isEmpty(note)) {
          note.updated_at = new Date();
          return callback(null, note);
        } else {
          return callback(ApiErrors.bad_request);
        }
      },

      updateEntry: ["prepareParams", function(callback, result) {
        var query = {};
        query.id = req.params.id;
        Notes.update(query, result.prepareParams, function(err, updatedRecords) {
          if (err) {
            return callback(ApiErrors.database_error);
          }
          if (updatedRecords.length <= 0) {
            return callback(ApiErrors.resource_not_found);
          }

          callback();
        });
      }]

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

  delete : function(req, res) {
    var query = {};
    query.id = req.params.id;
    Notes.destroy(query, function(err, deletedRecords) {
      if (err) {
        return res.status(ApiErrors.database_error.http_status)
                  .json(ApiErrors.database_error.response);
      }
      if (deletedRecords.length <= 0) {
        return res.status(ApiErrors.resource_not_found.http_status)
                  .json(ApiErrors.resource_not_found.response);
      }

      res.status(200).json({
        ok : true
      });
    });
  }
}
