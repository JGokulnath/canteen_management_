const { ObjectId } = require("mongodb");

const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, price, desc, imageUrl) {
    this._id = title;
    this.price = price;
    this.desc = desc;
    this.imageUrl = imageUrl;
  }
  save() {
    var db = getDb();
    var products = db.collection("products");
    return products
      .insertOne({ ...this, createdDate: new Date() })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  static fetchAll() {
    var db = getDb();
    var products = db.collection("products");
    return products
      .find({}, { _id: 0 })
      .toArray()
      .then((res) => res)
      .catch((err) => {
        throw "Err in fetching";
      });
  }
  static getProductById(id) {
    var db = getDb();
    var products = db.collection("products");

    return products
      .find({ _id: id })
      .toArray()
      .then((res) => res[0])
      .catch((err) => {
        throw "err in getting product by id";
      });
  }
}

module.exports = Product;
