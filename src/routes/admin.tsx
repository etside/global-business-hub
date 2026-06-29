import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { useSiteData, type SiteData, type ServiceRow } from "@/lib/site-data";
import { LogOut, Save, Trash2, Plus, Upload, Loader2, Image as ImageIcon, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Trust Formation" }, { name: "robots", content: "noindex,nofollow" }] }),
});

function AdminPage() {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="size-6 animate-spin text-brand" /></div>;
  }
  if (isAdmin === null) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="size-6 animate-spin text-brand" /></div>;
  }
  if (!isAdmin) return <NotAdmin email={session.user.email ?? ""} userId={session.user.id} />;
  return <AdminDashboard />;
}

function NotAdmin({ email, userId }: { email: string; userId: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-xl">
        <h1 className="font-display text-xl font-bold">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account <b>{email}</b> isn't an admin. Run this SQL once in Cloud to grant access:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-3 text-left text-xs">
{`insert into public.user_roles (user_id, role)
values ('${userId}', 'admin');`}
        </pre>
        <Button onClick={() => supabase.auth.signOut()} variant="outline" className="mt-4">
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { data, isLoading } = useSiteData();
  const qc = useQueryClient();
  const refresh = () => qc.invalidateQueries({ queryKey: ["site-data"] });

  if (isLoading || !data) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="size-6 animate-spin text-brand" /></div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold">Trust<span className="text-brand">Formation</span></span>
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline"><Link to="/"><ExternalLink className="size-4" /> View site</Link></Button>
            <Button size="sm" variant="ghost" onClick={() => supabase.auth.signOut()}><LogOut className="size-4" /> Sign out</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="font-display text-3xl font-bold">Site management</h1>
        <p className="text-sm text-muted-foreground">Edit everything visible on the public site. Changes save instantly.</p>
        <Tabs defaultValue="branding" className="mt-6">
          <TabsList className="flex h-auto flex-wrap gap-1 bg-muted p-1">
            {[
              ["branding","Branding & Logo"],
              ["contact","Contact"],
              ["map","Map"],
              ["analytics","Analytics & Pixel"],
              ["seo","SEO"],
              ["socials","Social Links"],
              ["services","Services"],
              ["hero","Hero"],
              ["about","Founder / About"],
              ["why_us","Why Us"],
              ["process","Process"],
              ["faq","FAQ"],
              ["testimonials","Testimonials"],
              ["jurisdictions","Jurisdictions"],
              ["cta_banner","CTA Banner"],
              ["assets","Assets / Uploads"],
            ].map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}
          </TabsList>

          <TabsContent value="branding"><SettingEditor section="branding" label="Branding" data={data} onSaved={refresh} fields={[
            { key: "site_name", label: "Site name" },
            { key: "tagline", label: "Tagline" },
            { key: "logo_url", label: "Logo URL (upload from Assets tab)" },
            { key: "primary_color", label: "Primary color (hex)" },
          ]} /></TabsContent>
          <TabsContent value="contact"><SettingEditor section="contact" label="Contact" data={data} onSaved={refresh} fields={[
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "whatsapp", label: "WhatsApp" },
            { key: "address", label: "Address", textarea: true },
          ]} /></TabsContent>
          <TabsContent value="map"><SettingEditor section="map" label="Map" data={data} onSaved={refresh} fields={[
            { key: "embed_url", label: "Map embed URL (Google Maps iframe src or OpenStreetMap)", textarea: true },
            { key: "lat", label: "Latitude" },
            { key: "lng", label: "Longitude" },
          ]} /></TabsContent>
          <TabsContent value="analytics"><SettingEditor section="analytics" label="Analytics" data={data} onSaved={refresh} fields={[
            { key: "gtm_id", label: "Google Tag Manager ID (GTM-XXXXXXX)" },
            { key: "fb_pixel_id", label: "Facebook Pixel ID (numeric)" },
            { key: "ga4_id", label: "GA4 Measurement ID (G-XXXXXXX) — optional" },
          ]} /></TabsContent>
          <TabsContent value="seo"><SettingEditor section="seo" label="SEO" data={data} onSaved={refresh} fields={[
            { key: "meta_title", label: "Meta title" },
            { key: "meta_description", label: "Meta description", textarea: true },
          ]} /></TabsContent>
          <TabsContent value="socials"><SettingEditor section="socials" label="Socials" data={data} onSaved={refresh} fields={[
            { key: "facebook", label: "Facebook URL" },
            { key: "twitter", label: "Twitter / X URL" },
            { key: "linkedin", label: "LinkedIn URL" },
            { key: "instagram", label: "Instagram URL" },
          ]} /></TabsContent>

          <TabsContent value="services"><ServicesEditor services={data.services} onSaved={refresh} /></TabsContent>

          <TabsContent value="hero"><JsonContentEditor sectionKey="hero" label="Hero" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="about"><JsonContentEditor sectionKey="about" label="About / Founder" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="why_us"><JsonContentEditor sectionKey="why_us" label="Why Us" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="process"><JsonContentEditor sectionKey="process" label="Process Steps" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="faq"><JsonContentEditor sectionKey="faq" label="FAQ" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="testimonials"><JsonContentEditor sectionKey="testimonials" label="Testimonials" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="jurisdictions"><JsonContentEditor sectionKey="jurisdictions" label="Jurisdictions" data={data} onSaved={refresh} /></TabsContent>
          <TabsContent value="cta_banner"><JsonContentEditor sectionKey="cta_banner" label="CTA Banner" data={data} onSaved={refresh} /></TabsContent>

          <TabsContent value="assets"><AssetsManager /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------- key/value setting editor ---------- */
function SettingEditor({
  section, label, data, fields, onSaved,
}: {
  section: keyof SiteData["settings"];
  label: string;
  data: SiteData;
  fields: { key: string; label: string; textarea?: boolean }[];
  onSaved: () => void;
}) {
  const initial = (data.settings[section] ?? {}) as Record<string, string>;
  const [v, setV] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  useEffect(() => setV(initial as Record<string, string>), [section]); // eslint-disable-line

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").upsert({ key: section as string, value: v });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(`${label} saved`);
    onSaved();
  };

  return (
    <Card title={label}>
      <div className="grid gap-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</label>
            {f.textarea ? (
              <Textarea className="mt-1.5" value={v[f.key] ?? ""} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} rows={3} />
            ) : (
              <Input className="mt-1.5" value={v[f.key] ?? ""} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
        <div>
          <Button onClick={save} disabled={saving} className="bg-brand text-brand-foreground hover:bg-brand/90">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* ---------- generic JSON content editor ---------- */
function JsonContentEditor({ sectionKey, label, data, onSaved }: {
  sectionKey: keyof SiteData["content"]; label: string; data: SiteData; onSaved: () => void;
}) {
  const initial = JSON.stringify(data.content[sectionKey] ?? {}, null, 2);
  const [txt, setTxt] = useState(initial);
  const [saving, setSaving] = useState(false);
  useEffect(() => setTxt(JSON.stringify(data.content[sectionKey] ?? {}, null, 2)), [sectionKey]); // eslint-disable-line

  const save = async () => {
    let parsed: unknown;
    try { parsed = JSON.parse(txt); } catch (e) { return toast.error("Invalid JSON: " + (e as Error).message); }
    setSaving(true);
    const { error } = await supabase.from("content_blocks").upsert({ key: sectionKey as string, data: parsed as never });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(`${label} saved`);
    onSaved();
  };

  return (
    <Card title={`${label} — JSON content`}>
      <p className="mb-3 text-xs text-muted-foreground">
        Edit the structured content directly. Make sure the JSON is valid before saving.
      </p>
      <Textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={22} className="font-mono text-xs" />
      <div className="mt-4">
        <Button onClick={save} disabled={saving} className="bg-brand text-brand-foreground hover:bg-brand/90">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
        </Button>
      </div>
    </Card>
  );
}

/* ---------- services CRUD ---------- */
function ServicesEditor({ services, onSaved }: { services: ServiceRow[]; onSaved: () => void }) {
  const [rows, setRows] = useState(services);
  useEffect(() => setRows(services), [services]);

  const upd = (i: number, patch: Partial<ServiceRow>) => setRows(rows.map((r, idx) => idx === i ? { ...r, ...patch } : r));

  const saveRow = async (r: ServiceRow) => {
    const { error } = await supabase.from("services").upsert({
      id: r.id, slug: r.slug, flag: r.flag, title: r.title, category: r.category,
      icon_name: r.icon_name, description: r.description, sort_order: r.sort_order, is_active: r.is_active,
    });
    if (error) return toast.error(error.message);
    toast.success("Service saved");
    onSaved();
  };

  const delRow = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    onSaved();
  };

  const addRow = async () => {
    const { error } = await supabase.from("services").insert({
      slug: `new-${Date.now()}`, title: "New Service", flag: "🌐",
      category: "Formation", icon_name: "Globe2", description: "", sort_order: rows.length + 1,
    });
    if (error) return toast.error(error.message);
    onSaved();
  };

  return (
    <Card title="Services">
      <Button onClick={addRow} size="sm" className="mb-4 bg-brand text-brand-foreground hover:bg-brand/90">
        <Plus className="size-4" /> Add service
      </Button>
      <div className="space-y-4">
        {rows.map((r, i) => (
          <div key={r.id} className="rounded-xl border bg-background p-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Field label="Flag emoji"><Input value={r.flag} onChange={(e) => upd(i, { flag: e.target.value })} /></Field>
              <Field label="Title"><Input value={r.title} onChange={(e) => upd(i, { title: e.target.value })} /></Field>
              <Field label="Slug"><Input value={r.slug} onChange={(e) => upd(i, { slug: e.target.value })} /></Field>
              <Field label="Category"><Input value={r.category} onChange={(e) => upd(i, { category: e.target.value })} /></Field>
              <Field label="Icon (lucide name)"><Input value={r.icon_name} onChange={(e) => upd(i, { icon_name: e.target.value })} /></Field>
              <Field label="Sort order"><Input type="number" value={r.sort_order} onChange={(e) => upd(i, { sort_order: Number(e.target.value) })} /></Field>
              <Field label="Active">
                <select className="h-9 w-full rounded-md border bg-transparent px-2 text-sm" value={String(r.is_active)} onChange={(e) => upd(i, { is_active: e.target.value === "true" })}>
                  <option value="true">Yes</option><option value="false">No</option>
                </select>
              </Field>
              <Field label="Description" className="md:col-span-2 lg:col-span-4">
                <Textarea rows={2} value={r.description} onChange={(e) => upd(i, { description: e.target.value })} />
              </Field>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => saveRow(r)} className="bg-brand text-brand-foreground hover:bg-brand/90"><Save className="size-4" /> Save</Button>
              <Button size="sm" variant="outline" onClick={() => delRow(r.id)}><Trash2 className="size-4" /> Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- assets / uploads ---------- */
function AssetsManager() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const list = async () => {
    const { data, error } = await supabase.storage.from("site-assets").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) return toast.error(error.message);
    const out = (data ?? []).filter((f) => f.name).map((f) => {
      const { data: u } = supabase.storage.from("site-assets").getPublicUrl(f.name);
      return { name: f.name, url: u.publicUrl };
    });
    setFiles(out);
  };
  useEffect(() => { list(); }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const safe = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("site-assets").upload(safe, file, { upsert: false, contentType: file.type });
    setUploading(false);
    if (error) return toast.error(error.message);
    toast.success("Uploaded");
    list();
  };

  const remove = async (name: string) => {
    if (!confirm("Delete this file?")) return;
    const { error } = await supabase.storage.from("site-assets").remove([name]);
    if (error) return toast.error(error.message);
    list();
  };

  return (
    <Card title="Assets / Image uploads">
      <p className="mb-4 text-xs text-muted-foreground">Upload images and copy the public URL into branding, founder photo, or content blocks.</p>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90">
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload file
        <input type="file" className="hidden" onChange={onUpload} accept="image/*" />
      </label>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-xl border bg-background">
            <div className="grid aspect-video place-items-center bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <div className="truncate text-xs font-medium">{f.name}</div>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(f.url); toast.success("URL copied"); }}>
                  <ImageIcon className="size-4" /> Copy URL
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(f.name)}><Trash2 className="size-4" /></Button>
              </div>
            </div>
          </div>
        ))}
        {files.length === 0 && <p className="text-sm text-muted-foreground">No uploads yet.</p>}
      </div>
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}