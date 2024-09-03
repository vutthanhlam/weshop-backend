import { Aggregate } from "mongoose";
import ProductModel from "../models/ProductModel";
import SessionModel from "../models/SessionModel";
import UserModel from "../models/UserModel";

export const resolvers = {
  Query: {
    test: async (parent, args, context) => {
      console.log("test function");
      return {
        name: "Lam",
      };
    },
    user: async (parent, args, context) => {
      console.log("get user", args.id);
      const user = await UserModel.findOne({ _id: args.id });
      return user;
    },
    products: async (parent, args, context) => {
      console.log("get products...");
      const products = await ProductModel.find().sort({
        updatedAt: -1,
      });
      return products;
    },
    product: async (parent, args, context) => {
      console.log("get product with id", args.id);
      const product = await ProductModel.findOne({ _id: args.id });
      return product;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      console.log("create new user", args);
      try {
        const newUser = new UserModel({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          password: args.password,
          address: args.address,
          role: args.role,
        });
        await newUser.save();
        try {
          const newSession = new SessionModel({
            user_id: newUser._id,
          });
          await newSession.save();
          return newSession;
        } catch (error) {
          return error;
        }
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    },
    updateUser: async (parent, args, context) => {
      return {
        name: "Lam",
      };
    },
    deleteUser: async (parent, args, context) => {
      return {
        name: "Lam",
      };
    },

    createProduct: async (parent, args, context) => {
      console.log(JSON.parse(args.variations));
      try {
        const newProduct = new ProductModel({
          name: args.name,
          description: args.description,
          price: args.price,
          category: args.category,
          sold: 0,
          rating: { rate: 0, n_reviewers: 0 },
          variations: JSON.parse(args.variations),
        });
        await newProduct.save();
        console.log(newProduct);
        return newProduct;
      } catch (error) {
        console.log(error);
        return {
          error: error,
        };
      }
    },
    deleteProduct: async (parent, args, context) => {
      console.log("delete product request");
      try {
        const deletedProduct = await ProductModel.findOneAndDelete(
          { _id: args.id },
          { returnDocument: "after" }
        );
        if (deletedProduct) return deletedProduct;
        return Error("No product macth the given info.");
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};
