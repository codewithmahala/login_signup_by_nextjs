import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
connect()

export async function POST(request: NextRequest) {
    try {
       const reqBody = await request.json()
       const {email,password} = reqBody
        
       console.log(reqBody);
  
       const user =await User.findOne({email})
       if(!user) return NextResponse.json({error: 'User does not exist'}, {status: 400})
       console.log("user exist");
       
       const validPassword =await bcryptjs.compare(password,user.password)
  
       if(!validPassword){
        return NextResponse.json({error: 'Check your credentials'}, {status: 400})
       }
       
       const tokenData ={
        id: user._id,
        email: user.email
       }
       
       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1h'})
       
       const response = NextResponse.json({
        message: "Logged In Success",
        success:true
       })

       response.cookies.set("token",token,{httpOnly:true})
       return response
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unexpected error';
        return NextResponse.json({ error: message }, { status: 500 });
      }
}