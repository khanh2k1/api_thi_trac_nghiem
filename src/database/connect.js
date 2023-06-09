"use strict";


const mongoose = require("mongoose");
const uri = process.env.URI
const uri_cluster = process.env.URI_CLUSTER
console.log(uri_cluster)

const connectToMongo = async () => {
  try {
    await mongoose.connect(uri_cluster, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Mongo");
  } catch (err) {
    console.log(`failed connect Mongo ${err}`);
  }
};

const closeMongoDBConnection = async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.log(error)
  }
};


module.exports = {
  connectToMongo,
  closeMongoDBConnection,
};


