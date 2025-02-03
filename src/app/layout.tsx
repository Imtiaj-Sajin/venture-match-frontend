import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
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
