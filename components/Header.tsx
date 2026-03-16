"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MODULES = [
  { href: "/", label: "Recherche de Marque", id: "m1" },
  { href: "/claims", label: "Revendications Brevets", id: "m2" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Casalonga"
              width={44}
              height={44}
              className="group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold tracking-[0.15em] text-navy leading-none">
                CASALONGA
              </span>
              <span className="text-[10px] text-muted tracking-[0.08em] leading-none mt-0.5">
                DEPUIS 1867
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
            <span className="text-[11px] font-medium text-muted/60 tracking-wide uppercase whitespace-nowrap mr-4">
              IP Intelligence Platform
            </span>
            <div className="h-4 w-px bg-border/50 mr-3" />
            {MODULES.map((mod) => {
              const isActive =
                mod.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(mod.href);
              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  className={cn(
                    "text-[11px] font-medium tracking-wide whitespace-nowrap px-3 py-1.5 rounded-lg transition-all",
                    isActive
                      ? "text-accent bg-accent/5"
                      : "text-muted/50 hover:text-navy hover:bg-navy/5"
                  )}
                >
                  {mod.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
