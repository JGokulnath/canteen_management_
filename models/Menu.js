const getDb = require("../utils/database").getDb;
const { ObjectId, ObjectID } = require("mongodb");
class Menu {
  constructor(name, timing, products) {
    this.name = name;
    this.timing = timing;
    this.products = products;
  }
  save() {
    var db = getDb();
    var menu = db.collection("menu");
    return menu
      .insertOne({ ...this })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  static fetchAll() {
    var db = getDb();
    var menu = db.collection("menu");
    return menu
      .find({})
      .toArray()
      .then((res) => res)
      .catch((err) => {
        throw "Err in fetching";
      });
  }
  static delete(id) {
    var db = getDb();
    var menu = db.collection("menu");
    return menu
      .deleteOne({ _id: ObjectId(id) })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  static edit(item) {
    var db = getDb();
    var menu = db.collection("menu");
    return menu
      .updateOne(
        { _id: ObjectId(item._id) },
        {
          $set: {
            name: item.name,
            timing: item.timing,
            products: item.products,
          },
        }
      )
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = Menu;
