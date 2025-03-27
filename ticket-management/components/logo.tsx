import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 140, height = 40 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Burger Icon */}
      <path
        d="M8 14C8 12.8954 8.89543 12 10 12H26C27.1046 12 28 12.8954 28 14C28 15.1046 27.1046 16 26 16H10C8.89543 16 8 15.1046 8 14Z"
        fill="#00B5B3"
      />
      <path
        d="M8 20C8 18.8954 8.89543 18 10 18H26C27.1046 18 28 18.8954 28 20C28 21.1046 27.1046 22 26 22H10C8.89543 22 8 21.1046 8 20Z"
        fill="#00B5B3"
      />
      <path
        d="M8 26C8 24.8954 8.89543 24 10 24H26C27.1046 24 28 24.8954 28 26C28 27.1046 27.1046 28 26 28H10C8.89543 28 8 27.1046 8 26Z"
        fill="#00B5B3"
      />
      <circle cx="18" cy="14" r="1" fill="white" />
      <circle cx="22" cy="20" r="1" fill="white" />
      <circle cx="14" cy="26" r="1" fill="white" />

      {/* 41deg Text */}
      <text
        x="40"
        y="28"
        fill="#4A5568"
        fontSize="20"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        style={{ textTransform: "lowercase" }}
      >
        41deg
      </text>
    </svg>
  );
}
