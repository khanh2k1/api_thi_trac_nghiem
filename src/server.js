const app = require('./app')
const ConnectDB = require('./database/connect')
require('dotenv').config({ path: '../.env' });

const port = process.env.PORT || 8888;

const server = app.listen(port, ()=>{
  console.log(`Listening port : ${port}`)
  ConnectDB.connectToMongo()
})

process.on("SIGINT", () => {
  server.close(() => {
    console.log("EXIT SERVER !");
  });
});
