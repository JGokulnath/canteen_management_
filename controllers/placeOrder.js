const { getClient } = require("../utils/database");
exports.placeOrder = async (req, res, next) => {
  const userId = req.body.username; // Ex: "roopantj7@gmail.com"
  const products = req.body.products; // Ex: [{ pid:"Snack3",quantity:4 },{ pid:"Snack4",quantity:4 }]

  const client = getClient();
  const productCollection = client.db("canteeen").collection("products");
  const ordersCollection = client.db("canteeen").collection("orders");

  const session = client.startSession();
  const transactionOptions = {
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
    readPreference: "primary",
  };
  try {
    const transactionResults = await session.withTransaction(async () => {
      for (let i = 0; i < products.length; i++) {
        const item = products[i];
        const stockAvailability = await productCollection.findOne(
          {
            _id: item.pid,
            quantity: { $gte: item.quantity + 5 },
          },
          { session }
        );
        if (stockAvailability === null) {
          throw "Insufficient quantity - " + item.pid;
        }
        await productCollection.updateOne(
          { _id: item.pid },
          { $inc: { quantity: -item.quantity } },
          { session }
        );
      }

      const orderResult = await ordersCollection.insertOne(
        {
          userid: userId,
          products: products,
          status: "Placed",
          orderDate: new Date(),
        },
        { session }
      );
      console.log("Order Results " + orderResult);
    }, transactionOptions);
    if (transactionResults) {
      res.status(201).json({ msg: "Order placed successfully" });
    } else {
      throw "Order not placed";
    }
  } catch (e) {
    res.status(200).json({ msg: e });
  } finally {
    await session.endSession();
  }
};
