import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv({quiet:true});

const uri = process.env.MONGO_URI;

async function mongoConnect() {
  try {
    
    await mongoose.connect(uri);
    
    console.log("successfully connected to MongoDB!");
  
} finally {
    
    await mongoose.disconnect();
  }
}

export default mongoConnect;

