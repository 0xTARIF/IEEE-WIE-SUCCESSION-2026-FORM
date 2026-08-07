'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  // Your exact Google Apps Script URL for Analytics
  const ANALYTICS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRaMyIQf9-ZpkGTx5z_5pOqtgZbdY9X3LnTPi8qsVy2X2YPkIgIz-AOsl9JHs_AAVftg/exec";

  useEffect(() => {
    // Exclude logging admin routes so admin page views don't pollute visitor metrics
    if (pathname.includes('/secretresponses') || pathname.includes('/superduperadmin')) {
      return;
    }

    const logVisitor = async () => {
      try {
        // Fetch IP and Geo Location details safely
        const ipRes = await fetch('https://ipapi.co/json/').catch(() => null);
        const geoData = ipRes ? await ipRes.json() : {};

        const payload = {
          path: pathname || '/',
          ip: geoData.ip || 'Unknown',
          city: geoData.city || 'Unknown',
          country: geoData.country_name || 'Unknown',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        };

        await fetch(ANALYTICS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error("Visitor logging error:", err);
      }
    };

    logVisitor();
  }, [pathname]);

  return null;
}