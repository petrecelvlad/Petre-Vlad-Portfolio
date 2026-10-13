export function GamifiedWaxSeal({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`w-20 h-20 pointer-events-none drop-shadow-xl ${className}`}>
      <svg viewBox="-12 -10 75 80" className="w-full h-full overflow-visible">
        {/* Ribbon Ends */}
        <path d="M 10 20 L -10 60 L 10 55 L 20 65 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="1.5" />
        <path d="M 25 20 L 35 65 L 45 55 L 60 60 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth="1.5" />

        {/* Melted Wax Outer Blob */}
        <path
          d="M 25 -5 C 40 -8 55 2 58 18 C 62 32 50 48 35 50 C 20 52 2 45 -3 30 C -8 15 8 -2 25 -5 Z"
          fill="#991B1B"
          stroke="#450A0A"
          strokeWidth="2"
        />
        <path
          d="M 25 -1 C 37 -4 48 5 51 18 C 54 30 44 42 32 44 C 18 46 4 39 0 27 C -4 15 10 2 25 -1 Z"
          fill="#B91C1C"
        />

        {/* Stamped Inner Emblem */}
        <circle cx="26" cy="22" r="18" fill="#7F1D1D" stroke="#450A0A" strokeWidth="2" />
        <circle cx="26" cy="22" r="16" fill="#991B1B" />
        {/* Embossed Crown Crest Design */}
        <path
          d="M 26 12 L 30 18 L 36 15 L 32 24 L 38 28 L 26 27 L 14 28 L 20 24 L 16 15 L 22 18 Z"
          fill="#FECACA"
          stroke="#7F1D1D"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
