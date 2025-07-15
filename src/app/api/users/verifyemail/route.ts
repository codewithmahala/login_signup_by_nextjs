import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log('Received token:', token);

    // Find the user with the provided token and ensure the token is not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: new Date() }, // Ensure the token expiry is in the future
    });
console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    console.log('User found:', user);

    // Update the user's verification status
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: 'Email verified successfully', success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    console.error('Error in verifyemail API:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}