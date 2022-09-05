const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;
  const imageUrl = req.body.imageUrl;
  if (!title || parseInt(price) <= 0 || !desc || !imageUrl)
    return res.status(500).json({ error: "err in fields" });
  const product = new Product(title, price, desc, imageUrl);
  product
    .save()
    .then(() => {
      return res.json({ message: "product added" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "err" });
    });
};
exports.fetchAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then((response) => {
      return res.json({ products: response });
    })
    .catch((err) => {
      return res.status(500).json({ error: "err" });
    });
};

exports.placeOrder = (req, res, next) => {
  const userid = req.body.username;
  const products = req.body.products;
  if (!userid || !Array.isArray(products))
    return res.status(500).json({ error: "Err in fields" });
  const order = new Order(userid, products);
  order
    .placeOrder()
    .then(() => {
      return res.json({ message: "Order placed" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Err" });
    });
};

exports.fetchUserOrders = (req, res, next) => {
  const userid = req.body.username;
  if (!userid) return res.status(500).json({ error: "Err No userid" });
  Order.fetchOrderByUserId(userid)
    .then((response) => {
      return res.json({ orders: response });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Err" });
    });
};
exports.cancelOrder = (req, res, next) => {
  const orderId = req.body.orderid;
  if (!orderId) return res.status(500).json({ error: "Err No orderid" });
  const positiveCallback = (action) => {
    return res.json({ message: `${action} successfully` });
  };
  const negativeCallback = () => {
    return res.status(500).json({ error: "Err" });
  };
  Order.cancelOrderById(orderId, positiveCallback, negativeCallback);
};
exports.getAllOrders = (req, res, next) => {
  Order.getAllOrders()
    .then((response) => {
      return res.json({ orders: [...response] });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Err" });
    });
};
exports.processOrder = (req, res, next) => {
  const orderId = req.body.orderid;
  const positiveCallback = (action) => {
    return res.json({ message: `${action} successfully` });
  };
  const negativeCallback = () => {
    return res.status(500).json({ error: "Err" });
  };
  Order.processOrderById(orderId, positiveCallback, negativeCallback);
};
exports.registerUser = (req, res, next) => {
  const username = req.body.username;
  const pwd = req.body.password;
  const user = new User(username, pwd);
  const positiveCallback = (action) => {
    return res.json({ message: `Account created successfully` });
  };
  const negativeCallback = () => {
    return res.status(409).json({ error: "User Already exists" });
  };
  user.register(positiveCallback, negativeCallback);
};
exports.loginUser = (req, res, next) => {
  const username = req.body.username;
  const pwd = req.body.password;
  const positiveCallback = () => {
    //JWT implementation
    const token = jwt.sign({ user: username }, "secret+key", {
      expiresIn: "24h",
    });
    return res.status(200).json({ accessToken: token });
  };
  const negativeCallback = (msg) => {
    return res.status(400).json({ error: msg });
  };
  try {
    User.login(username, pwd, positiveCallback, negativeCallback);
  } catch (err) {
    return res.status(500).json({ error: "Err" });
  }
};
