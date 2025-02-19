/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select3057528519",
    "maxSelect": 2,
    "name": "roles",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "reviewer",
      "admin"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("select3057528519")

  return app.save(collection)
})
