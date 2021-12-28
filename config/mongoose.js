
const mongoose = require("mongoose");

// connecting to mombgoose
// mongoose.connect('mongodb://localhost:27017/csvDB',
mongoose.connect('mongodb+srv://learningdemo068:HCsRDfy2vDs2KxN2@cluster0.zp24b.mongodb.net/csvUploader?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

// handling error if any 
db.on("error",  console.error.bind(console,"connection error :cannot connect to the db"));

// on succesfull mongoose.connection 
db.once("open", () => {
  console.log("connected successfully to database")
});