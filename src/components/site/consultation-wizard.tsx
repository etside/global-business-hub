import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const schema = z.object({
  country: z.string().min(1),
  service: z.string().min(1),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(40),
  notes: z.string().trim().max(1000).optional(),
});

const COUNTRIES = ["USA", "UK", "Canada", "Bangladesh", "UAE", "Singapore", "Other"];
const SERVICES = ["Company Formation", "Annual Compliance", "Apostille & Attestation", "Notary & Translation", "AML / KYC Advisory", "Tax Filing"];

export function ConsultationWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ country: "", service: "", name: "", email: "", phone: "", notes: "" });
  const [done, setDone] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Please complete all fields"); return; }
    setDone(true);
    toast.success("Consultation booked! We'll contact you within 1 business hour.");
  };

  if (done) {
    return (
      <div className="rounded-3xl border bg-card p-10 text-center shadow-xl">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand/20 text-brand"><Check className="size-7" /></div>
        <h3 className="mt-4 text-2xl font-semibold">You're all set, {data.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-muted-foreground">A specialist will reach out to <b>{data.email}</b> within 1 business hour with a tailored plan for {data.country}.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand" : "bg-muted"}`} />
        ))}
      </div>
      <form onSubmit={submit} className="space-y-5">
        {step === 0 && (
          <>
            <div>
              <h3 className="text-xl font-semibold">Where do you want to incorporate?</h3>
              <p className="text-sm text-muted-foreground">Choose your target jurisdiction.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COUNTRIES.map((c) => (
                <button type="button" key={c} onClick={() => setData((d) => ({ ...d, country: c }))} className={`rounded-lg border px-4 py-3 text-sm transition ${data.country === c ? "border-brand bg-brand/10" : "hover:bg-muted"}`}>{c}</button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div>
              <h3 className="text-xl font-semibold">What service do you need?</h3>
              <p className="text-sm text-muted-foreground">Select one — we'll discuss the full scope on the call.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button type="button" key={s} onClick={() => setData((d) => ({ ...d, service: s }))} className={`rounded-lg border px-4 py-3 text-left text-sm transition ${data.service === s ? "border-brand bg-brand/10" : "hover:bg-muted"}`}>{s}</button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <h3 className="text-xl font-semibold">Your contact details</h3>
              <p className="text-sm text-muted-foreground">We'll never share your information.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Full name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} maxLength={100} />
              <Input type="email" placeholder="Work email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} maxLength={255} />
              <Input placeholder="Phone (with country code)" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} maxLength={40} />
              <Input placeholder="Company (optional)" value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} maxLength={200} />
            </div>
          </>
        )}
        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="ghost" onClick={back} disabled={step === 0}><ChevronLeft className="size-4" /> Back</Button>
          {step < 2 ? (
            <Button type="button" onClick={next} disabled={(step === 0 && !data.country) || (step === 1 && !data.service)} className="bg-brand text-brand-foreground hover:bg-brand/90">Continue <ChevronRight className="size-4" /></Button>
          ) : (
            <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">Book consultation</Button>
          )}
        </div>
        <p className="text-center text-[11px] text-muted-foreground">Protected by reCAPTCHA · By submitting you agree to our terms.</p>
      </form>
    </div>
  );
}