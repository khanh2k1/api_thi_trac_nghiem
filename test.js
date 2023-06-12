const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test_speed_query", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Failed to connect to MongoDB: ${err}`);
  }
};

const UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  age: Number,
  email: String,
});

const User = mongoose.model("users", UserSchema);

async function getAll() {
  let users = [];
  // create index
  // Tạo index trên trường "age"
 await User.createIndexes({ age: 1 });
  const start = Date.now();
  users = await (await User.find({ age: { $gte: 18 } }).hint({ age: 1 })).toString()
   
   
  const end = Date.now();

  console.log(users.length);
  const executionTime = end - start;
  console.log(executionTime);
}
// Kết nối tới MongoDB và thêm mảng users
connectToMongo().then(() => {
  getAll().then(() => {
    // Công việc hoàn thành, có thể thực hiện các hành động khác tại đây
    mongoose.connection.close();
  });
});
