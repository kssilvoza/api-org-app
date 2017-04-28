module.exports = {
  connection: 'api_org_app',
  schema: true,
  tableName: 'notes',
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    title: {
      type: 'string'
    },
    text: {
      type: 'string'
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
