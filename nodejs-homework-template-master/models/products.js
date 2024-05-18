import mongoose from "mongoose";
const { Schema, model } = mongoose;

/* //!Numele Modelul -> Colectia cu litera mica si la plural:
Product -> products,
User    -> users,
Task    -> tasks
*/

const schema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, "Numele este obligatoriu."],
    },
    size: {
      type: Number,
      min: 32,
      max: 52,
      comment: "Marimile sunt numere.",
    },
    type: {
      type: String,
      enum: ["tshirt", "shoe", "snickers"],
    },
  },
  //! Pot sa specific eu, daca vreau, in mod direct, numele colectiei de care o sa fie legat modelul:
  { collection: "products" } //! camp optional, daca numele colectiei difera!
);

const Product = model("Product", schema);

export default Product;
