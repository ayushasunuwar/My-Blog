import { NextResponse } from "next/server"
import { ConnectDb } from "../../../lib/config/db"
import { writeFile } from "fs/promises";
import blogModel from "../../../lib/models/blogModel";
const fs = require("fs")


//db connection
const LoadDB = async() => {
    await ConnectDb();
}
LoadDB();

//API endpoint to get all blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await blogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await blogModel.find({});
        return NextResponse.json({blogs});
    }
};

//API endpoint for uploading Blogs
export async function POST(request){
    //logic to store data in database
    const formData = await request.formData();
    const timestamp = Date.now();

    //extract image from formData
    const image = formData.get('image');

    if (!image) {
    return NextResponse.json(
        { success: false, message: "Image not provided" },
        { status: 400 }
    );
    }


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

//API endpoint to delete blog
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await blogModel.findById(id);
    fs.unlink(`./public${blog.image}`, ()=>{});
    await blogModel.findByIdAndDelete(id);
    return NextResponse.json({message: "Blog Deleted"})
}