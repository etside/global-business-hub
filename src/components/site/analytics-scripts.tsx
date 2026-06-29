import { useEffect } from "react";
import { useSiteData } from "@/lib/site-data";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

export function AnalyticsScripts() {
  const { data } = useSiteData();
  const gtm = data?.settings?.analytics?.gtm_id?.trim();
  const pixel = data?.settings?.analytics?.fb_pixel_id?.trim();

  useEffect(() => {
    if (!gtm || typeof window === "undefined") return;
    if (document.getElementById("gtm-script")) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
    document.head.appendChild(s);
  }, [gtm]);

  useEffect(() => {
    if (!pixel || typeof window === "undefined") return;
    if (document.getElementById("fb-pixel-script")) return;
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      const t = b.createElement(e); t.async = true; t.id = "fb-pixel-script"; t.src = v;
      const s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", pixel);
    window.fbq?.("track", "PageView");
  }, [pixel]);

  return gtm ? (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  ) : null;
}