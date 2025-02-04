"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/styles/globals.css";
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.chatbase) {
      const script = document.createElement("script");
      script.innerHTML = `
        (function(){
          if(!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase=(...arguments) => {
              if(!window.chatbase.q){window.chatbase.q=[]}
              window.chatbase.q.push(arguments)
            };
            window.chatbase=new Proxy(window.chatbase,{
              get(target,prop) {
                if(prop === "q") { return target.q }
                return (...args) => target(prop,...args)
              }
            });
          }
          const onLoad = function(){
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "mZkDp18zEPef8MQU_VvgR";
            script.domain = "www.chatbase.co";
            document.body.appendChild(script);
          };
          if(document.readyState === "complete") { onLoad(); }
          else { window.addEventListener("load", onLoad); }
        })();
      `;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-24 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
