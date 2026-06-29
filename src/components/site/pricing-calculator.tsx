import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Calculator } from "lucide-react";

const J = [
  { id: "us", name: "USA (Delaware LLC)", base: 499 },
  { id: "uk", name: "UK (Ltd)", base: 299 },
  { id: "ca", name: "Canada (Federal)", base: 449 },
  { id: "bd", name: "Bangladesh (Pvt Ltd)", base: 599 },
  { id: "ae", name: "UAE (Free Zone)", base: 1499 },
  { id: "sg", name: "Singapore (Pte Ltd)", base: 799 },
];
const E = [
  { id: "llc", name: "LLC / Pvt Ltd", mult: 1 },
  { id: "corp", name: "Corporation / Inc", mult: 1.15 },
  { id: "branch", name: "Branch Office", mult: 1.4 },
];
const A: { id: string; name: string; price: number }[] = [
  { id: "ra", name: "Registered Agent (1 year)", price: 99 },
  { id: "ein", name: "EIN / Tax ID", price: 149 },
  { id: "bank", name: "Bank Account Intro", price: 199 },
  { id: "apostille", name: "Apostille Set", price: 149 },
  { id: "translation", name: "Certified Translation", price: 89 },
  { id: "compliance", name: "Annual Compliance Pack", price: 299 },
];

export function PricingCalculator() {
  const [j, setJ] = useState(J[0].id);
  const [e, setE] = useState(E[0].id);
  const [picked, setPicked] = useState<string[]>(["ra", "ein"]);

  const total = useMemo(() => {
    const jur = J.find((x) => x.id === j)!;
    const ent = E.find((x) => x.id === e)!;
    const addons = picked.reduce((s, id) => s + (A.find((a) => a.id === id)?.price ?? 0), 0);
    return Math.round(jur.base * ent.mult + addons);
  }, [j, e, picked]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="grid gap-6 rounded-3xl border bg-card p-6 shadow-xl md:grid-cols-[1fr_320px] md:p-8">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Jurisdiction</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {J.map((x) => (
              <button key={x.id} onClick={() => setJ(x.id)} className={`rounded-lg border px-3 py-2 text-left text-sm transition ${j === x.id ? "border-brand bg-brand/10 text-foreground" : "hover:bg-muted"}`}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity type</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {E.map((x) => (
              <button key={x.id} onClick={() => setE(x.id)} className={`rounded-lg border px-3 py-2 text-sm transition ${e === x.id ? "border-brand bg-brand/10" : "hover:bg-muted"}`}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add-ons</label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {A.map((x) => {
              const on = picked.includes(x.id);
              return (
                <button key={x.id} onClick={() => toggle(x.id)} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition ${on ? "border-brand bg-brand/10" : "hover:bg-muted"}`}>
                  <span className="flex items-center gap-2">
                    <span className={`grid size-4 place-items-center rounded border ${on ? "border-brand bg-brand text-brand-foreground" : "border-muted-foreground/40"}`}>
                      {on && <Check className="size-3" />}
                    </span>
                    {x.name}
                  </span>
                  <span className="text-muted-foreground">+${x.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70"><Calculator className="size-4" /> Estimated total</div>
        <div className="mt-2 font-display text-5xl font-bold">${total.toLocaleString()}</div>
        <p className="mt-1 text-sm opacity-70">One-time setup · gov fees included</p>
        <div className="my-5 h-px bg-white/10" />
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><Check className="size-4 text-brand" /> Transparent pricing</li>
          <li className="flex items-center gap-2"><Check className="size-4 text-brand" /> 100% remote process</li>
          <li className="flex items-center gap-2"><Check className="size-4 text-brand" /> Money-back guarantee</li>
        </ul>
        <Button asChild className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90">
          <a href="#consult">Get this quote</a>
        </Button>
      </div>
    </div>
  );
}