import { NextResponse } from "next/server"
import { ConnectDb } from "../../../lib/config/db"
import { writeFile } from "fs/promises";
import blogModel from "../../../lib/models/blogModel";

//db connection
const LoadDB = async() => {
    await ConnectDb();
}
LoadDB();

export async function GET(request) {
    return NextResponse.json({message: "API working"})
}

//API for storing Blog data 
export async function POST(request){
    //logic to store data in database
    const formData = await request.formData();
    const timestamp = Date.now();

    //extract image from formData
    const image = formData.get('image');

    //convert image into bytedata and store in public folder
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imageUrl = `/${timestamp}_${image.name}`;
    
    const blogData = {
	title: `${formData.get('title')}`,
	description: `${formData.get('description')}`,
	category: `${formData.get('category')}`,
	author: `${formData.get('author')}`,
	image: `${imageUrl}`,
	authorImg: `${formData.get('authorImg')}`
    }

    await blogModel.create(blogData);
    console.log("Blog saved");
    return NextResponse.json({success: true, message: "Blog created"})
}