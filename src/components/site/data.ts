import { Globe2, Building2, Banknote, Shield, FileCheck2, FileSignature, Stamp, Languages, Code, Smartphone, Cpu, Bot, Zap, Database, Layers } from "lucide-react";

export type Category = "Formation" | "Compliance" | "Documentation" | "Web" | "Mobile" | "Desktop" | "AI";

export const services = [
  { id: "usa", flag: "🇺🇸", title: "USA Company Formation (LLC)", category: "Formation" as Category, icon: Building2, desc: "Register your LLC or C-Corp in Delaware, Wyoming, or any state. EIN, registered agent & operating agreement included.", from: 499 },
  { id: "uk", flag: "🇬🇧", title: "UK Limited Company Setup", category: "Formation" as Category, icon: Globe2, desc: "Form a UK Ltd in 24 hours. Companies House filing, registered office, and HMRC tax registration.", from: 299 },
  { id: "ca", flag: "🇨🇦", title: "Canada Corporation Setup", category: "Formation" as Category, icon: Globe2, desc: "Federal or provincial incorporation. NUANS search, articles, and CRA business number.", from: 449 },
  { id: "bd", flag: "🇧🇩", title: "Bangladesh Company Formation", category: "Formation" as Category, icon: Globe2, desc: "Private Limited or branch office. RJSC registration, BIN, TIN and trade license handling.", from: 599 },
  { id: "tax", flag: "📊", title: "Tax & Annual Compliance", category: "Compliance" as Category, icon: Banknote, desc: "Annual returns, corporate tax filing, VAT/GST, BOI reports — done by licensed professionals.", from: 199 },
  { id: "kyc", flag: "🛡️", title: "AML / KYC Advisory", category: "Compliance" as Category, icon: Shield, desc: "Anti-money-laundering policies, KYC frameworks, and ongoing monitoring for regulated entities.", from: 349 },
  { id: "apostille", flag: "📜", title: "Apostille & Attestation", category: "Documentation" as Category, icon: Stamp, desc: "Apostille certification and embassy attestation for documents used abroad.", from: 149 },
  { id: "notary", flag: "✦", title: "Notary & Translation", category: "Documentation" as Category, icon: Languages, desc: "Certified translations and notarization of legal documents in 30+ languages.", from: 89 },
  
  // Web Development Services
  { id: "website", flag: "🌐", title: "Website Development", category: "Web" as Category, icon: Code, desc: "Custom websites built with React, Next.js, Vue.js. Responsive, SEO-optimized, fast-loading. Tech: TypeScript, Tailwind CSS, Vercel/Netlify deployment.", from: 1200 },
  { id: "webapp", flag: "⚡", title: "Web Application Development", category: "Web" as Category, icon: Layers, desc: "Full-stack web apps: Node.js, Express, PostgreSQL, MongoDB backends with React/Next.js frontends. Real-time features, authentication, payments integration.", from: 2500 },
  { id: "ecommerce", flag: "🛒", title: "E-commerce Solutions", category: "Web" as Category, icon: Zap, desc: "End-to-end e-commerce platforms with Shopify, WooCommerce, or custom builds. Payment processing, inventory management, multi-currency support, analytics dashboard.", from: 3000 },
  { id: "pwa", flag: "📱", title: "Progressive Web Apps (PWA)", category: "Web" as Category, icon: Smartphone, desc: "App-like web experiences. Offline functionality, push notifications, installable. Built with Service Workers, Web APIs. Works on any device.", from: 1800 },
  
  // Mobile App Services
  { id: "ios-android", flag: "📱", title: "iOS & Android Apps", category: "Mobile" as Category, icon: Smartphone, desc: "Native apps using Swift/Kotlin or cross-platform React Native/Flutter. App Store & Play Store deployment, push notifications, offline sync, real-time data.", from: 3500 },
  { id: "react-native", flag: "⚛️", title: "React Native Development", category: "Mobile" as Category, icon: Smartphone, desc: "Single codebase for iOS & Android. JavaScript/TypeScript stack. Redux state management, Firebase integration, native modules for device features.", from: 2800 },
  { id: "flutter", flag: "🦋", title: "Flutter App Development", category: "Mobile" as Category, icon: Smartphone, desc: "Beautiful, fast mobile apps. Dart language, Material & Cupertino designs. Real-time sync, offline-first architecture, smooth animations.", from: 2600 },
  { id: "app-deployment", flag: "🚀", title: "App Store & Play Store Deployment", category: "Mobile" as Category, icon: Zap, desc: "Complete app release management. Store optimization (ASO), app signing, beta testing with TestFlight/Google Play, analytics setup, crash reporting.", from: 500 },
  
  // Desktop App Services
  { id: "electron", flag: "💻", title: "Electron Desktop Apps", category: "Desktop" as Category, icon: Cpu, desc: "Cross-platform desktop apps for Windows, Mac, Linux. Built with Node.js & Chromium. Auto-updates, system integrations, file management, IPC channels.", from: 2200 },
  { id: "tauri", flag: "🦀", title: "Tauri Desktop Apps", category: "Desktop" as Category, icon: Cpu, desc: "Lightweight, secure desktop apps using Rust & web tech. Smaller bundle size than Electron. File system access, system commands, plugin architecture.", from: 2400 },
  { id: "native-desktop", flag: "🖥️", title: "Native Desktop Applications", category: "Desktop" as Category, icon: Cpu, desc: "Windows (C#/.NET), Mac (Swift), Linux (C++) native apps. Maximum performance, system integration, native UI/UX. Database backends, real-time sync.", from: 3200 },
  
  // AI Solutions
  { id: "chatbot", flag: "🤖", title: "AI Chatbot Solutions", category: "AI" as Category, icon: Bot, desc: "GPT-4/Claude-powered chatbots. Custom training on your data, multi-language support, sentiment analysis. Integrations: WhatsApp, Telegram, Slack, website.", from: 1500 },
  { id: "ai-custom", flag: "🧠", title: "Custom AI Models", category: "AI" as Category, icon: Bot, desc: "Fine-tuned LLMs for your business. Document processing, data classification, content generation. Private deployments, on-premise options available.", from: 4000 },
  { id: "ml-pipeline", flag: "📊", title: "Machine Learning Pipeline", category: "AI" as Category, icon: Database, desc: "End-to-end ML solutions. Data preprocessing, feature engineering, model training (TensorFlow, PyTorch), deployment with Docker/Kubernetes.", from: 3500 },
  { id: "data-analytics", flag: "📈", title: "Data Analytics & BI", category: "AI" as Category, icon: Database, desc: "Business intelligence dashboards. Power BI, Tableau, custom dashboards. Real-time analytics, predictive modeling, data warehousing, insights automation.", from: 2500 },
  { id: "computer-vision", flag: "👁️", title: "Computer Vision Solutions", category: "AI" as Category, icon: Zap, desc: "Image recognition, object detection, facial recognition, OCR. Real-time video processing, mobile vision APIs, quality control automation.", from: 3800 },
  { id: "nlp-services", flag: "📝", title: "NLP & Text Analytics", category: "AI" as Category, icon: Zap, desc: "Sentiment analysis, named entity recognition, summarization, translation. Multi-language support, intent detection, document classification systems.", from: 2000 },
] as const;

export const jurisdictions = [
  { code: "US", name: "United States", flag: "🇺🇸", time: "3–7 days", cost: "$499+", tax: "21% federal", compliance: "Moderate", popular: true },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", time: "24 hours", cost: "$299+", tax: "19–25%", compliance: "High", popular: true },
  { code: "CA", name: "Canada", flag: "🇨🇦", time: "2–5 days", cost: "$449+", tax: "15% federal", compliance: "High", popular: false },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", time: "7–14 days", cost: "$599+", tax: "27.5%", compliance: "Moderate", popular: false },
  { code: "AE", name: "UAE (Free Zone)", flag: "🇦🇪", time: "5–10 days", cost: "$1499+", tax: "0–9%", compliance: "Moderate", popular: true },
  { code: "SG", name: "Singapore", flag: "🇸🇬", time: "1–3 days", cost: "$799+", tax: "17%", compliance: "High", popular: false },
];

export const testimonials = [
  { name: "Sarah Chen", role: "Founder, FinPath", flag: "🇸🇬", quote: "Trust Formation set up our Delaware C-Corp in 4 days. The EIN, bank intro, and compliance pack were flawless.", rating: 5 },
  { name: "Marcus Reilly", role: "CEO, NorthArc", flag: "🇬🇧", quote: "We expanded into the UK and Canada simultaneously. Zero paperwork on our end — they handled everything.", rating: 5 },
  { name: "Ananya Rahman", role: "COO, Beacon Studio", flag: "🇧🇩", quote: "From RJSC filing to apostille, the entire process took half the time of our previous provider.", rating: 5 },
  { name: "David Okonkwo", role: "Investor", flag: "🇺🇸", quote: "Best-in-class advisory. The pricing calculator and jurisdiction comparison saved us weeks of research.", rating: 5 },
];

export const companyInfo = {
  email: "hello@trustformation.net",
  phone: "+880-1343-118676",
  phoneRaw: "+8801343118676",
  whatsapp: "+8801343118676",
  website: "trustformation.net",
  location: "Mirpur, Dhaka-1216, Bangladesh",
  locationFull: {
    streetAddress: "Mirpur",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1216",
    country: "BD",
  },
};

export const faqs = [
  { q: "How long does company formation take?", a: "Most jurisdictions are completed in 1–7 business days. UK Ltd companies can be ready within 24 hours; US LLCs typically take 3–7 days depending on the state." },
  { q: "Do I need to travel to register a company?", a: "No. Our entire process is 100% remote. We handle filings, registered agent services, and document delivery digitally." },
  { q: "What documents do I need to provide?", a: "A valid passport, proof of address (utility bill or bank statement), and basic company details (name, activity, shareholding structure)." },
  { q: "Can you open a business bank account for me?", a: "We introduce you to partner banks and fintech providers (Mercury, Wise, Revolut Business, Citi, HSBC) and prepare all required documentation." },
  { q: "What is included in your annual compliance plan?", a: "Annual return filing, registered agent renewal, tax return preparation, BOI reporting, and unlimited compliance support." },
  { q: "Is my data secure?", a: "Yes. We are GDPR-compliant, use end-to-end encryption, and never share your information with third parties without explicit consent." },
];