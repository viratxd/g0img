import { iconRegistry } from "../lib/iconRegistry";

type IconProps = {
  name: keyof typeof iconRegistry;
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
};

export const Icon = ({
  name,
  width = 24,
  height = 24,
  fill = "#1f1f1f",
  viewBox = "0 -960 960 960",
}: IconProps) => {
  const path = iconRegistry[name];

  if (!path) {
    console.warn(`Icon "${name}" not found in registry.`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
    >
      <path d={path} />
    </svg>
  );
};
