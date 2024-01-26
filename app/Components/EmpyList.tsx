import Link from "next/link";

export default function EmptyList({ listType }: { listType: string }) {
  return (
    <div className="text-center p-4">
      <p>You don&apos;t have any items in {listType} yet.</p>
      <Link
        href="/"
        className="underline underline-offset-2 text-primary hover:text-secondary"
      >
        Start by browsing products
      </Link>
    </div>
  );
}
