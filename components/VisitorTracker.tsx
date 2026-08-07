'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  const ANALYTICS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRaMyIQf9-ZpkGTx5z_5pOqtgZbdY9X3LnTPi8qsVy2X2YPkIgIz-AOsl9JHs_AAVftg/exec";

  useEffect(() => {
    // Exclude admin routes from logging
    if (pathname.includes('/secretresponses') || pathname.includes('/superduperadmin')) {
      return;
    }

    const logVisitor = async () => {
      try {
        // Get IP directly via ipify
        let userIp = 'Unknown';
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipRes.json();
          userIp = ipData.ip || 'Unknown';
        } catch (e) {
          console.error("IP fetch error:", e);
        }

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