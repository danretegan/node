import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://danretegan:IrvRpTc8rgckb11U@cluster0.hmnlbw5.mongodb.net/productsdb"
    );
    console.log("Conectat la baza de date 'productsdb' cu succes! ");
  } catch (error) {
    console.error(error);
    //! La eroare inchid serverul:
    process.exit(1);
  }
}

export default connectToDb;
