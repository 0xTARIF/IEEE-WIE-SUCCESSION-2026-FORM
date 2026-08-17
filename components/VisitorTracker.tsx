'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  const ANALYTICS_SCRIPT_URL = "";

  useEffect(() => {
    // Exclude admin routes from logging
    if (pathname.includes('/secretresponses') || pathname.includes('/superduperadmin')) {
      return;
    }

    const controller = new AbortController();

    const logVisitor = async () => {
      try {
        // Get IP directly via ipify
        let userIp = 'Unknown';
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
          const ipData = await ipRes.json();
          userIp = ipData.ip || 'Unknown';
        } catch (e) {
          if (controller.signal.aborted) return;
          console.error("IP fetch error:", e);
        }

        if (controller.signal.aborted) return;

        const payload = {
          path: pathname || '/',
          ip: userIp,
          city: 'Dhaka', // Default fallback or region
          country: 'Bangladesh',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        };

        await fetch(ANALYTICS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Visitor logging error:", err);
      }
    };

    const timer = window.setTimeout(logVisitor, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [pathname]);

  return null;
}
