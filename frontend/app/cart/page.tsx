"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store"; // adjust to your actual store types path
import { updateProducts, removeItem } from "@/lib/features/cartSlice"; // adjust to your actual slice path

interface CartProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function CartPage() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.cart.products
  ) as CartProduct[];
  const total = useSelector((state: RootState) => state.cart.total) as number;

  function handleDecrement(item: CartProduct) {
    if (item.qty <= 1) return;
    dispatch(updateProducts({ ...item, id: item.id, qty: item.qty - 1 }));
  }

  function handleIncrement(item: CartProduct) {
    dispatch(updateProducts({ ...item, id: item.id, qty: item.qty + 1 }));
  }

  function handleRemove(id: number) {
    dispatch(removeItem(id));
  }

  function handlePayNow() {
    // Hook up checkout/payment flow here.
  }

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-medium text-ink">
          Your cart
        </h1>
        <p className="mt-1 text-muted">
          {products.length} item{products.length === 1 ? "" : "s"}
        </p>

        {products.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="font-display text-lg text-ink">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted">
              Browse products and add something you like.
            </p>
            <a
              href="/products"
              className="mt-4 inline-block rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Browse products
            </a>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
              {products.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-base font-medium text-ink">
                      {item.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">
                      ₹{item.price.toLocaleString("en-IN")} each
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Quantity stepper */}
                    <div className="inline-flex items-center rounded-md border border-border bg-bg">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        disabled={item.qty <= 1}
                        className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-accent disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-accent"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="w-20 text-right text-sm font-semibold text-ink">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-muted transition-colors hover:text-red-600"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 7H20M9 7V4.5C9 4.22 9.22 4 9.5 4H14.5C14.78 4 15 4.22 15 4.5V7M18 7L17.3 19.3C17.27 19.85 16.8 20.3 16.25 20.3H7.75C7.2 20.3 6.73 19.85 6.7 19.3L6 7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-6 rounded-card border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-ink">Total</span>
                <span className="font-display text-2xl font-medium text-ink">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePayNow}
                className="mt-5 w-full rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Pay now
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
