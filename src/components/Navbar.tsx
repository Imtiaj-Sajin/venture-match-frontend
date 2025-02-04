"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md p-5 fixed w-full top-0 z-50 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900">Optra</h1>

      {/* Navigation Links */}
      <div className="space-x-6">
      <Link href="/">Home</Link>
        <Link href="/admin">Dashboard</Link>
        <Link href="#">Solutions</Link>
        <Link href="#">Pricing</Link>
       </div>

      {/* CTA Button */}
      <Link href="/auth/login" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
        Login
      </Link>
    </nav>
  );
}