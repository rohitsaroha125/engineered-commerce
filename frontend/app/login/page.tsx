"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI only — wire up submit logic later
    try {
      const response = await fetch("http://localhost:8010/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!data.ok) {
        console.log(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/products");
    } catch (err) {
      console.log("Error is ", err);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-card border border-border bg-surface p-8 shadow-card">
        <h1 className="font-display text-2xl font-medium text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back. Enter your details to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-medium text-accent hover:text-accent-dark"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.04 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.18c-.27 1.4-1.07 2.6-2.28 3.4v2.83h3.68c2.15-1.98 3.46-4.9 3.46-8.47z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.68-2.83c-1.02.68-2.27 1.08-3.6 1.08-2.77 0-5.12-1.87-5.96-4.39H2.6v2.92C4.4 20.5 7.94 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M6.04 14.2c-.2-.6-.32-1.24-.32-1.9s.12-1.3.32-1.9V7.48H2.6A10.96 10.96 0 0 0 1.5 12.3c0 1.77.42 3.44 1.1 4.92l3.44-2.92z"
            />
            <path
              fill="#EA4335"
              d="M12 5.71c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.36 14.97 1.3 12 1.3 7.94 1.3 4.4 3.8 2.6 7.48l3.44 2.92c.84-2.52 3.19-4.39 5.96-4.69z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-accent hover:text-accent-dark"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
