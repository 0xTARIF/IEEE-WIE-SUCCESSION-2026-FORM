'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface VisitLog {
  timestamp: string;
  path: string;
  ip: string;
  city: string;
  country: string;
  userAgent: string;
}

export default function SuperDuperAdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [logs, setLogs] = useState<VisitLog[]>([]);
  const [loading, setLoading] = useState(false);

  const SUPER_ADMIN_PASSWORD = "AmaRNaaM1";

  const ANALYTICS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRaMyIQf9-ZpkGTx5z_5pOqtgZbdY9X3LnTPi8qsVy2X2YPkIgIz-AOsl9JHs_AAVftg/exec";

  const fetchAnalytics = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const res = await fetch(`${ANALYTICS_SCRIPT_URL}?t=${Date.now()}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setLogs(data.reverse()); // Newest first
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [ANALYTICS_SCRIPT_URL]);

  // LIVE AUTO-REFRESH POLLING (EVERY 5 SECONDS)
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics(); // Initial fetch

      const interval = setInterval(() => {
        fetchAnalytics(true); // Silent update every 5 seconds
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchAnalytics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SUPER_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Super Admin Password');
    }
  };

  const exportToCSV = () => {
    if (logs.length === 0) return;

    const headers = ["Timestamp", "Path", "IP Address", "City", "Country", "User Agent"];
    const csvRows = [
      headers.join(","),
      ...logs.map(log => 
        `"${log.timestamp}","${log.path}","${log.ip}","${log.city}","${log.country}","${log.userAgent.replace(/"/g, '""')}"`
      )
    ];

    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `visitor_analytics_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalVisits = logs.length;
  const uniqueIPs = Array.from(new Set(logs.map(l => l.ip))).length;

  const pathBreakdown = logs.reduce((acc, log) => {
    acc[log.path] = (acc[log.path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#180B2B] to-[#0D051A] text-white flex flex-col justify-center items-center p-4 font-sans">
        <div className="max-w-sm w-full bg-white text-black border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(255,199,44,1)]">
          <Link href="/" className="text-xs font-black text-[#6A2874] hover:underline mb-4 inline-block">
            ← Main Page
          </Link>
          <h1 className="text-xl font-black text-[#6A2874] uppercase mb-4 text-center">Super Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-1">Enter Master Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-gray-50 border-2 border-black rounded-xl font-bold text-sm outline-none"
              />
            </div>
            {error && <p className="text-xs font-bold text-red-600">{error}</p>}
            <button type="submit" className="w-full py-3 bg-[#6A2874] text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              Unlock Super Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#1A1A1A] p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link href="/" className="text-xs font-black text-[#6A2874] hover:underline block mb-1">
              ← Main Website
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#6A2874] uppercase leading-tight">
                VISITOR ANALYTICS
              </h1>
              {/* LIVE INDICATOR BADGE */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 font-black text-[10px] uppercase rounded-full border border-red-500 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                LIVE
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={exportToCSV}
              disabled={logs.length === 0}
              className="px-4 py-2.5 bg-[#006699] hover:bg-[#6A2874] text-white font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all disabled:opacity-50"
            >
              📥 Export Excel (.CSV)
            </button>
            <button 
              onClick={() => fetchAnalytics(false)}
              disabled={loading}
              className="px-4 py-2.5 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : '🔄 Sync Now'}
            </button>
          </div>
        </div>

        {/* METRICS SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(106,40,116,1)]">
            <span className="text-xs font-black uppercase text-gray-500">Total Page Visits</span>
            <div className="text-3xl font-black text-[#6A2874] mt-1">{totalVisits}</div>
          </div>

          <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_rgba(0,102,153,1)]">
            <span className="text-xs font-black uppercase text-gray-500">Unique IP Visitors</span>
            <div className="text-3xl font-black text-[#006699] mt-1">{uniqueIPs}</div>
          </div>
        </div>

        {/* VISITS BY ROUTE PATH */}
        <div className="bg-white border-3 border-black rounded-2xl p-5 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-base font-black uppercase text-[#6A2874] mb-3">Visits Breakdown by Path</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(pathBreakdown).map(([path, count], idx) => (
              <div key={idx} className="bg-[#FAF8FC] border-2 border-black rounded-xl p-3 font-bold">
                <span className="block text-xs text-gray-500 truncate">{path}</span>
                <span className="text-lg font-black text-black">{count} visits</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOGS TABLE */}
        {loading && logs.length === 0 ? (
          <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Loading real-time visitor logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            No visitor logs recorded yet.
          </div>
        ) : (
          <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto w-full scrollbar-thin">
              <table className="w-full text-left border-collapse text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-[#6A2874] text-white border-b-2 border-black whitespace-nowrap">
                    <th className="p-3 font-black uppercase text-xs">Timestamp</th>
                    <th className="p-3 font-black uppercase text-xs">Visited Path</th>
                    <th className="p-3 font-black uppercase text-xs">IP Address</th>
                    <th className="p-3 font-black uppercase text-xs">Location</th>
                    <th className="p-3 font-black uppercase text-xs">User Agent / Device</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-purple-50 font-bold">
                      <td className="p-3 text-xs text-gray-500 whitespace-nowrap">{item.timestamp}</td>
                      <td className="p-3 text-[#006699] font-black whitespace-nowrap">{item.path}</td>
                      <td className="p-3 text-black font-mono whitespace-nowrap">{item.ip}</td>
                      <td className="p-3 text-gray-700 whitespace-nowrap">
                        {item.city !== 'Unknown' ? `${item.city}, ${item.country}` : item.country}
                      </td>
                      <td className="p-3 text-xs text-gray-400 max-w-xs truncate">{item.userAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}