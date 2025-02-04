'use client'
import { useEffect } from "react";

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
        <body className="bg-gray-50">
          {children}
        </body>
      </html>
    );
  }
  

  