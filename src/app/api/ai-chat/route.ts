import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { query } = await req.json();

  const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; 
  const model = "mistralai/Mistral-7B-Instruct-v0.3"; 

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/" + model,
      { 
        inputs: query 

      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ results: response.data });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch data from Hugging Face." },
      { status: 500 }
    );
  }
}
