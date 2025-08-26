import mongoose from "mongoose"; 


const connectDB = async() =>{
   try {
    const uri = process.env.MONGO_URL 
    await mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    console.log("MongoDB connected");
   } catch (error) {
     console.log(error)
     process.exit(1)
   }

}
export default connectDB;