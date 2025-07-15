import {connect} from '@/dbConfig/dbConfig';
import {  NextResponse } from 'next/server';

connect()

export async function GET() {
    try {
     const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
         })
         
         response.cookies.set("token","",{httpOnly:true,expires: new Date(0)})
         return response

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unexpected error';
        return NextResponse.json({ error: message }, { status: 500 });
      }
}