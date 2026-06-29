import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { jurisdictions } from "./data";
import { Sparkles } from "lucide-react";

export function CountryModal() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("tf_country_seen")) return;
      const t = setTimeout(() => setOpen(true), 4500);
      return () => clearTimeout(t);
    } catch {}
  }, []);
  const close = () => { try { sessionStorage.setItem("tf_country_seen", "1"); } catch {}; setOpen(false); };
  const sel = jurisdictions.find((j) => j.code === picked);
  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl"><Sparkles className="size-5 text-brand" /> Where are you expanding from?</DialogTitle>
          <DialogDescription>We'll personalize pricing and timelines for your region.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {jurisdictions.map((j) => (
            <button key={j.code} onClick={() => setPicked(j.code)} className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-sm transition ${picked === j.code ? "border-brand bg-brand/10" : "hover:bg-muted"}`}>
              <span className="text-2xl">{j.flag}</span>
              <span className="text-xs">{j.name}</span>
            </button>
          ))}
        </div>
        {sel && (
          <div className="rounded-xl bg-muted p-4 text-sm">
            <p className="font-semibold">{sel.name} — starting at {sel.cost}</p>
            <p className="text-muted-foreground">Typical setup: {sel.time} · Tax: {sel.tax}</p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={close}>Skip</Button>
          <Button onClick={close} className="bg-brand text-brand-foreground hover:bg-brand/90" disabled={!picked}>Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}