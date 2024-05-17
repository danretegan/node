const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const cats = new Schema({
  nickname: {
    type: String,
    minlength: 2,
    maxlength: 7,
    required: [true, "Nickname is required"],
    index: 1,
  },
  age: {
    type: Number,
    min: 1,
    max: 50,
  },
  owner: {
    name: String,
    address: [String], // tip - o matrice de string-uri
    birthday: Date,
  },
});

cats.index({ age: 2 });

const Cat = mongoose.model("cat", cats);

const cat = new Cat({
  nickname: "Bart",
  age: 1,
});

const result = cat.save();
console.log("Pisica este salvată în baza de date! ", result);
