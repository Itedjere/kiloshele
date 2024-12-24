// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import path from "node:path";
import "dotenv/config";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import dbconnect from "./dbconnect/dbconnect.js";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware.js";
import fileUploadRouter from "./routes/fileUploadRoute.js";
import { __dirname } from "./serverPath.js";
import { fileDeletion } from "./utilities/fileDeletion.js";
import { multerErrorHandlerMiddleware } from "./multer/multerErrorHandlerMiddleware.js";

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/upload",
  express.json(),
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
  authenticationMiddleware,
  fileUploadRouter
);

// Error-handling middleware
app.use("/upload", multerErrorHandlerMiddleware);

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  express.json({ limit: "50mb" }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  authenticationMiddleware,
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

// Port
const port = process.env.PORT || 4060;

try {
  // Connect To DB
  await dbconnect();
  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/`);
} catch (error) {
  console.log("Server Error", error);
}
