import axios from "axios";

export async function POST(req: Request) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ message: "Only POST requests allowed" }),
        { status: 405 },
        );
    }
     // parsing the request body
    const data = await req.json()
    const {predictionId, token} = data
    const REPLICATE_API_TOKEN = token ? token : process.env.REPLICATE_API_TOKEN as string

    try{
        const predictionResult = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
            headers: {
                "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
            }
        })
        const outputs = predictionResult.data.output
        // If we didn't get an output
        if(outputs.length === 0){
            return new Response(JSON.stringify({ message: "Prediction has failed" }), {
                status: 500,
            });
        }
        // send the results to the user
        return new Response(JSON.stringify({
            outputs
        }))
    }
    catch(error: any){
        return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), {
            status: 500,
        });
    }
}