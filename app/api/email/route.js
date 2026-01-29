import { NextResponse } from "next/server";
import { ConnectDb } from "../../../lib/config/db";
import emailModel from "../../../lib/models/emailModel";

const LoadDB = async () => {
    await ConnectDb();
}
LoadDB();

export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    await emailModel.create(emailData);
    return NextResponse.json({success: true, message: "Email Subscribed"})
}