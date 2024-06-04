import { SignJWT, jwtVerify } from "jose";
import {cookies} from "next/headers"

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: any){
    const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);

    cookies().set({
        name: "session",
        value: session,
        httpOnly: true,
        sameSite: "lax"
    })
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}