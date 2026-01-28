'use client'

import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"

const page = () => {

    const [image, setImage] = useState<File | null>(null)

  return (
    <>
        <form className="pt-5 px-5 sm:pt-12 sm:pl-16">
            <p className="text-xl">Upload Thumbnail</p>
            <label htmlFor="image">
                <Image className="mt-4" src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=""/>
            </label>
            <input onChange={(e)=>e.target.files && setImage(e.target.files[0])} type="file" id="image" hidden required />
            <p className="text-xl mt-4">Blog Title</p>
            <input className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="Type here" required />

            <p className="text-xl mt-4">Blog Description</p>
            <textarea className="w-full sm:w-[500px] mt-4 px-4 py-3 border" placeholder="Write content here" rows={6} required />

            <p className="text-xl mt-4">Blog Category</p>
            <select className="w-40 mt-4 px-4 py-3 border text-gray-500" name="category">
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <button type="submit" className="mt-4 w-40 h-12 bg-black text-white">Add</button>
        </form>
    </>
  )
}

export default page