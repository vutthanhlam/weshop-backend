import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";

dotenv.config();

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const DB_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);

const db_uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${DB_PASSWORD}@lamia-vu.ediy5nv.mongodb.net/e-commerce-shop?retryWrites=true&w=majority&appName=lamia-vu`;

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

mongoose
  .connect(db_uri)
  .then(async () => {
    console.log("Connected to Database!");
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  })
  .catch((error) => {
    console.log(error);
  });
