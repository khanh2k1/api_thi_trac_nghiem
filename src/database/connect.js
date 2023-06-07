"use strict";

require('dotenv').config({ path: '.env' });

const mongoose = require("mongoose");
const uri = process.env.URI
const uri_cluster = "mongodb+srv://sa:sa@cluster0.gkmmhep.mongodb.net/thi_trac_nghiem?retryWrites=true&w=majority"


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
  }
};


module.exports = {
  connectToMongo,
  connection: mongoose.connection,
  closeMongoDBConnection,
};


