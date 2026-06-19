interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export default async function Products() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8010";

  const [categoryResponse, productResponse] = await Promise.all([
    fetch(`${API_URL}category/`),
    fetch(`${API_URL}products?page=4&size=20`),
  ]);

  // Fixed: .ok belongs to the Response object, not the parsed JSON body.
  // The original check on categoryData.ok / productData.ok would only
  // work if your API wraps every payload in { ok: true, ... }.
  if (!categoryResponse.ok || !productResponse.ok) {
    return <ErrorState />;
  }

  const [categoryData, productData] = await Promise.all([
    categoryResponse.json(),
    productResponse.json(),
  ]);

  const categories: Category[] = categoryData.categories ?? [];
  const products: Product[] = productData.products ?? [];

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        {/* Header */}
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Catalog
          </p>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink">
            Products
          </h1>
          <p className="mt-2 text-muted">
            {products.length} item{products.length === 1 ? "" : "s"} across{" "}
            {categories.length} categor{categories.length === 1 ? "y" : "ies"}
          </p>
        </header>

        {/* Category filter rail */}
        {categories.length > 0 && (
          <nav
            aria-label="Categories"
            className="mb-10 -mx-1 overflow-x-auto pb-1"
          >
            <ul className="flex gap-2 px-1">
              <li>
                <button className="whitespace-nowrap rounded-full border border-accent bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark">
                  All
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button className="whitespace-nowrap rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Product grid */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const category = categories.find(
                (c) => c.id === product.categoryId
              );
              return (
                <li
                  key={product.id}
                  className="group relative overflow-hidden rounded-card border border-border bg-surface p-5 shadow-card transition-shadow hover:shadow-cardHover"
                >
                  {/* price sticker — signature element */}
                  <div className="absolute -right-1 top-4 rotate-3 rounded-sm bg-accent-light px-2.5 py-1 text-sm font-semibold text-accent-dark shadow-sm">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>

                  {category && (
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {category.name}
                    </p>
                  )}
                  <h2 className="mt-1 max-w-[80%] font-display text-lg font-medium leading-snug text-ink">
                    {product.name}
                  </h2>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <p className="font-display text-lg text-ink">No products yet</p>
      <p className="mt-1 text-sm text-muted">
        Add products from the admin panel to see them listed here.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="max-w-sm text-center">
        <p className="font-display text-lg text-ink">
          Couldn&apos;t load the catalog
        </p>
        <p className="mt-1 text-sm text-muted">
          The product or category service didn&apos;t respond. Try refreshing
          the page.
        </p>
      </div>
    </main>
  );
}
