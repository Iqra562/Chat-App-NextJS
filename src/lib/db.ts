import mongoose from "mongoose"

export const connectDB =async ()=>{
try{
 await mongoose.connect(process.env.MONGO_URI!);
 const connection = mongoose.connection;
 connection.on('connect',()=>{
    console.log("mongodb connected")
 })
 connection.on('error',(err)=>{
    console.log('mongo db connection error',err);
    process.exit();
 })
}catch(error){
console.log(error)
}
}