import mongoose from "mongoose"

export const ConnectDb = async() => {
    await mongoose.connect('mongodb+srv://aisharodriguez91_db_user:Tokyogh0ul@cluster0.jotymdj.mongodb.net/blog-app');
    console.log("DB connected");
}

