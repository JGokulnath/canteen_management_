const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Roopan:Roopan@cluster0.x531j.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db("canteeen");
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
