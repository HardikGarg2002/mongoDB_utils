import mongoose from "mongoose";

const initMongoDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
  const MONGO_TIMEOUT = process.env.MONGO_TIMEOUT || 15000;
  const debug = process.env.MONGO_DEBUG || false;

  if (!MONGO_URI)
    throw new Error(
      "MONGO_URI and MONGO_DB_NAME is required in the dotenv file"
    );
  if (!MONGO_DB_NAME)
    console.log(
      "MONGO_DB_NAME is not provided in the dotenv file. Assuming it MONGOURIWITHDBin the URI"
    );

  console.log("Connecting to MongoDB...", MONGO_URI, MONGO_DB_NAME);

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
      minPoolSize: 5,
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: Number(MONGO_TIMEOUT),
    });

    // to show mongoo queries
    console.log("Database connected successfully");
    debug &&
      mongoose.set("debug", (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const isMongoDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

const disconnectMongoDB = () => {
  mongoose.disconnect();
  console.log("Database disconnected successfully");
};

const retryMongoDBConnection = async () => {
  try {
    if (!isMongoDBConnected()) {
      await initMongoDB();
    } else {
      console.log("Mongo Database is already connected");
    }
  } catch (error) {
    console.error("Error retrying MongoDb connection", error);
  }
};

export {
  initMongoDB,
  isMongoDBConnected,
  disconnectMongoDB,
  retryMongoDBConnection,
};
