import axios from "axios";
import { error } from "console";

export async function POST(req: Request) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ message: "Only POST requests allowed" }),
        { status: 405 },
        );
    }
    // parsing the request body
    const data = await req.json();
    const { token } = data;
    // getting our secret key
    const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;
    // If no token is provided in the request, return an error
    if (!token) {
        return new Response(JSON.stringify({ message: "Token not found" }), {
        status: 400,
        });
    }

    try {
        // making an http request to google to verfiry the recaptcha token
        const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {timeout: 5000}
        );

        if (response.data.success) {
            return new Response(JSON.stringify({ message: "Success" }), {
                status: 200,
            });
        } 
        else {
            return new Response(JSON.stringify({ message: "Failed to verify" }), {
                status: 401,
                
            });
        }
    } 
    catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}