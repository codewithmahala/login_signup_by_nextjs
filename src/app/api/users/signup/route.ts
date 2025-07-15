import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request: NextRequest) {
    try {
       const reqBody = await request.json()
       const {email, password} = reqBody
        
       console.log(reqBody);
  
       const user =await User.findOne({email})
       if(user) return NextResponse.json({error: 'User already exists'}, {status: 400})

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            email,
            password: hashedPassword
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);

         const userId =savedUser._id
        // send verification mail
        await sendEmail({email, emailType: "VERIFY", userId: userId._id})
        
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })


    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unexpected error';
        return NextResponse.json({ error: message }, { status: 500 });
      }
}