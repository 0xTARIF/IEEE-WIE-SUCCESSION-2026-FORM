'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface GuestResponse {
  name: string;
  email: string;
  gradYear: string;
  attending: string;
  timestamp: string;
}

interface GeneralMemberResponse {
  timestamp: string;
  email: string;
  name: string;
  studentId: string;
  contactNo: string;
  isIeeeMember: string;
  ieeeEmail: string;
  trxId: string;
  expectations: string;
}

export default function SecretResponsesPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Tab state: 'guests' | 'general'
  const [activeTab, setActiveTab] = useState<'guests' | 'general'>('guests');
  
  const [guestResponses, setGuestResponses] = useState<GuestResponse[]>([]);
  const [generalResponses, setGeneralResponses] = useState<GeneralMemberResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);
  const requestControllerRef = useRef<AbortController | null>(null);

  const ADMIN_PASSWORD = "wie2026";

  // Exact Google Apps Script Web App URLs
  const GUESTS_SCRIPT_URL = "";
  const GENERAL_SCRIPT_URL = "";

  const fetchResponses = useCallback(async (tab: 'guests' | 'general') => {
    const targetUrl = tab === 'guests' ? GUESTS_SCRIPT_URL : GENERAL_SCRIPT_URL;

    if (!targetUrl) return;

    const requestId = ++requestIdRef.current;
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(`${targetUrl}?t=${Date.now()}`, { signal: controller.signal });
      const response = await res.json();
      const data = Array.isArray(response) ? response : response.data;

      if (requestId !== requestIdRef.current) return;

      if (Array.isArray(data)) {
        if (tab === 'guests') {
          setGuestResponses([...data].reverse());
        } else {
          setGeneralResponses([...data].reverse());
        }
      } else {
        if (tab === 'guests') setGuestResponses([]);
        else setGeneralResponses([]);
      }
    } catch (err) {
      if (controller.signal.aborted) return;
      if (requestId !== requestIdRef.current) return;
      console.error(`Error fetching ${tab} responses:`, err);
      if (tab === 'guests') setGuestResponses([]);
      else setGeneralResponses([]);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setTimeout(() => {
      void fetchResponses(activeTab);
    }, 0);

    return () => {
      clearTimeout(timer);
      requestControllerRef.current?.abort();
    };
  }, [isAuthenticated, activeTab, fetchResponses]);

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

  const currentCount = activeTab === 'guests' ? guestResponses.length : generalResponses.length;

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#1A1A1A] p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link href="/" className="text-xs font-black text-[#6A2874] hover:underline block mb-1">
              ← Main Website
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-[#006699] uppercase leading-tight">
              {activeTab === 'guests' ? 'Guest Responses' : 'General Member Responses'} ({currentCount})
            </h1>
          </div>
          <button 
            onClick={() => fetchResponses(activeTab)}
            disabled={loading}
            className="self-start sm:self-auto px-4 py-2.5 bg-[#6A2874] hover:bg-[#006699] text-white font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 sm:gap-3 mb-6">
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'guests'
                ? 'bg-[#6A2874] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-purple-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            Guests
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#006699] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-blue-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            General Members
          </button>
        </div>

        {/* Data Container */}
        {loading ? (
          <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Fetching {activeTab === 'guests' ? 'Guest' : 'General Member'} responses...
          </div>
        ) : currentCount === 0 ? (
          <div className="bg-white border-3 border-black rounded-2xl p-8 text-center font-bold text-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {activeTab === 'guests' ? 'No guest responses recorded yet.' : 'No general member responses recorded yet.'}
          </div>
        ) : (
          <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto w-full scrollbar-thin">
              
              {/* GUESTS TABLE */}
              {activeTab === 'guests' ? (
                <table className="w-full text-left border-collapse text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-[#6A2874] text-white border-b-2 border-black whitespace-nowrap">
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
                        <td className="p-3 text-black whitespace-nowrap">{item.name}</td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.email}</td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.gradYear}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-black border border-black ${String(item.attending).includes('Yes') ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                            {item.attending}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                /* GENERAL MEMBERS TABLE */
                <table className="w-full text-left border-collapse text-sm min-w-[900px]">
                  <thead>
                    <tr className="bg-[#006699] text-white border-b-2 border-black whitespace-nowrap">
                      <th className="p-3 font-black uppercase text-xs">Name</th>
                      <th className="p-3 font-black uppercase text-xs">Email</th>
                      <th className="p-3 font-black uppercase text-xs">Student ID</th>
                      <th className="p-3 font-black uppercase text-xs">Contact</th>
                      <th className="p-3 font-black uppercase text-xs">IEEE Member</th>
                      <th className="p-3 font-black uppercase text-xs">IEEE Email</th>
                      <th className="p-3 font-black uppercase text-xs">Trx ID</th>
                      <th className="p-3 font-black uppercase text-xs">Expectations</th>
                      <th className="p-3 font-black uppercase text-xs">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generalResponses.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 font-bold">
                        <td className="p-3 text-black whitespace-nowrap">{item.name}</td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.email}</td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.studentId}</td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.contactNo}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-black border border-black ${item.isIeeeMember === 'Yes' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
                            {item.isIeeeMember}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600 whitespace-nowrap">{item.ieeeEmail}</td>
                        <td className="p-3 text-[#6A2874] font-black whitespace-nowrap">{item.trxId}</td>
                        <td className="p-3 text-gray-700 max-w-xs truncate">{item.expectations}</td>
                        <td className="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
