type PixelFolderProps = {
  color?: string;
  className?: string;
};

export function PixelFolder({
  color = "#c9b87a",
  className = "",
}: PixelFolderProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      className={className}
      aria-hidden
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="1" y="6" width="30" height="20" fill={color} stroke="#2c3440" strokeWidth="2" />
      <rect x="1" y="4" width="14" height="6" fill={color} stroke="#2c3440" strokeWidth="2" />
      <rect x="3" y="10" width="26" height="2" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}
