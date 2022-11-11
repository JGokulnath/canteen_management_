const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
let mongoClient;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Roopan:f5eS8u2TN0cu3cyE@cluster0.x531j.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      mongoClient = client;
      _db = client.db("canteeen");
      callback(client);
    })
    .catch((err) => {
      throw err;
    });
};
const getDb = () => {
  if (_db) return _db;
  else throw "No database found";
};
const getClient = () => {
  if (mongoClient) return mongoClient;
  else throw "No Client returned";
};
exports.getClient = getClient;
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
