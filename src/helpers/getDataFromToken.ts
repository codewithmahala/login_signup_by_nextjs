import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("Token not found in cookies.");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;

    return decodedToken.id;
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
};
