import mongoose from "mongoose"

export const connectDB = async ()=>{
    // await mongoose.connect('mongodb+srv://akshay1212:<db_password>@cluster0.micyxvj.mongodb.net/food-project').then(()=>console.log("DB connected"));
    await mongoose.connect('mongodb+srv://akshay1212:Akshay1212@cluster0.micyxvj.mongodb.net/food-project?retryWrites=true&w=majority').then(()=>console.log("DB connected"))
}


// import mongoose from 'mongoose'
// export const connectDB = async()=>{
// const uri= 'mongodb+srv://akshay1212:<Akshay1212>@cluster0.micyxvj.mongodb.net/food-project';
// await mongoose.connect(uri, {userNewUrlParser: true, useUnifiedTopology: true})
//     .then(()=> console.log("DB Connected"))
//     .catch(err=>console.log("DB connection error : ",err))
// }



// import dotenv from 'dotenv'
// dotenv.config()
// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB connected");
//   } catch (error) {
//     console.error("DB connection error:", error);
//     process.exit(1);
//   }
// };

