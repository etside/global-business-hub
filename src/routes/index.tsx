import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, Globe, Shield, Clock, Award, Users,
  Mail, MapPin, Phone, Download, PlayCircle, Zap, FileCheck2, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/site/header";
import { Counter } from "@/components/site/counter";
import { ConsultationWizard } from "@/components/site/consultation-wizard";
import { CountryModal } from "@/components/site/country-modal";
import { services, jurisdictions, testimonials, faqs, companyInfo } from "@/components/site/data";
import founder from "@/assets/founder.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Trust Formation — Global Company Formation & Compliance" },
      { name: "description", content: "Register your company in the USA, UK, Canada, Bangladesh, UAE or Singapore. Fast, fully remote LLC/Ltd setup with EIN, registered agent, compliance & apostille — from $299." },
      { property: "og:title", content: "Trust Formation — Global Company Formation Made Simple" },
      { property: "og:description", content: "Comprehensive business formation & compliance across multiple jurisdictions. From $299, 100% remote." },
      { property: "og:image", content: "/logo.png" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Trust Formation" },
      { name: "twitter:description", content: "Global company formation, compliance & documentation." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Trust Formation",
          image: "/logo.png",
          priceRange: "$$",
          telephone: companyInfo.phone,
          email: companyInfo.email,
          address: { "@type": "PostalAddress", streetAddress: companyInfo.locationFull.streetAddress, addressLocality: companyInfo.locationFull.city, addressRegion: companyInfo.locationFull.state, postalCode: companyInfo.locationFull.zipCode, addressCountry: companyInfo.locationFull.country },
          openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1240" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type":"Question", name:"How long does company formation take?", acceptedAnswer:{ "@type":"Answer", text:"Most jurisdictions complete in 1–7 business days. UK Ltd within 24 hours; US LLCs in 3–7 days." } },
            { "@type":"Question", name:"Do I need to travel?", acceptedAnswer:{ "@type":"Answer", text:"No. Our entire process is 100% remote." } },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TrustBar />
      <OurStory />
      <MissionVision />
      <About />
      <WhyUs />
      <Services />
      <Jurisdictions />
      <Process />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <Contact />
      <Footer />
      <StickyCta />
      <CountryModal />
    </div>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      <img src={heroBg} alt="" width={1920} height={1080} aria-hidden className="absolute inset-0 -z-10 size-full object-cover opacity-20 dark:opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/90 to-background" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-foreground">
            <Zap className="size-3.5 text-brand" /> Trusted by 1,200+ founders globally
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Form your company <span className="gradient-text">anywhere in the world</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Comprehensive business formation and compliance solutions across multiple jurisdictions. We make global expansion simple, fast, and reliable.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 glow-brand">
              <a href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Trust%20Formation%2C%20I%20want%20to%20book%20a%20consultation.`} target="_blank" rel="noopener noreferrer">Book Free Consultation <ArrowRight className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#services">Explore services</a>
            </Button>
            <a href={`https://wa.me/${companyInfo.whatsapp}?text=Please%20send%20me%20the%20Global%20Expansion%20Guide%202026`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Download className="size-4" /> Free Global Expansion Guide (PDF)
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-2xl">
            {["🇺🇸","🇬🇧","🇨🇦","🇧🇩","🇦🇪","🇸🇬"].map((f) => <span key={f} className="grayscale-0 transition hover:scale-125">{f}</span>)}
          </div>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 rounded-3xl border bg-card/60 p-6 backdrop-blur md:grid-cols-4 md:p-8">
          {[
            { n: 1200, s: "+", l: "Companies formed" },
            { n: 25, s: "+", l: "Jurisdictions" },
            { n: 12, s: " yrs", l: "Of expertise" },
            { n: 49, s: "/50", l: "Avg rating × 10" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-bold text-brand sm:text-4xl"><Counter to={s.n} suffix={s.s} /></div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── TRUST BAR ───────────── */
function TrustBar() {
  const items = ["Companies House", "IRS Authorized", "ACRA Singapore", "ISO 27001", "GDPR Compliant", "FinCEN BOI"];
  return (
    <section aria-label="Trusted by" className="border-y bg-muted/40 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {items.map((i) => <span key={i}>{i}</span>)}
      </div>
    </section>
  );
}

/* ───────────── OUR STORY ───────────── */
function OurStory() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Our Journey" title="From complexity to clarity" subtitle="How Trust Formation was born from real founder pain points and evolved into the global standard for company formation." />
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-3xl font-bold text-brand mb-2">2012</div>
              <h3 className="font-display text-lg font-semibold mb-2">The Beginning</h3>
              <p className="text-sm text-muted-foreground">Our founder started a business and quickly realized the nightmare of incorporating across multiple countries. Each jurisdiction had different rules, requirements, and gatekeepers. It was slow, expensive, and unnecessarily painful.</p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-3xl font-bold text-brand mb-2">2015</div>
              <h3 className="font-display text-lg font-semibold mb-2">Building the Solution</h3>
              <p className="text-sm text-muted-foreground">After successfully incorporating 12+ companies across USA, UK, Canada, and Asia, a simple idea emerged: what if we could make this process simple for every founder? Trust Formation was founded on this mission.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-3xl font-bold text-brand mb-2">2018</div>
              <h3 className="font-display text-lg font-semibold mb-2">Global Expansion</h3>
              <p className="text-sm text-muted-foreground">We licensed real lawyers, CPAs, and chartered secretaries in every major jurisdiction. We built technology that eliminated paperwork. We started serving hundreds of founders from around the world.</p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-3xl font-bold text-brand mb-2">2026</div>
              <h3 className="font-display text-lg font-semibold mb-2">Today's Reality</h3>
              <p className="text-sm text-muted-foreground">1,200+ companies have been formed through Trust Formation. We operate in 25+ jurisdictions. 4.9★ rating from founders who've experienced the difference. We are the global standard for company formation.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── MISSION & VISION ───────────── */
function MissionVision() {
  return (
    <section className="bg-gradient-to-b from-brand/10 to-transparent py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border bg-card/80 backdrop-blur p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand">
                <Award className="size-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              To eliminate the complexity and bureaucracy of global company formation, empowering founders to focus on building their businesses instead of navigating legal systems. We believe every founder, regardless of geography or background, deserves access to expert-led, transparent, and affordable business formation services.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl border bg-card/80 backdrop-blur p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand">
                <Globe className="size-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              A world where founders can incorporate their dream company in any jurisdiction within 24 hours, with confidence that every detail is handled by licensed professionals who genuinely care about their success. We envision a global network where trust, transparency, and speed are the default.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ───────────── SERVICES ───────────── */
function Services() {
  const cats = ["All", "Formation", "Compliance", "Documentation", "Web", "Mobile", "Desktop", "AI"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = useMemo(() => cat === "All" ? services : services.filter((s) => s.category === cat), [cat]);
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Our Services" title="Everything you need to operate globally" subtitle="From entity setup to ongoing compliance — one trusted partner across every jurisdiction. Plus complete tech solutions for modern businesses." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl">
              <div className="text-3xl">{s.flag}</div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.desc}</p>
              <div className="mt-5 flex items-center justify-end border-t pt-4 text-sm">
                <a href="#consult" className="inline-flex items-center gap-1 font-medium text-brand">Request a quote <ArrowRight className="size-3.5" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── JURISDICTIONS ───────────── */
function Jurisdictions() {
  return (
    <section id="jurisdictions" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Jurisdictions" title="Compare countries side by side" subtitle="Pick the right home for your company based on cost, speed, and compliance." />
        <div className="overflow-hidden rounded-3xl border bg-card shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  {["Jurisdiction","Setup time","Compliance","Action"].map((h) => <th key={h} className="px-5 py-4 text-left font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {jurisdictions.map((j, i) => (
                  <tr key={j.code} className={`${i % 2 ? "bg-muted/30" : ""} transition hover:bg-brand/5`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{j.flag}</span>
                        <div>
                          <div className="font-semibold">{j.name}</div>
                          {j.popular && <span className="text-[10px] font-bold uppercase tracking-wider text-brand">Popular</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><Clock className="mr-1 inline size-3.5 text-muted-foreground" />{j.time}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs ${j.compliance === "High" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}>{j.compliance}</span>
                    </td>
                    <td className="px-5 py-4"><a href="#consult" className="font-medium text-brand">Start →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PROCESS ───────────── */
function Process() {
  const steps = [
    { n: "01", t: "Free Consultation", d: "Tell us your goals — we recommend the best jurisdiction and entity type." },
    { n: "02", t: "Submit Documents", d: "Upload your passport and basic info via our secure portal." },
    { n: "03", t: "We Handle Filing", d: "Our experts file with the relevant authorities and obtain your numbers." },
    { n: "04", t: "You're In Business", d: "Receive your formation docs, EIN/Tax ID, and bank introductions." },
  ];
  return (
    <section id="how" className="bg-primary py-24 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="How it Works" title="From idea to incorporated in 4 steps" subtitle="A simple, transparent process designed for founders, not bureaucrats." invert />
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="font-display text-5xl font-bold text-brand">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm opacity-70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── WHY ───────────── */
function WhyUs() {
  const items = [
    { i: Globe, t: "25+ jurisdictions", d: "From Delaware to Dubai — we operate where you grow." },
    { i: Shield, t: "Compliance built-in", d: "GDPR, BOI, AML — we keep you on the right side of the law." },
    { i: Clock, t: "Fastest in market", d: "UK Ltd in 24 hours. US LLC in 3–7 days. Guaranteed timelines." },
    { i: Award, t: "Licensed professionals", d: "Real lawyers, CPAs, and chartered secretaries — never bots." },
    { i: Users, t: "Dedicated account manager", d: "One person, one inbox, end-to-end ownership of your file." },
    { i: CheckCircle2, t: "Money-back guarantee", d: "If we can't file your company, you don't pay. Simple." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Why Trust Formation" title="The advantage of working with specialists" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ i: Ico, t, d }) => (
            <div key={t} className="rounded-2xl border bg-card p-6 transition hover:border-brand">
              <div className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand"><Ico className="size-6" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── ABOUT ───────────── */
function About() {
  return (
    <section id="about" className="bg-muted/30 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 to-transparent blur-2xl" />
          <img src={founder} alt="Trust Formation founder portrait" width={768} height={960} loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">About the founder</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight">Built by founders, for founders.</h2>
          <p className="mt-5 text-muted-foreground">
            After incorporating across 12 countries for his own ventures, our founder realised the world needed a single, honest partner for global expansion. Trust Formation was born — combining licensed legal expertise, modern technology, and a relentless focus on founder experience.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y py-6">
            <div><div className="font-display text-2xl font-bold text-brand">12+</div><div className="text-xs text-muted-foreground">Years in advisory</div></div>
            <div><div className="font-display text-2xl font-bold text-brand">1.2k</div><div className="text-xs text-muted-foreground">Founders served</div></div>
            <div><div className="font-display text-2xl font-bold text-brand">4.9★</div><div className="text-xs text-muted-foreground">Average rating</div></div>
          </div>
          <blockquote className="mt-6 border-l-4 border-brand pl-4 italic text-foreground">
            "We don't just file paperwork — we open doors to global markets, banking relationships, and compliance peace of mind."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ───────────── TESTIMONIALS ───────────── */
function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="Founders love working with us" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border bg-card p-6">
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="size-4 fill-brand" />)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <div className="grid size-10 place-items-center rounded-full bg-brand/15 text-lg">{t.flag}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border bg-card shadow-xl">
          <div className="relative aspect-video bg-primary">
            <iframe className="absolute inset-0 size-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Customer story" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
          <div className="flex items-center gap-3 p-4">
            <PlayCircle className="size-5 text-brand" />
            <p className="text-sm text-muted-foreground">Watch a 2-minute story from one of our founders.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
function Faq() {
  return (
    <section id="faq" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6 shadow-sm">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ───────────── CTA BANNER ───────────── */
function CtaBanner() {
  return (
    <section id="guide" className="py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
          <div className="absolute -right-12 -top-12 size-72 rounded-full bg-brand/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Free Guide: Global Expansion 2026</h2>
              <p className="mt-2 max-w-xl text-sm opacity-80">A 38-page playbook covering jurisdiction selection, banking, tax optimization, and compliance for ambitious founders.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90"><a href="#consult"><Download className="size-4" /> Download PDF</a></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── CONTACT ───────────── */
function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Get Started" title="Book your free consultation" subtitle="Tell us a bit about your goals — a specialist will get back to you within 1 business hour." />
        <div id="consult" className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Contact us directly</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3"><Mail className="mt-0.5 size-4 text-brand" /><div><div className="font-medium">{companyInfo.email}</div><div className="text-xs text-muted-foreground">We reply within 1 hour</div></div></li>
                <li className="flex items-start gap-3"><Phone className="mt-0.5 size-4 text-brand" /><div><div className="font-medium">{companyInfo.phone}</div><div className="text-xs text-muted-foreground">Mon–Fri, 9am–6pm GMT</div></div></li>
                <li className="flex items-start gap-3"><a href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Trust%20Formation%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services.`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-brand transition"><MessageCircle className="mt-0.5 size-4 text-brand" /><div><div className="font-medium">WhatsApp Chat</div><div className="text-xs text-muted-foreground">Click to start conversation on WhatsApp</div></div></a></li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-brand" /><div><div className="font-medium">{companyInfo.location}</div><div className="text-xs text-muted-foreground">Headquarters in Bangladesh with global offices in London & Singapore</div></div></li>
                <li className="flex items-start gap-3"><FileCheck2 className="mt-0.5 size-4 text-brand" /><div><div className="font-medium">Licensed & insured</div><div className="text-xs text-muted-foreground">ACRA · Companies House · IRS</div></div></li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border">
              <iframe title="Office map" className="h-64 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.33%2C23.82%2C90.38%2C23.84&layer=mapnik" />
            </div>
          </div>
          <ConsultationWizard />
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Trust Formation" width={36} height={36} className="size-9" />
            <span className="font-display text-lg font-bold">Trust<span className="text-brand">Formation</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-70">Comprehensive business formation and compliance across 25+ jurisdictions worldwide.</p>
        </div>
        {[
          { h: "Services", l: ["USA LLC","UK Ltd","Canada Inc","Bangladesh Pvt Ltd","UAE Free Zone","Singapore Pte"] },
          { h: "Resources", l: ["Jurisdiction Guide","FAQ","Free PDF","Blog"] },
          { h: "Company", l: ["About","Contact","Privacy","Terms","Cookies"] },
        ].map((c) => (
          <div key={c.h}>
            <h4 className="text-sm font-semibold uppercase tracking-wider">{c.h}</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-70">
              {c.l.map((x) => <li key={x}><a className="hover:text-brand" href="#">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Trust Formation. All rights reserved.</p>
          <p>Made with care for global founders.</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── HELPERS ───────────── */
function SectionHeader({ eyebrow, title, subtitle, invert }: { eyebrow: string; title: string; subtitle?: string; invert?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${invert ? "text-brand" : "text-brand"}`}>{eyebrow}</span>
      <h2 className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl ${invert ? "" : ""}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-base ${invert ? "opacity-70" : "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
  );
}

function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-2xl rounded-2xl border bg-card/95 p-3 shadow-2xl backdrop-blur md:bottom-5">
      <div className="flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">Ready to launch?</p>
          <p className="text-xs text-muted-foreground">Book a free consultation now.</p>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
          <Button asChild size="sm" variant="outline"><a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> WhatsApp</a></Button>
          <Button asChild size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><a href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Trust%20Formation%2C%20I%20would%20like%20to%20book%20a%20consultation.`} target="_blank" rel="noopener noreferrer">Book Now</a></Button>
        </div>
      </div>
    </div>
  );
}
