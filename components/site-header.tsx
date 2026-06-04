"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, type NavLeaf } from "@/lib/content/site";
import { cn } from "@/lib/utils";

function PanelLink({ item }: { item: NavLeaf }) {
  const Icon = item.icon;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href}
        className="group/item flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted"
      >
        {Icon ? (
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
            <Icon aria-hidden className="size-4" />
          </span>
        ) : null}
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-foreground">
            {item.label}
          </span>
          {item.description ? (
            <span className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </span>
          ) : null}
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="WEVLRA — kembali ke beranda"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-1 rounded-xl bg-primary/30 opacity-0 blur-md transition-opacity group-hover:opacity-100"
            />
            <Image
              src="/icon-dark-transparent.png"
              alt=""
              width={32}
              height={32}
              className="relative rounded-lg dark:hidden"
              priority
            />
            <Image
              src="/icon-light-transparent.png"
              alt=""
              width={32}
              height={32}
              className="relative hidden rounded-lg dark:block"
              priority
            />
          </div>
          <span className="text-base font-bold tracking-tight">WEVLRA</span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-0.5">
            {nav.map((item) => {
              if (item.kind === "link") {
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              const colsClass = item.featured
                ? "grid-cols-[1.1fr_1fr_1fr]"
                : "grid-cols-2";
              const widthClass = item.featured ? "w-[760px]" : "w-[560px]";

              return (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground data-popup-open:text-foreground data-open:text-foreground">
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div
                      className={cn(
                        "grid gap-6 p-4",
                        colsClass,
                        widthClass
                      )}
                    >
                      {item.featured ? (
                        <Link
                          href={item.featured.href}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/15 via-chart-3/10 to-background p-5 transition-colors hover:border-primary/40"
                        >
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/20 blur-3xl"
                          />
                          <div className="relative">
                            <h4 className="text-base font-semibold text-foreground">
                              {item.featured.title}
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                              {item.featured.description}
                            </p>
                          </div>
                          <span className="relative mt-6 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                            {item.featured.cta}
                            <ArrowRight
                              aria-hidden
                              className="size-3 transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      ) : null}

                      {item.groups.map((group) => (
                        <div key={group.title} className="flex flex-col gap-1">
                          <h5 className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {group.title}
                          </h5>
                          {group.items.map((leaf) => (
                            <PanelLink key={leaf.label} item={leaf} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right cluster (desktop) */}
        <div className="hidden items-center gap-1.5 md:flex">
          <ThemeToggle />
          <div className="mx-1 h-5 w-px bg-border/60" aria-hidden="true" />
          <Button size="sm" className="h-9 shadow-sm" asChild>
            <Link href="/ai-web-builder">Mulai Gratis</Link>
          </Button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                aria-label="Buka menu navigasi"
              >
                <Menu aria-hidden className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2.5 border-b px-6 py-5">
                  <Image
                    src="/icon-dark-transparent.png"
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-md dark:hidden"
                  />
                  <Image
                    src="/icon-light-transparent.png"
                    alt=""
                    width={28}
                    height={28}
                    className="hidden rounded-md dark:block"
                  />
                  <span className="text-base font-bold">WEVLRA</span>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                  <ul className="flex flex-col gap-1">
                    {nav.map((item) => {
                      if (item.kind === "link") {
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      }
                      return (
                        <li key={item.label}>
                          <details className="group rounded-lg">
                            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent">
                              {item.label}
                              <ChevronDown
                                aria-hidden
                                className="size-4 transition-transform group-open:rotate-180"
                              />
                            </summary>
                            <div className="mt-1 ml-1 flex flex-col gap-3 border-l border-border/60 pb-2 pl-3">
                              {item.groups.map((group) => (
                                <div key={group.title} className="flex flex-col gap-0.5">
                                  <span className="px-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {group.title}
                                  </span>
                                  {group.items.map((leaf) => {
                                    const LeafIcon = leaf.icon;
                                    return (
                                      <Link
                                        key={leaf.label}
                                        href={leaf.href}
                                        className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                      >
                                        {LeafIcon ? (
                                          <LeafIcon
                                            aria-hidden
                                            className="size-4"
                                          />
                                        ) : null}
                                        {leaf.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="flex flex-col gap-2 border-t px-4 py-5">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/ai-web-builder">Mulai Gratis</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
