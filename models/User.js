const getDb = require("../utils/database").getDb;

class User {
  constructor(username, pwd) {
    this._id = username;
    this.pwd = pwd;
  }
  register(pcb, ncb) {
    var db = getDb();
    var users = db.collection("users");
    return users.insertOne({ ...this, isAdmin: false }, (err, res) => {
      if (err) ncb();
      pcb();
    });
  }
  static login(username, pwd, pcb, ncb) {
    var db = getDb();
    var users = db.collection("users");
    users.findOne({ _id: username }, (err, res) => {
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
