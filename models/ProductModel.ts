import mongoose from "mongoose";

// const type Variation = {
//     type: String;
//     img_id: String;
//     img_url: String;
// };

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    sold: {
      type: Number,
      require: true,
    },
    rating: {
      type: {
        rate: Number,
        n_reviewers: Number,
      },
      require: true,
    },
    variations: {
      type: [
        {
          color: String,
          available: Number,
          img_urls: [String],
        },
      ],
      require: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
