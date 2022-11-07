const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://127.0.0.1:27017")
    .then((client) => {
      console.log("Connected");
      _db = client.db("canteen");
      callback();
    })
    .catch((err) => {
      throw err;
    });
};
const getDb = () => {
  if (_db) return _db;
  else throw "No database found";
};
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
