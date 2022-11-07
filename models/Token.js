const getDb = require("../utils/database").getDb;
class Token {
  constructor(userId, token) {
    this.userId = userId.toString().toLowerCase();
    this.token = token;
  }
  createToken() {
    var db = getDb();
    var tokens = db.collection("tokens");
    return tokens.updateOne(
      { userId: this.userId },
      { $set: { userId: this.userId, token: this.token } },
      { upsert: true }
    );
  }
  static async findToken(userId, token, pcb, ncb) {
    var db = getDb();
    var tokens = db.collection("tokens");
    return await tokens.deleteOne({ userId: userId, token: token });
  }
}
module.exports = Token;
