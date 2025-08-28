import mongoose from "mongoose"

const ConnectDB = async ()=>{
    try {
        mongoose.connection.on("connected", ()=> {
            console.log("Database Connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/ArbazblogData`)
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectDB;