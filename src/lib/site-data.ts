import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ServiceRow = {
  id: string;
  slug: string;
  flag: string;
  title: string;
  category: string;
  icon_name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

export type Branding = { site_name: string; tagline: string; logo_url: string; primary_color: string };
export type Contact = { email: string; phone: string; address: string; whatsapp: string };
export type MapCfg = { embed_url: string; lat: string; lng: string };
export type Socials = { facebook: string; twitter: string; linkedin: string; instagram: string };
export type Analytics = { gtm_id: string; fb_pixel_id: string; ga4_id: string };
export type Seo = { meta_title: string; meta_description: string };

export type HeroBlock = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  stats: { label: string; value: string }[];
};
export type AboutBlock = { name: string; role: string; photo_url: string; bio: string };
export type WhyUsBlock = { items: { title: string; desc: string }[] };
export type ProcessBlock = { steps: { title: string; desc: string }[] };
export type FaqBlock = { items: { q: string; a: string }[] };
export type TestimonialsBlock = { items: { name: string; role: string; flag: string; quote: string; rating: number }[] };
export type JurisdictionsBlock = { items: { code: string; name: string; flag: string; time: string; compliance: string; popular: boolean }[] };
export type CtaBlock = { title: string; subtitle: string; button: string };

export type SiteData = {
  settings: {
    branding: Branding;
    contact: Contact;
    map: MapCfg;
    socials: Socials;
    analytics: Analytics;
    seo: Seo;
  };
  content: {
    hero: HeroBlock;
    about: AboutBlock;
    why_us: WhyUsBlock;
    process: ProcessBlock;
    faq: FaqBlock;
    testimonials: TestimonialsBlock;
    jurisdictions: JurisdictionsBlock;
    cta_banner: CtaBlock;
  };
  services: ServiceRow[];
};

async function fetchSiteData(): Promise<SiteData> {
  const [s, c, sv] = await Promise.all([
    supabase.from("site_settings").select("key,value"),
    supabase.from("content_blocks").select("key,data"),
    supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
  ]);
  const settings: Record<string, unknown> = {};
  (s.data ?? []).forEach((r) => (settings[r.key] = r.value));
  const content: Record<string, unknown> = {};
  (c.data ?? []).forEach((r) => (content[r.key] = r.data));
  return {
    settings: settings as SiteData["settings"],
    content: content as SiteData["content"],
    services: (sv.data ?? []) as ServiceRow[],
  };
}

export function useSiteData() {
  return useQuery({ queryKey: ["site-data"], queryFn: fetchSiteData, staleTime: 60_000 });
}