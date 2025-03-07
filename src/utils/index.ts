import { SignJWT } from 'jose'
import { jwtVerify } from "jose";
import {cookies} from "next/headers"
import bcrypt from "bcrypt"
import { getJwtSecretKey } from '@/lib/auth'

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(getJwtSecretKey())

interface JWTPayload {
    email: string;
    name: string;
}

export async function encrypt(payload: {email: string, name: string}): Promise<string> {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
    
    cookies().set({
        name: "session",
        value: token,
        httpOnly: true,
        sameSite: "lax"
    })

    return token;
}

export async function decrypt(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, key)
    return payload as unknown as JWTPayload
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function CheckIfPasswordsMatch(password: string, hashedPassword: string): Promise<boolean>{
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    return passwordsMatch
}

export async function HashPassword(password: string): Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}   
