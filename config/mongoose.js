
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/csvDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error",  console.error.bind(console,"connection error :cannot connect to the db"));
db.once("open", () => {
  console.log("connected successfully to database")
});