"use client";

import { useRef, useState } from "react";
import { makeStore, AppStore } from "@/lib/store";
import { updateProducts } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  image?: string | null;
  description?: string;
}

const PLACEHOLDER_IMAGE = "/assets/placeholder.jpg";

export default function ProductDetail({ product }: { product: Product }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8010";

  const storeRef = useRef<AppStore | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(
    `http://localhost:8010/${product.image}` || PLACEHOLDER_IMAGE
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(99, q + 1));
  }

  function handleQuantityInput(value: string) {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    setQuantity(Math.min(99, Math.max(1, parsed)));
  }

  function handleAddToCart() {
    // UI-only for now — no cart state/API wired up yet.
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    const productToAdd = {
      ...product,
      qty: quantity,
    };
    dispatch(updateProducts(productToAdd));
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Optimistic local preview while the upload is in flight.
    const localPreviewUrl = URL.createObjectURL(file);
    setImageUrl(localPreviewUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `http://localhost:8010/products/upload-image/${product.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      // Swap to the real hosted URL once the backend confirms it.
      if (data.image) {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.log("Erroris", err);
      setUploadError("Couldn't upload image. Try again.");
      setImageUrl(product.imageUrl || PLACEHOLDER_IMAGE);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreviewUrl);
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Image column */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
                  <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-ink">
                    Uploading…
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload image"}
              </button>
              {uploadError && (
                <p className="mt-1.5 text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          </div>

          {/* Details column */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Product
            </p>
            <h1 className="mt-1 font-display text-3xl font-medium text-ink">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-ink">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {product.description && (
              <p className="mt-4 text-muted">{product.description}</p>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium text-ink">
                Quantity
              </label>
              <div className="inline-flex items-center rounded-md border border-border bg-surface">
                <button
                  type="button"
                  onClick={decrement}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-lg text-ink transition-colors hover:text-accent disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => handleQuantityInput(e.target.value)}
                  className="h-10 w-12 border-x border-border bg-transparent text-center text-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min={1}
                  max={99}
                />
                <button
                  type="button"
                  onClick={increment}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-lg text-ink transition-colors hover:text-accent disabled:opacity-40"
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark sm:w-auto sm:px-8"
            >
              {addedToCart ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
