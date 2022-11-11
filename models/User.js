const getDb = require("../utils/database").getDb;

class User {
  constructor(username, pwd) {
    this.email = username.toString().toLowerCase();
    this.pwd = pwd;
  }
  register(pcb, ncb) {
    var db = getDb();
    var users = db.collection("users");
    users.findOne({ email: this.email }, (err, res) => {
      if (err) throw "Err in register action DB";
      if (res) {
        return ncb("Account already exists");
      } else {
        return users.insertOne(
          { ...this, isAdmin: false, verified: false },
          (err, res) => {
            if (err) ncb("Error in creating new user");
            pcb();
          }
        );
      }
    });
  }
  static findUser(userId, pcb, ncb) {
    var db = getDb();
    var users = db.collection("users");
    users.findOne({ email: userId }, (err, res) => {
      if (err) throw "err";
      if (!res) {
        ncb("Account not found");
        return;
      }
      pcb();
      return;
    });
  }
  static async getUserStatus(userId) {
    var db = getDb();
    var users = db.collection("users");
    return await users.findOne({ email: userId });
  }
  static async verifyUser(userId) {
    var db = getDb();
    var users = db.collection("users");
    return await users.updateOne(
      { email: userId },
      { $set: { email: userId, verified: true } }
    );
  }
  static login(username, pwd, pcb, ncb) {
    var db = getDb();
    var users = db.collection("users");
    users.findOne({ email: username }, (err, res) => {
      if (err) throw "Err";
      if (!res) {
        ncb("Account not found");
        return;
      }
      if (res.pwd === pwd) {
        pcb();
      } else ncb("Wrong credentials");
    });
  }
}
module.exports = User;
