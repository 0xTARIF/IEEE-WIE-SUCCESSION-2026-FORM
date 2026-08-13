import Link from "next/link";
import { REGISTRATION_CLOSED_INFO } from "@/lib/registration";

type RegistrationClosedProps = {
  showHomeButton?: boolean;
};

export default function RegistrationClosed({
  showHomeButton = true,
}: RegistrationClosedProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white border-4 border-black rounded-3xl p-7 sm:p-9 text-center shadow-[8px_8px_0px_0px_rgba(106,40,116,1)]">
      
      <div className="text-5xl mb-4">
        💜
      </div>

      <span className="inline-block bg-[#6A2874] text-white text-[10px] sm:text-xs font-black px-4 py-1.5 uppercase tracking-widest rounded-full border-2 border-black mb-4">
        Succession 2026
      </span>

      <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#6A2874] mb-3">
        {REGISTRATION_CLOSED_INFO.title}
      </h2>

      <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed mb-6">
        {REGISTRATION_CLOSED_INFO.message}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-[#F3EEF8] border-2 border-black rounded-xl p-3">
          <p className="text-[10px] uppercase font-black text-[#6A2874]">
            Date
          </p>
          <p className="text-xs font-black">
            {REGISTRATION_CLOSED_INFO.date}
          </p>
        </div>

        <div className="bg-[#F3EEF8] border-2 border-black rounded-xl p-3">
          <p className="text-[10px] uppercase font-black text-[#006699]">
            Time
          </p>
          <p className="text-xs font-black">
            {REGISTRATION_CLOSED_INFO.time}
          </p>
        </div>

        <div className="bg-[#F3EEF8] border-2 border-black rounded-xl p-3">
          <p className="text-[10px] uppercase font-black text-[#6A2874]">
            Venue
          </p>
          <p className="text-xs font-black">
            {REGISTRATION_CLOSED_INFO.venue}
          </p>
        </div>
      </div>

      <p className="font-black text-[#006699] text-sm sm:text-base">
        See you at the venue! ✨
      </p>

      {showHomeButton && (
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#6A2874] text-white font-black text-xs uppercase tracking-wider rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          ← Back to Main Page
        </Link>
      )}
    </div>
  );
}