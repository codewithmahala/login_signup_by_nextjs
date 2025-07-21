import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
connect()

export async function POST(request: NextRequest) {
    const userId =await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({
      message:"User Found",
      data: user
    })
}
export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const body = await request.json();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        pin: body.pin,
        state: body.state,
        city: body.city,
      },
      {
        new: true,            // Return the updated user
        runValidators: true,  // Enforce schema validation
      }
    ).select("-password");

    return NextResponse.json({
      message: "Profile Updated",
      data: user,
      success: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message, success: false }, { status: 500 });
  }
}
