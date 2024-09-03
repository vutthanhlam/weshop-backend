import mongoose from "mongoose";

type Product = {
  id: String;
  amount: Number;
  price: Number;
  variation: String;
};

enum OrderStatus {
  CREATED,
  READY,
  DELIVERING,
  FINISH,
}

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    products: {
      type: [Product],
      require: true,
    },
    sub_total: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    status: {
      type: OrderStatus!,
      require: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;
