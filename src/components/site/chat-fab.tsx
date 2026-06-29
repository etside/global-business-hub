import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function isOnline() {
  const h = new Date().getUTCHours();
  return h >= 3 && h <= 18;
}

export function ChatFab() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [online, setOnline] = useState(true);
  useEffect(() => { setOnline(isOnline()); }, []);
  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-2xl transition hover:scale-110 glow-brand"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        {!open && (
          <span className={`absolute right-1 top-1 size-3 rounded-full ring-2 ring-background ${online ? "bg-emerald-500" : "bg-amber-500"}`} />
        )}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm overflow-hidden rounded-2xl border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
            <div className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground font-bold">T</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Trust Formation Support</p>
              <p className="flex items-center gap-1.5 text-xs opacity-80">
                <span className={`size-2 rounded-full ${online ? "bg-emerald-400" : "bg-amber-400"}`} />
                {online ? "Online · Replies in minutes" : "Offline · We'll reply within 24h"}
              </p>
            </div>
          </div>
          <div className="space-y-2 p-4 text-sm">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
              Hi 👋 How can we help with your global expansion today?
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (!msg.trim()) return; toast.success("Message sent! Our team will reply shortly."); setMsg(""); }}
            className="flex items-center gap-2 border-t p-3"
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
            />
            <Button type="submit" size="icon" className="rounded-full"><Send className="size-4" /></Button>
          </form>
        </div>
      )}
    </>
  );
}