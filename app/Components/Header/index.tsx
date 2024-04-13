import Link from "next/link";

export default async function Header() {
  return (
    <header className="flex flex-col">
      <section className="flex justify-between p-2 text-light bg-dark">
        <Link href="/" className="text-xl font-bold">
          Dev Store.
        </Link>
      </section>
    </header>
  );
}
