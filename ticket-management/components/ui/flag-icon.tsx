import React from "react";

interface FlagIconProps {
  country: string;
  className?: string;
}

const flags: Record<string, React.ReactNode> = {
  gb: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      width="100%"
      height="100%"
    >
      <defs>
        <clipPath id="gb">
          <path d="M0 0v20h30V0z" />
        </clipPath>
      </defs>
      <path fill="#00247D" d="M0 0v20h30V0z" />
      <path
        stroke="#FFFFFF"
        strokeWidth="4"
        d="M0 0l30 20m0-20L0 20"
        clipPath="url(#gb)"
      />
      <path
        stroke="#CF142B"
        strokeWidth="2"
        d="M0 0l30 20m0-20L0 20"
        clipPath="url(#gb)"
      />
      <path stroke="#FFFFFF" strokeWidth="6" d="M15 0v20M0 10h30" />
      <path stroke="#CF142B" strokeWidth="4" d="M15 0v20M0 10h30" />
    </svg>
  ),
  fr: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3 2"
      width="100%"
      height="100%"
    >
      <path fill="#002654" d="M0 0h1v2H0z" />
      <path fill="#FFFFFF" d="M1 0h1v2H1z" />
      <path fill="#ED2939" d="M2 0h1v2H2z" />
    </svg>
  ),
  de: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5 3"
      width="100%"
      height="100%"
    >
      <path d="M0 0h5v3H0z" />
      <path fill="#DD0000" d="M0 1h5v2H0z" />
      <path fill="#FFCC00" d="M0 2h5v1H0z" />
    </svg>
  ),
  cn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      width="100%"
      height="100%"
    >
      <path fill="#EE1C25" d="M0 0h30v20H0z" />
      <path
        fill="#FFFF00"
        d="M5 2l1 3.17L9.17 6 6 7.17 7.17 11 5 8.83 2.83 11 4 7.17.83 6 4 5.17z"
      />
      <path
        fill="#FFFF00"
        d="M10 2l.47 1.76 1.76.47-1.76.47L10 6l-.47-1.76L7.77 4l1.76-.47zM12 4l.47 1.76 1.76.47-1.76.47L12 8l-.47-1.76L9.77 6l1.76-.47zM12 7l.47 1.76 1.76.47-1.76.47L12 11l-.47-1.76L9.77 9l1.76-.47zM10 9l.47 1.76 1.76.47-1.76.47L10 13l-.47-1.76L7.77 11l1.76-.47z"
      />
    </svg>
  ),
  jp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width="100%"
      height="100%"
    >
      <path fill="#FFFFFF" d="M0 0h900v600H0z" />
      <circle fill="#BC002D" cx="450" cy="300" r="180" />
    </svg>
  ),
  tr: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800"
      width="100%"
      height="100%"
    >
      <path fill="#E30A17" d="M0 0h1200v800H0z" />
      <circle fill="#FFFFFF" cx="425" cy="400" r="200" />
      <circle fill="#E30A17" cx="475" cy="400" r="160" />
      <path
        fill="#FFFFFF"
        d="M583.334 400l180.901 58.779-111.804-153.885v190.212l111.804-153.885z"
      />
    </svg>
  ),
  es: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 750 500"
      width="100%"
      height="100%"
    >
      <path fill="#AA151B" d="M0 0h750v500H0z" />
      <path fill="#F1BF00" d="M0 125h750v250H0z" />
    </svg>
  ),
  hk: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width="100%"
      height="100%"
    >
      <path fill="#EE1C25" d="M0 0h900v600H0z" />
      <g transform="translate(450,300) scale(0.75)">
        <g fill="#FFFFFF">
          {/* Main petals */}
          <path
            d="M-150,-25 C-150,-75 -125,-150 0,-150 C125,-150 150,-75 150,-25 C150,25 75,75 0,75 C-75,75 -150,25 -150,-25 Z"
            transform="rotate(0)"
          />
          <path
            d="M-150,-25 C-150,-75 -125,-150 0,-150 C125,-150 150,-75 150,-25 C150,25 75,75 0,75 C-75,75 -150,25 -150,-25 Z"
            transform="rotate(72)"
          />
          <path
            d="M-150,-25 C-150,-75 -125,-150 0,-150 C125,-150 150,-75 150,-25 C150,25 75,75 0,75 C-75,75 -150,25 -150,-25 Z"
            transform="rotate(144)"
          />
          <path
            d="M-150,-25 C-150,-75 -125,-150 0,-150 C125,-150 150,-75 150,-25 C150,25 75,75 0,75 C-75,75 -150,25 -150,-25 Z"
            transform="rotate(216)"
          />
          <path
            d="M-150,-25 C-150,-75 -125,-150 0,-150 C125,-150 150,-75 150,-25 C150,25 75,75 0,75 C-75,75 -150,25 -150,-25 Z"
            transform="rotate(288)"
          />

          {/* Center circle */}
          <circle r="50" />

          {/* Red stars */}
          <g fill="#EE1C25">
            <circle r="15" transform="translate(0,-100)" />
            <circle r="15" transform="translate(95,-31)" />
            <circle r="15" transform="translate(59,81)" />
            <circle r="15" transform="translate(-59,81)" />
            <circle r="15" transform="translate(-95,-31)" />
          </g>
        </g>
      </g>
    </svg>
  ),
  sa: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width="100%"
      height="100%"
    >
      <path fill="#006C35" d="M0 0h900v600H0z" />
      <g transform="translate(450,300)">
        <text
          fill="#FFFFFF"
          fontSize="120"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="traditional arabic"
          transform="scale(2.5)"
        >
          لا إله إلا الله محمد رسول الله
        </text>
        <path
          fill="#FFFFFF"
          d="M-120,-20 C-120,-70 -100,-120 0,-120 C100,-120 120,-70 120,-20 C120,30 60,60 0,60 C-60,60 -120,30 -120,-20 Z"
        />
      </g>
    </svg>
  ),
  pt: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 400"
      width="100%"
      height="100%"
    >
      <path fill="#FF0000" d="M0 0h600v400H0z" />
      <path fill="#006600" d="M0 0h200v400H0z" />
      <circle
        cx="200"
        cy="200"
        r="65"
        fill="#FFFF00"
        stroke="#000000"
        strokeWidth="10"
      />
      <path
        fill="#0000CC"
        d="M200 140a60 60 0 0 0-60 60 60 60 0 0 0 60 60 60 60 0 0 0 60-60 60 60 0 0 0-60-60m0 10a50 50 0 0 1 50 50 50 50 0 0 1-50 50 50 50 0 0 1-50-50 50 50 0 0 1 50-50"
      />
      <path
        fill="#FFFFFF"
        d="M200 150c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50m0 10c22.091 0 40 17.909 40 40s-17.909 40-40 40-40-17.909-40-40 17.909-40 40-40"
      />
    </svg>
  ),
};

export function FlagIcon({ country, className = "" }: FlagIconProps) {
  const flag = flags[country];
  if (!flag) return null;

  return (
    <div className={`inline-block ${className}`} style={{ lineHeight: 0 }}>
      {flag}
    </div>
  );
}
