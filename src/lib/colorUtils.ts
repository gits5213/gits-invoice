import ColorThief from "colorthief";

export interface BrandColors {
  accent: string;
  secondary?: string;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/** Check if color is too light (white/off-white) to use as accent */
function isTooLight(r: number, g: number, b: number): boolean {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.9;
}

/** Check if color is too dark (near black) - less ideal for accents */
function isTooDark(r: number, g: number, b: number): boolean {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.15;
}

/** Get saturation for picking most vibrant color */
function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === 0) return 0;
  return (max - min) / max;
}

/** Extract brand colors from a logo image (data URL or URL) */
export function extractBrandColors(imageSrc: string): Promise<BrandColors> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Only set crossOrigin for external URLs; data URLs work without it
    if (!imageSrc.startsWith("data:")) {
      img.crossOrigin = "Anonymous";
    }

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 6, 10);

        if (!palette || palette.length === 0) {
          resolve({ accent: "#059669" }); // fallback emerald
          return;
        }

        // Filter out whites, near-blacks; pick most saturated
        const candidates = palette
          .map(([r, g, b]) => ({ r, g, b, sat: getSaturation(r, g, b) }))
          .filter((c) => !isTooLight(c.r, c.g, c.b) && !isTooDark(c.r, c.g, c.b));

        const sorted = candidates.sort((a, b) => b.sat - a.sat);
        const accent = sorted[0] ?? { r: palette[0][0], g: palette[0][1], b: palette[0][2] };
        const secondary = sorted[1];

        resolve({
          accent: rgbToHex(accent.r, accent.g, accent.b),
          secondary: secondary
            ? rgbToHex(secondary.r, secondary.g, secondary.b)
            : undefined,
        });
      } catch {
        resolve({ accent: "#059669" });
      }
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
