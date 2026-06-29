import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Admin sign-in — Trust Formation" }, { name: "robots", content: "noindex,nofollow" }] }),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session && isAdmin) navigate({ to: "/admin" });
  }, [loading, session, isAdmin, navigate]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    toast.success("Magic link sent. Check your inbox.");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">
        <div className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Admin sign-in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your email to receive a secure magic link.</p>
        {sent ? (
          <div className="mt-6 rounded-xl border bg-muted/40 p-4 text-sm">
            <p className="font-medium">Check your email</p>
            <p className="mt-1 text-muted-foreground">We sent a sign-in link to <b>{email}</b>. The link is valid for 60 minutes.</p>
          </div>
        ) : (
          <form onSubmit={send} className="mt-6 space-y-3">
            <Input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" disabled={sending} className="w-full bg-brand text-brand-foreground hover:bg-brand/90">
              {sending ? "Sending…" : "Send magic link"}
            </Button>
          </form>
        )}
        <p className="mt-6 text-xs text-muted-foreground">Only authorized admin accounts can access the admin panel.</p>
      </div>
    </div>
  );
}