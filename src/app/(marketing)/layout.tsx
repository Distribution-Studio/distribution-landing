import React from "react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full py-2 bg-stone-100">
        <div className="flex h-16 items-center justify-between max-w-5xl mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-normal flex items-center gap-4">
              <span className="text-sm md:text-md lg:text-xl font-semibold text-[#1B322E]">Distribution Studio</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://arjunaditya.xyz/"
              target="_blank"
              className="flex hidden md:block bg-stone-800 text-neutral-50 px-4 py-2.5 font-medium items-center"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto ">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex justify-center">
            <div className="max-w-md">
              <h3 className="font-semibold text-lg mb-1.5 mt-4">
                Distribution.Studio
              </h3>
              <p className="text-muted-foreground text-sm">
                Distribution.Studio sells functional waitlists to non technical people who mostly use vibe-coded waitlists with no security.
                <br />
                <br />
                © {new Date().getFullYear()} Distribution.Studio. All rights reserved.

              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const KiteLogo = () => {
  return (
    <div className="group relative overflow-visible">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90 60"
        width="32"
        height="24"
        style={{ overflow: "visible" }}
      >
        <defs>
          <style>
            {`
              .cls-1 {
                fill: #f6461a;
                transition: transform 0.3s ease-in-out, fill 0.3s ease;
              }
              .cls-2 {
                fill: #db342c;
                transition: transform 0.3s ease-in-out, fill 0.3s ease;
              }
              svg:hover .cls-1 {
                fill: #ff5733;
                z-index: 5;
                transform: translateX(-25px);
              }
              svg:hover .cls-2 {
                fill: #ff2a1f;
                z-index: 1;
                transform: translateX(-13px);
              }
            `}
          </style>
        </defs>
        <title>Kite logo trimmed</title>
        <polygon className="cls-1" points="30 0 0 30 30 60 60 30 90 0 30 0" />
        <polygon className="cls-2" points="30 60 60 30 90 60 30 60" />
      </svg>
    </div>
  );
};
