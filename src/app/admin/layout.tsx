"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "mZkDp18zEPef8MQU_VvgR",
        domain: "www.chatbase.co"
      }
    `;

    
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute("chatbotId", "mZkDp18zEPef8MQU_VvgR");
    script2.setAttribute("domain", "www.chatbase.co");
    script2.defer = true;
    document.head.appendChild(script2);
  }, []);

  return (
    <html lang="en">
      <body className="flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-16 p-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
