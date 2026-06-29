import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#jurisdictions", label: "Jurisdictions" },
  { href: "#how", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "border-b bg-background/80 backdrop-blur-lg" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Trust Formation logo" width={36} height={36} className="size-9" />
          <span className="font-display text-lg font-bold tracking-tight">Trust<span className="text-brand">Formation</span></span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="grid size-9 place-items-center rounded-md hover:bg-muted">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
            <a href="tel:+13025550142"><PhoneCall className="size-4" /> Call</a>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex bg-brand text-brand-foreground hover:bg-brand/90">
            <a href="#consult">Book Consultation</a>
          </Button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="grid size-9 place-items-center rounded-md hover:bg-muted lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background/95 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                {n.label}
              </a>
            ))}
            <a href="#consult" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-brand px-3 py-2 text-center text-sm font-semibold text-brand-foreground">
              Book Free Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}