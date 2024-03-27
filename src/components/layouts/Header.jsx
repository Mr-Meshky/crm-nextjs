import Link from "next/link";

export const Header = () => {
  return (
    <header className="mt-4 flex items-center justify-between px-2 md:px-0">
      <Link href="/">
        <h2 className="text-3xl font-bold">Bama CRM</h2>
      </Link>
      <Link
        href="/add-customer"
        className="rounded border-2 border-green-600 px-3 py-2 font-bold transition duration-300 hover:bg-green-600 hover:text-white hover:shadow-sm"
      >
        Add Customer
      </Link>
    </header>
  );
};
