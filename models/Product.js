const { ObjectId } = require("mongodb");

const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, price, desc, imageUrl, quantity) {
    this._id = title;
    this.price = price;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
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
  static updateProduct(product) {
    var db = getDb();
    var products = db.collection("products");
    return products.updateOne(
      { _id: product._id },
      {
        $set: {
          price: product.price,
          desc: product.desc,
          imageUrl: product.imageUrl,
          quantity: product.quantity,
        },
      }
    );
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
