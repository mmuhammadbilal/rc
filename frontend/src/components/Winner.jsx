import React, { useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Winner = ({ playerName = "Player Name", teamName = "Team Name" }) => {
  const certRef = useRef();
const downloadPNG = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, {
      scale: 4,           // High-res
      useCORS: true,
      backgroundColor: null,
    });
    const imgData = canvas.toDataURL("image/png");

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "Winner_of_the_Tournament.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      {/* Certificate Canvas */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-[1120px] h-[792px] rounded-[28px] overflow-hidden"
      >
      

        {/* Lux Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 10% 5%, rgba(255,215,0,0.15), transparent 60%), radial-gradient(1200px 600px at 90% 95%, rgba(255,255,255,0.08), transparent 60%), linear-gradient(135deg, #0b0f2b 0%, #1a1033 45%, #2a1a44 100%)",
          }}
        />
{/* RC Logo */}
<img
  src="/assets/RCLogo.png"  // Make sure RCLogo.png is in public/assets
  alt="RC Logo"
  className="absolute top-6 left-[20px] w-32 h-32 object-contain z-10"
/>


<div
 className="absolute top-9 left-[300px] text-3xl font-bold uppercase"
  style={{
    background: "linear-gradient(90deg, #f1c40f, #ffd700, #fff1a8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 6px rgba(255,215,0,0.6)",
  }}
>
  REAL CRICKET WORLDCUP AUG 2025
</div>
        {/* Gold Foil Double Frame */}
        <div
          className="absolute inset-0 m-3 rounded-[24px]"
          style={{
            border: "10px solid transparent",
            borderImage: "linear-gradient(45deg, #f1c40f, #ffd700, #fff1a8, #f1c40f) 1",
          }}
        />
        <div
          className="absolute inset-0 m-6 rounded-[18px]"
          style={{
            border: "1px solid rgba(255,215,0,0.45)",
            boxShadow: "inset 0 0 40px rgba(255,215,0,0.15)",
          }}
        />

        {/* Watermark (subtle bats + ball) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* crossed bats */}
            <rect x="205" y="120" width="18" height="200" rx="9" fill="#ffd700" transform="rotate(-35 205 120)" />
            <rect x="377" y="120" width="18" height="200" rx="9" fill="#ffd700" transform="rotate(35 377 120)" />
            {/* ball */}
            <circle cx="300" cy="210" r="40" fill="#ffd700" />
            <path d="M265 210 Q300 196 335 210" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M265 220 Q300 206 335 220" stroke="#000" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Holographic Seal */}
        <div className="absolute top-8 right-10">
          <div
            className="w-28 h-28 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #ffdf6e, #cafffb, #ffc7f5, #fff4a6, #c5ffb3, #ffdf6e)",
              boxShadow:
                "0 0 20px rgba(255,215,0,0.45), inset 0 0 12px rgba(255,255,255,0.35)",
              border: "2px solid rgba(0,0,0,0.25)",
            }}
          />
          <div className="absolute inset-0 top-[22px] right-[10px] flex items-center justify-center">
            <div className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(0,0,0,0.55)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.25)",
                letterSpacing: "0.15em",
              }}
            >
              Official Seal RC24
            </div>
          </div>
        </div>

        {/* Crest: trophy + laurel */}
        <div className="absolute left-1/2 -translate-x-1/2 top-14 flex flex-col items-center">
          {/* Laurel */}
          <svg width="260" height="90" viewBox="0 0 260 90" className="opacity-90">
            <path
              d="M10,80 C60,10 200,10 250,80"
              fill="none"
              stroke="url(#goldStroke)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f1c40f" />
                <stop offset="50%" stopColor="#fff1a8" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
          </svg>

          {/* Trophy */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="110"
            height="110"
            viewBox="0 0 64 64"
            className="drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] -mt-6"
          >
            <defs>
              <linearGradient id="goldBody" x1="0" x2="1">
                <stop offset="0%" stopColor="#f1c40f" />
                <stop offset="50%" stopColor="#fff1a8" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
            <path d="M20 10h24v10a12 12 0 0 1-24 0V10z" fill="url(#goldBody)" stroke="#221" strokeWidth="1" />
            <circle cx="32" cy="8" r="6" fill="url(#goldBody)" stroke="#221" strokeWidth="1" />
            <path d="M16 50h32v4H16z" fill="url(#goldBody)" stroke="#221" strokeWidth="0.5" />
            <path d="M22 54h20v4H22z" fill="url(#goldBody)" stroke="#221" strokeWidth="0.5" />
            {/* mini bats behind cup */}
            <rect x="7" y="28" width="6" height="20" rx="3" fill="#ffd700" transform="rotate(-35 7 28)" />
            <rect x="51" y="28" width="6" height="20" rx="3" fill="#ffd700" transform="rotate(35 51 28)" />
          </svg>
        </div>

        {/* Main Title */}
        <h1
          className="absolute top-60 w-full text-center text-[44px] font-extrabold tracking-[0.15em] uppercase"
          style={{
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundImage:
              "linear-gradient(90deg, #fff6c2 0%, #ffe37f 40%, #fff6c2 70%, #ffd700 100%)",
            textShadow: "0 2px 14px rgba(255,215,0,0.35)",
            letterSpacing: "0.14em",
          }}
        >
          BOWLER OF THE TOURNAMENT
        </h1>

        {/* Subtitle */}
        <p className="absolute top-[300px] w-full text-center text-[18px] italic text-yellow-100/90">
          This certificate is proudly Presented To
        </p>

        {/* Recipient */}
        <div className="absolute top-[340px] w-full text-center">
          <div
            className="inline-block px-8 py-3 rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,215,0,0.18), rgba(255,215,0,0.05))",
              border: "1px solid rgba(255,215,0,0.4)",
              boxShadow:
                "0 6px 22px rgba(0,0,0,0.35), inset 0 0 18px rgba(255,215,0,0.2)",
            }}
          >
            <div
              className="text-[40px] font-bold leading-none"
              style={{
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundImage:
                  "linear-gradient(90deg, #fff8d0, #ffeaa0, #fff8d0)",
              }}
            >
              {playerName}
            </div>
            <div className="mt-2 text-[18px] tracking-wide text-yellow-100/90">
              Team: <span className="font-semibold text-yellow-200">{teamName}</span>
            </div>
          </div>
        </div>

        {/* Citation */}
        <p className="absolute top-[445px] w-full text-center px-16 text-[16px] leading-7 text-yellow-100/85">
            Awarded as Bowler of the Tournament for exceptional bowling performance, leadership under pressure, and exemplary sportsmanship throughout the competition.
        </p>
        {/* Citation */}



        {/* Footer Panel */}
        <div className="absolute bottom-24 left-0 right-0 mx-12 px-10 py-6 rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))",
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        >
          <div className="flex items-end justify-between">
            {/* Host Signature */}
            <div className="w-1/3 text-center">
            {/* Bilal Shahid Signature in SVG */}
{/* Signature: text + underline */}
<svg viewBox="0 0 500 120" width="300" height="80" className="mx-auto mb-2">
  {/* Signature-style text */}
  <text
    x="50%"
    y="50%"
    dominantBaseline="middle"
    textAnchor="middle"
    fontFamily="Brush Script MT, cursive"
    fontSize="42"
    fill="white"
    style={{ textShadow: '0 0 6px rgba(255,255,255,0.35)' }}
  >
    BILAL SHAHID
  </text>

  {/* Slightly curved underline */}
  {/* <path
    d="M120 75 Q250 95, 380 75"
    fill="none"
    stroke="rgba(255,255,255,0.95)"
    strokeWidth="2.2"
    strokeLinecap="round"
    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
  /> */}
</svg>

              <div className="text-[20px] font-medium text-yellow-100">Bilal </div>
              <div className="mt-1 text-[12px] uppercase tracking-widest text-yellow-200/80 border-t border-yellow-300/40 pt-2">
                Host
              </div>
            </div>

            {/* Date / Cert No */}
            <div className="w-1/3 text-center text-yellow-200/90">
              <div className="text-[12px] uppercase tracking-widest opacity-80">Certificate No.</div>
              <div className="text-[16px] font-semibold mb-3">RC-2025-WIN-001</div>
              <div className="text-[12px] uppercase tracking-widest opacity-80">Date</div>
              <div className="text-[16px] font-semibold">
                {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Partner Signature */}
            <div className="w-1/3 text-center">
              <svg viewBox="0 0 500 120" width="300" height="80" className="mx-auto mb-2">
  {/* Signature-style text */}
  <text
    x="50%"
    y="50%"
    dominantBaseline="middle"
    textAnchor="middle"
    fontFamily="Brush Script MT, cursive"
    fontSize="42"
    fill="white"
    style={{ textShadow: '0 0 6px rgba(255,255,255,0.35)' }}
  >
    ZAKRIA
  </text>

  {/* Slightly curved underline */}
  {/* <path
    d="M120 75 Q250 95, 380 75"
    fill="none"
    stroke="rgba(255,255,255,0.95)"
    strokeWidth="2.2"
    strokeLinecap="round"
    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
  /> */}
</svg>

              <div className="text-[20px] font-medium text-yellow-100">Rana Zakria</div>
              <div className="mt-1 text-[12px] uppercase tracking-widest text-yellow-200/80 border-t border-yellow-300/40 pt-2">
                Partner
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ribbon */}
        <div className="absolute bottom-6 left-10 right-10 h-10 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,215,0,0.25), rgba(255,255,255,0.12), rgba(255,215,0,0.25))",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        />

        {/* Moving sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </motion.div>

    </div>
  );
};

export default Winner;
