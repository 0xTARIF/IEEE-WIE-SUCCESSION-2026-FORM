'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface RSVPResponse {
  name: string;
  email: string;
  gradYear: string;
  attending: string;
  timestamp: string;
}

export default function SecretResponsesPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Tab state: 'guests' | 'general'
  const [activeTab, setActiveTab] = useState<'guests' | 'general'>('guests');
  
  const [guestResponses, setGuestResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "wie2026";

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/responses');
      const data = await res.json();

      if (Array.isArray(data)) {
        setGuestResponses(data.reverse()); // Newest first
      } else {
        setGuestResponses([]);
      }
    } catch (err) {
      console.error("Error fetching live responses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResponses();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F3EEF8] to-[#E8DEF2] flex flex-col justify-center items-center p-4 font-sans">
        <div className="max-w-sm w-full bg-[#FAF8FC] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Link href="/" className="text-xs font-black text-[#6A2874] hover:underline mb-4 inline-block">
            ← Main Page
          </Link>
          <h1 className="text-xl font-black text-[#006699] uppercase mb-4 text-center">Secret Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-1">Enter Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-white border-2 border-black rounded-xl font-bold text-sm outline-none"
              />
            </div>
            {error && <p className="text-xs font-bold text-red-600">{error}</p>}
            <button type="submit" className="w-full py-3 bg-[#6A2874] text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#1A1A1A] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Main Web Link */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link href="/" className="text-xs font-black text-[#6A2874] hover:underline block mb-1">
              ← Main Website
            </Link>
            <h1 className="text-3xl font-black text-[#006699] uppercase">
              {activeTab === 'guests' 
                ? `Guest / Alumni Responses (${guestResponses.length})` 
                : 'General Member Responses (0)'}
            </h1>
          </div>
          <button 
            onClick={fetchResponses}
            disabled={loading || activeTab === 'general'}
            className="px-4 py-2 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-5 py-2.5 rounded-xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'guests'
                ? 'bg-[#6A2874] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-purple-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            Guests / Alumni
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`px-5 py-2.5 rounded-xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#006699] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-blue-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            General Members
          </button>
        </div>

        {/* GUESTS / ALUMNI RESPONSES VIEW */}
        {activeTab === 'guests' && (
          loading ? (
            <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Fetching guest responses from Google Sheets...
            </div>
          ) : guestResponses.length === 0 ? (
            <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              No guest responses recorded yet.
            </div>
          ) : (
            <div className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#6A2874] text-white border-b-2 border-black">
                    <th className="p-3 font-black uppercase text-xs">Name</th>
                    <th className="p-3 font-black uppercase text-xs">Email</th>
                    <th className="p-3 font-black uppercase text-xs">Batch</th>
                    <th className="p-3 font-black uppercase text-xs">Attending</th>
                    <th className="p-3 font-black uppercase text-xs">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {guestResponses.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-purple-50 font-bold">
                      <td className="p-3 text-black">{item.name}</td>
                      <td className="p-3 text-gray-600">{item.email}</td>
                      <td className="p-3 text-gray-600">{item.gradYear}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-black border border-black ${String(item.attending).includes('Yes') ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                          {item.attending}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-400">
                        {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* GENERAL MEMBERS RESPONSES VIEW (PLACEHOLDER) */}
        {activeTab === 'general' && (
          <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-base text-[#006699] font-black uppercase mb-1">General Member Submissions Endpoint Pending</p>
            <p className="text-xs text-gray-500 font-bold">The registration link for general members is currently null/unlinked.</p>
          </div>
        )}

      </div>
    </div>
  );
}