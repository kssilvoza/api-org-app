module.exports = {
  connection: 'api_org_app',
  schema: true,
  tableName: 'todos',
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    text: {
      type: 'string'
    },
    done : {
      type: 'boolean',
      defaultsTo: false
    },
    created_at: {
      type: 'datetime',
      defaultsTo: function () { return new Date(); }
    },
    updated_at: {
      type: 'datetime',
      defaultsTo: function () { return new Date(); }
    }
  }
}
