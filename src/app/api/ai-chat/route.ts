import { NextResponse } from "next/server";
import axios from "axios";
import { createConnection } from "mysql2/promise"; // For MySQL database connection

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const DATABASE_CONFIG = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "your_database",
};

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    // Step 1: Get SQL Query from Hugging Face
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: `Generate an SQL query for: ${query}`,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = hfResponse.data[0]?.generated_text || "";
    const sqlQuery = generatedText.match(/SELECT[\s\S]*?;/i)?.[0]; // Extract SQL from response

    if (!sqlQuery) {
      return NextResponse.json({ error: "Failed to generate SQL query." }, { status: 400 });
    }

    console.log("Generated SQL:", sqlQuery);

    // Step 2: Connect to Database & Execute SQL
    const connection = await createConnection(DATABASE_CONFIG);
    const [rows] = await connection.execute(sqlQuery);
    await connection.end();

    // Step 3: Return SQL and Result
    return NextResponse.json({ sql: sqlQuery, result: rows });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to process the request." }, { status: 500 });
  }
}
