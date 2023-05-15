import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoBD twitter-clone");
    return connection;
  } catch (err) {
    console.error(err);
  }
}

export { connect };
