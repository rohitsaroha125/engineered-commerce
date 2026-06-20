import CategoriesDropdown from "./CategoriesDropdown";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

async function getCategories(): Promise<Category[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8010";
  try {
    const res = await fetch(`${API_URL}category/`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories ?? [];
  } catch {
    return [];
  }
}

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M4 7L12 11L20 7M12 11V21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-medium text-ink">
            Storefront
          </span>
        </a>

        {/* Nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            Home
          </Link>
          <CategoriesDropdown categories={categories} />
          <Link
            href="/products"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            Products
          </Link>
        </nav>

        {/* Cart */}
        <div className="flex">
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-bg hover:text-accent mr-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L5.4 6M5.4 6H21L18.5 14H7.5L5.4 6Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19" r="1.4" fill="currentColor" />
              <circle cx="17" cy="19" r="1.4" fill="currentColor" />
            </svg>
          </Link>
          <Link href="/login">
            <button className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark cursor-pointer">
              Sign in
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav
        aria-label="Main mobile"
        className="flex items-center gap-1 overflow-x-auto border-t border-border px-6 py-2 sm:hidden"
      >
        <Link
          href="/"
          className="rounded-md px-3 py-1.5 text-sm font-medium text-ink"
        >
          Home
        </Link>
        <CategoriesDropdown categories={categories} />
        <Link
          href="/products"
          className="rounded-md px-3 py-1.5 text-sm font-medium text-ink"
        >
          Products
        </Link>
      </nav>
    </header>
  );
}
