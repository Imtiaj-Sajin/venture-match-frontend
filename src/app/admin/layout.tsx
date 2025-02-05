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
      <body className="flex bg-gray-50 h-screen overflow-hidden"> {/* Prevent scrolling */}
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden"> {/* Make content fit */}
          <Header />
          <main className="flex-1 mt-16 p-0 overflow-auto"> {/* Scroll only inside this if needed */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
