import { NextResponse } from "next/server";
import axios from "axios";
import { Pool } from "pg";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const model = "Qwen/Qwen2.5-Coder-32B-Instruct";
// const model = "cssupport/t5-small-awesome-text-to-sql";


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sajin_wt",
  password: "1234",
  port: 5432,
});

export async function POST(req: Request) {
  const { query } = await req.json();

  // const databaseSchema = `
  // Tables:
  //  lead (id, email, ip, city, regionName, latitude, longitude, country, timezone, currency, mobile, device, source, userAgent, referrer, createdAt)
  //     Sample data: 
  //     { id: 1, email: 'siam@gmail.com', ip: '139.5.132.43', city: "Kāfrul", country: "Bangladesh", source: 'home', userAgent: 'Mozilla/5.0', referrer: "http://localhost:3001/", createdAt: '2025-02-05 09:13:36', regionName: "Dhaka Division", latitude: "23.7882", longitude: "90.3736", timezone: "Asia/Dhaka", currency: "BDT", mobile: false, device: "Windows" }
  
  //  company_req (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
  //     Sample data: 
  //     { id: 4, company_name: 'Tech Innssovators', company_type: 'Startup', growth: 'High', launch_date: '2021-05-01', funding: 'Seed', status: 'Pending', business_plan: true, liabilities_report: false, income_statement: true, pitch_deck: false, balance_sheet: true, valuation_report: false, admin_decision: 'Approved' }
  
  //  investor_req (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
  //     Sample data:
  //     { id: 3, investor_name: 'David Green', type: 'Private Equity', preferences: 'Energy', funds_available: '20M', history: '15 years', proof_of_funds: false, nid_passport: true, source_of_funds: true, investment_portfolio: false, admin_decision: 'Queued' }
  
  //  support_box (id)
  //     Sample data:
  //     { id: 1 }
  
  //   newsletter (id, title, subtitle, body, thumbnailImg, keywords, postDateTime)
  //     Sample data: 
  //     { id: 8, title: 'DOGE & SHIB Millionaires Are Betting Big on THIS Coin – Don’t Miss the 2025 Explosion!', subtitle: 'Prominent investors who struck gold with Dogecoin and Shiba Inu are now eyeing a new digital currency', body: 'XYZ: The Next Meme Coin Champion Ready to Dominate 2025...', thumbnailImg: '/news/1738663868225-XYZ-Featured.jpg', keywords: 'dodge, bit coin, crypto', postDateTime: '2025-02-04 16:11:08' }
  
  //   archived_companies (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
  //     Sample data: 
  //     { id: 1, company_name: 'Updated Investor Name', company_type: 'Startup', growth: 'High', launch_date: '2023-05-01', funding: '$500,000', status: 'Active', business_plan: true, liabilities_report: true, income_statement: true, pitch_deck: true, balance_sheet: true, valuation_report: true, admin_decision: 'Rejected' }
  
  //   archived_investors (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
  //     Sample data:
  //     { id: 1, investor_name: 'Jane Smith', type: 'VC', preferences: 'Healthcare', funds_available: '10M', history: '10 years', proof_of_funds: true, nid_passport: false, source_of_funds: true, investment_portfolio: true, admin_decision: 'Approved' }
  // `;
  
  const databaseSchema = `
  Tables:
 -- lead table creation and sample data
CREATE TABLE  lead (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    ip VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    country VARCHAR(255),
    source VARCHAR(255) NOT NULL,
    userAgent VARCHAR(255),
    referrer VARCHAR(255),
    createdAt TIMESTAMP DEFAULT now(),
    regionName VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255),
    timezone VARCHAR(255),
    currency VARCHAR(255),
    mobile BOOLEAN,
    device VARCHAR(255)
);

-- Inserting data into lead table
INSERT INTO  lead (id, email, ip, city, country, source, userAgent, referrer, createdAt, regionName, latitude, longitude, timezone, currency, mobile, device)
VALUES 
{ id: 1, email: 'siam@gmail.com', ip: '139.5.132.43', city: "Kāfrul", country: "Bangladesh", source: 'home', userAgent: 'Mozilla/5.0', referrer: "http://localhost:3001/", createdAt: '                       ', regionName: "Dhaka Division", latitude: "23.7882", longitude: "90.3736", timezone: "Asia/Dhaka", currency: "BDT", mobile: false, device: "Windows" }
(2, 'sajin@email.com', '::1', NULL, NULL, 'popups', 'PostmanRuntime/7.43.0', NULL, '2025-02-05 09:15:05', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- company_req table creation and sample data
CREATE TABLE  company_req (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_type VARCHAR(50) NOT NULL,
    growth VARCHAR(50),
    launch_date VARCHAR(20) NOT NULL,
    funding VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    business_plan BOOLEAN DEFAULT false NOT NULL,
    liabilities_report BOOLEAN DEFAULT false NOT NULL,
    income_statement BOOLEAN DEFAULT false NOT NULL,
    pitch_deck BOOLEAN DEFAULT false NOT NULL,
    balance_sheet BOOLEAN DEFAULT false NOT NULL,
    valuation_report BOOLEAN DEFAULT false NOT NULL,
    admin_decision VARCHAR(10)
);

-- Inserting data into company_req table
INSERT INTO  company_req (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
VALUES 
(4, 'Tech Innssovators', 'Startup', 'High', '2021-05-01', 'Seed', 'Pending', true, false, true, false, true, false, 'Approved'),
(7, 'EduSmart', 'EdTech', 'High', '2019-09-10', 'Bootstrapped', 'Approved', true, true, false, false, true, false, 'Approved');

-- investor_req table creation and sample data
CREATE TABLE  investor_req (
    id SERIAL PRIMARY KEY,
    investor_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    preferences VARCHAR(100) NOT NULL,
    funds_available VARCHAR(50) NOT NULL,
    history VARCHAR(50) NOT NULL,
    proof_of_funds BOOLEAN DEFAULT false NOT NULL,
    nid_passport BOOLEAN DEFAULT false NOT NULL,
    source_of_funds BOOLEAN DEFAULT false NOT NULL,
    investment_portfolio BOOLEAN DEFAULT false NOT NULL,
    admin_decision VARCHAR(10)
);

-- Inserting data into investor_req table
INSERT INTO  investor_req (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
VALUES 
(3, 'David Green', 'Private Equity', 'Energy', '20M', '15 years', false, true, true, false, 'Queued'),
(4, 'Emma Wilson', 'Crowdfunder', 'Education', '500K', '3 years', false, false, false, true, 'Rejected');

-- support_box table creation and sample data
CREATE TABLE  support_box (
    id SERIAL PRIMARY KEY
);

-- Inserting data into support_box table
INSERT INTO  support_box (id)
VALUES 
(1);

-- newsletter table creation and sample data
CREATE TABLE  newsletter (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(250),
    body TEXT NOT NULL,
    thumbnailImg VARCHAR(255),
    keywords TEXT,
    postDateTime TIMESTAMP NOT NULL
);

-- Inserting data into newsletter table
INSERT INTO  newsletter (id, title, subtitle, body, thumbnailImg, keywords, postDateTime)
VALUES 
(8, 'DOGE & SHIB Millionaires Are Betting Big on THIS Coin – Don’t Miss the 2025 Explosion!', 'Prominent investors who struck gold with Dogecoin and Shiba Inu are now eyeing a new digital currency', 'XYZ: The Next Meme Coin Champion Ready to Dominate 2025...', '/news/1738663868225-XYZ-Featured.jpg', 'dodge, bit coin, crypto', '2025-02-04 16:11:08'),
(9, 'DOGE & SHIB Millionaires Are Betting Big on THIS Coin – Don’t Miss the 2025 Explosion!', NULL, NULL, '/news/1738677287243-475073427_3104710443009818_5654482744849253174_n.jpg', 'sadf', '2025-02-04 19:54:47');

-- archived_companies table creation and sample data
CREATE TABLE  archived_companies (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_type VARCHAR(50) NOT NULL,
    growth VARCHAR(50),
    launch_date VARCHAR(20) NOT NULL,
    funding VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    business_plan BOOLEAN DEFAULT false NOT NULL,
    liabilities_report BOOLEAN DEFAULT false NOT NULL,
    income_statement BOOLEAN DEFAULT false NOT NULL,
    pitch_deck BOOLEAN DEFAULT false NOT NULL,
    balance_sheet BOOLEAN DEFAULT false NOT NULL,
    valuation_report BOOLEAN DEFAULT false NOT NULL,
    admin_decision VARCHAR(10)
);

-- Inserting data into archived_companies table
INSERT INTO  archived_companies (id, company_name, company_type, growth, launch_date, funding, status, business_plan, liabilities_report, income_statement, pitch_deck, balance_sheet, valuation_report, admin_decision)
VALUES 
(1, 'Updated Investor Name', 'Startup', 'High', '2023-05-01', '$500,000', 'Active', true, true, true, true, true, true, 'Rejected');

-- archived_investors table creation and sample data
CREATE TABLE  archived_investors (
    id SERIAL PRIMARY KEY,
    investor_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    preferences VARCHAR(100) NOT NULL,
    funds_available VARCHAR(50) NOT NULL,
    history VARCHAR(50) NOT NULL,
    proof_of_funds BOOLEAN DEFAULT false NOT NULL,
    nid_passport BOOLEAN DEFAULT false NOT NULL,
    source_of_funds BOOLEAN DEFAULT false NOT NULL,
    investment_portfolio BOOLEAN DEFAULT false NOT NULL,
    admin_decision VARCHAR(10)
);

-- Inserting data into archived_investors table
INSERT INTO  archived_investors (id, investor_name, type, preferences, funds_available, history, proof_of_funds, nid_passport, source_of_funds, investment_portfolio, admin_decision)
VALUES 
(1, 'Jane Smith', 'VC', 'Healthcare', '10M', '10 years', true, false, true, true, 'Approved');


--here's a sample sql query:
SELECT "email" 
FROM lead
WHERE DATE("createdAt") = '2025-02-05'
--remember that postgree is case sensative, so i need to put double inverted comma on column names and see the case on table creation like: "createdAd" on leads.
   `;
  
  
  
  

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: `You are a database assistant. no table is joinded with another table. Convert the following user query into a SQL query(we are using postgre sql): "${query}" using the schema: ${databaseSchema}`,
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

