"use client";

import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    "Careers",
    "Blog",
    "About Us",
    "Become an Affiliate",
    "Our Devices",
    "Shipping Rates & Policies",
  ];

  return (
    <footer className="text-center p-4 bg-secondary-dark pb-28 md:pb-32 flex flex-col gap-4 text-white mt-auto">
      <div className="flex flex-col md:flex-row items-center gap-4 p-2 justify-center">
        {footerLinks.map((link) => (
          <Link className="hover:text-secondary hover:underline-offset-4 underline underline-offset-2 transition-all" key={link} href="#">
            {link}
          </Link>
        ))}
      </div>
      <p className="font-bold">© Dev Store.</p>
    </footer>
  );
}
