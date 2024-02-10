import Link from "next/link";

export default function Navbar() {
  const navStyles = "hover:text-secondary-dark";

  return (
    <nav className="flex gap-6 bg-secondary p-4 justify-between">
      <Link className={navStyles} href="/admin">
        Dashboard
      </Link>

      <Link href="/admin/products/create" className={navStyles}>
        New Product
      </Link>
    </nav>
  );
}
