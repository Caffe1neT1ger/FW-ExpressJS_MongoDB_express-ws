import mongoose from "mongoose";

export const connectionDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URI,{
            useUnifiedTopology:true,
        useNewUrlParser:true,
        })
        console.log(`MongoDb connected: ${connection.connection.host}`.cyan.underline);
    }
    catch (error){
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}