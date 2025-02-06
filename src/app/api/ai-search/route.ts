import { NextResponse } from "next/server";
import axios from "axios";
import { Pool } from "pg";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const model = "mistralai/Mistral-7B-Instruct-v0.3";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sajin_wt",
  password: "sajin",
  port: 5432,
});

export async function POST(req: Request) {
  const { query } = await req.json();

  const databaseSchema = `
  Tables:
  - lead (id, email, ip, city, regionName, latitude, longitude, country, timezone, currency, mobile, device, source, userAgent, referrer, createdAt)
  - company_req (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
  - investor_req (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
  - support_box (id)
  - newsletter (id, title, subtitle, body, thumbnailImg, keywords, postDateTime)
  - archived_companies (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
  - archived_investors (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
  `;
  

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: `You are a database assistant. no table is joinded with another table. Convert the following user query into a SQL query: "${query}" using the schema: ${databaseSchema}`,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response ==> ", response);


    const sqlQuery = response.data?.[0]?.generated_text?.trim();
    if (!sqlQuery || !sqlQuery.toLowerCase().includes("select")) {
      return NextResponse.json(
        { message: "Failed to generate a valid SQL query." },
        { status: 400 }
      );
    }


    const match = sqlQuery.match(/```sql([\s\S]*?)```/);
    const extractedSQL = match ? match[1].trim() : null;
    console.log("extractedSQL ==> ", extractedSQL);

    if (!extractedSQL) {
      return NextResponse.json(
        { message: "Invalid SQL generated." },
        { status: 400 }
      );
    }

    console.log("Executing SQL: ", extractedSQL);
    const result = await executeSQLQuery(extractedSQL);
    return NextResponse.json({ results: result });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

async function executeSQLQuery(sqlQuery: string) {
  try {
    const safeQuery = sqlQuery.replace(/;/g, ""); // Prevent SQL injection
    const { rows } = await pool.query(safeQuery);
    return rows;
  } catch (err) {
    console.error("Error executing SQL query:", err);
    throw new Error("Error executing SQL query.");
  }
}
