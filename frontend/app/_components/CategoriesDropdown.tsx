"use client";

import { useEffect, useRef, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoriesDropdown({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-ink transition-colors hover:text-accent cursor-pointer"
      >
        Categories
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-2 w-56 origin-top-left rounded-card border border-border bg-white p-1.5 shadow-cardHover"
        >
          {categories.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted">No categories yet</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/products?categoryId=${category.id}`}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-ink transition-colors hover:bg-bg hover:text-accent"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
