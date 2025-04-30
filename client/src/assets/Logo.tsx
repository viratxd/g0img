import { useId } from "react";

export const Logo = ({ width = 256, height = 256 }) => {
  const gradientId = useId();

  return (
    <svg
      version="1.1"
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      width={width}
      height={height}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bfffd5" />
          <stop offset="50%" stopColor="#ffdc8f" />
          <stop offset="100%" stopColor="#f18284" />
        </linearGradient>
      </defs>

      <path
        style={{
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: 8,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        d="M214.38 221.5H41.62c-3.93 0-7.12-3.19-7.12-7.12V41.62c0-3.93 3.19-7.12 7.12-7.12h172.76c3.93 0 7.12 3.19 7.12 7.12v172.76c0 3.93-3.19 7.12-7.12 7.12z"
      />
      <path
        style={{
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: 8,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        d="M194.39 198.5H60.61a4.11 4.11 0 0 1-4.11-4.11V60.61a4.11 4.11 0 0 1 4.11-4.11h133.78a4.11 4.11 0 0 1 4.11 4.11v133.78a4.11 4.11 0 0 1-4.11 4.11z"
      />
      <path
        style={{
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: 8,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        d="m150.41 172.45-43.37-55.04a.227.227 0 0 0-.35 0l-49.17 62.4M197.71 178.46l-42.23-53.6a.227.227 0 0 0-.35 0l-14.17 17.98"
      />
      <circle
        style={{
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: 8,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        cx="127.5"
        cy="93.5"
        r="14"
      />
    </svg>
  );
};
