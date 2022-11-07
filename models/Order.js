const { ObjectId } = require("mongodb");
const Product = require("../models/Product");
const getDb = require("../utils/database").getDb;
class Order {
  constructor(userid, products) {
    this.userid = userid;
    this.products = products;
    this.status = "Placed";
  }
  placeOrder() {
    var db = getDb();
    var orders = db.collection("orders");
    // products = [{"product":"Snack4","quantity":3} ]
    [...this.products].map((prod) => {
      const existingQty = Product.getProductById(prod.product);
    });
    return orders
      .insertOne({ ...this, orderDate: new Date() })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  static getAllOrders() {
    var db = getDb();
    var orders = db.collection("orders");

    return orders
      .find()
      .toArray()
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  }
  static fetchOrderByUserId(userid) {
    var db = getDb();
    var orders = db.collection("orders");
    return orders
      .find({ userid: userid })
      .toArray()
      .then((res) => res)
      .catch((err) => {
        throw "Err in fetching";
      });
  }
  static cancelOrderById(orderid, pcb, ncb) {
    var db = getDb();
    var orders = db.collection("orders");
    orders.updateOne(
      { _id: ObjectId(orderid) },
      { $set: { status: "Cancelled" } },
      (err, res) => {
        if (err) ncb();
        pcb("Cancelled");
      }
    );
  }
  static processOrderById(orderid, pcb, ncb) {
    var db = getDb();
    var orders = db.collection("orders");
    orders.updateOne(
      { _id: ObjectId(orderid) },
      { $set: { status: "Processed" } },
      (err, res) => {
        if (err) ncb();
        pcb("Processed");
      }
    );
  }
}
module.exports = Order;
