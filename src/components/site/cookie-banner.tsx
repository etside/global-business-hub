import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("tf_cookie_consent")) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  const set = (v: "all" | "essential") => {
    try { localStorage.setItem("tf_cookie_consent", v); } catch {}
    setShow(false);
  };
  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:right-6 md:max-w-md">
      <div className="rounded-2xl border bg-card p-4 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-brand/10 p-2 text-brand"><Cookie className="size-5" /></div>
          <div className="flex-1 text-sm">
            <p className="font-semibold">We value your privacy</p>
            <p className="mt-1 text-muted-foreground">We use cookies to enhance your experience, analyze traffic, and personalize content. Read our <a className="underline" href="#privacy">privacy policy</a>.</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => set("all")}>Accept all</Button>
              <Button size="sm" variant="outline" onClick={() => set("essential")}>Essential only</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}