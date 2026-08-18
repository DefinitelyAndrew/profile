/**
 * Songs config
 * ============
 * Add tracks the music player should know about. Each entry needs a
 * display name and the path to the audio file. Cover art is optional —
 * if omitted, a stylised fallback disc is rendered.
 *
 * `src` and `cover` accept any of:
 *   - a web URL (e.g. "/sfx/grass.mp3" or "https://...")
 *   - a Windows-style relative path (e.g. "sfx\\grass.mp3")
 *   - an absolute Windows path that points inside the website folder
 *     (e.g. "C:\\Users\\cosmin\\Desktop\\website\\sfx\\grass.mp3")
 *
 * `normalizeSrc` strips the project root and converts backslashes so
 * Next.js can serve the file from /public.
 */

export interface Song {
  /** Display name shown under the disc. */
  name: string;
  /** Path to the audio file. */
  src: string;
  /** Optional path to the cover-art image (square works best). */
  cover?: string;
}

export const songs: Song[] = [
  {
    name: "Song of the Ancients (Popola)",
    src: "sfx\\sota-p.mp3",
    cover: "images\\grimoire_weiss.jpg",
    // To set a cover, drop an image in C:\Users\cosmin\Desktop\website\public\images
    // and reference it like:
    //   cover: "images\\sota-p.jpg",
    // (or a full path "C:\\Users\\cosmin\\Desktop\\website\\public\\images\\sota-p.jpg")
    // Without `cover` set here AND no `playerOptions.defaultCover`, the
    // disc shows a stylised placeholder (first letter of the title).
  },
  {
    name: "Beyond Fate (Humming)",
    src: "C:\\Users\\cosmin\\Desktop\\website\\sfx\\grass.mp3",
    cover: "images\\stellar_blade.jpg",
  },
  {
    name: "Kaine - Salvation",
    src: "sfx\\kaine-salvation.mp3",
    cover: "images\\grimoire_weiss.jpg",
  },
];

/**
 * Normalises any of the accepted path styles into a web-served URL.
 *  - Already-URL inputs (http(s):// or starting with "/") pass through.
 *  - Absolute Windows paths inside the project root are stripped of the
 *    root prefix.
 *  - Backslashes become forward slashes.
 *  - A leading "/public/" is removed (Next.js serves /public at the root).
 */
export function normalizeSrc(src: string): string {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;

  let s = src.trim();

  // If a Windows path mentions the project root, drop everything up to it.
  // Matches both "...\website\sfx\foo.mp3" and "...//website//sfx//foo.mp3".
  const rootMatch = s.match(/[\\/]website[\\/](.*)$/i);
  if (rootMatch) s = rootMatch[1];

  // Backslashes → forward slashes
  s = s.replace(/\\/g, "/");

  // Ensure leading slash so the browser treats it as site-relative
  if (!s.startsWith("/")) s = "/" + s;

  // Next.js serves /public at "/", so an explicit /public prefix is wrong.
  s = s.replace(/^\/public\//, "/");

  return s;
}
