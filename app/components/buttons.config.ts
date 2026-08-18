/**
 * 88×31 web buttons shown in the "Cool Stuff" panel of the Others section.
 * Add a new entry to the array to include another button.
 *
 * Fields:
 *   src   — URL or local path (e.g. "/images/mybadge.gif")
 *   alt   — accessible alt text / tooltip shown on hover
 *   href  — where clicking leads (omit or set null for no link)
 */
export interface WebButton {
  src: string;
  alt: string;
  href?: string | null;
}

export const webButtons: WebButton[] = [
  // ---- your buttons below ----
  {
    src: "/images/buddy.gif",
    alt: "BuddyWinte",
    href: "https://buddywinte.xyz/",
  },
  {
    src: "https://cyber.dabamos.de/88x31/css3.gif",
    alt: "CSS3",
  },
  {
    src: "https://cyber.dabamos.de/88x31/dark-mode.gif",
    alt: "Dark Mode",
  },
  {
    src: "https://cyber.dabamos.de/88x31/addchannel.gif",
    alt: "Netscape",
  },
  {
    src: "https://cyber.dabamos.de/88x31/built_notepad.gif",
    alt: "Notepad",
  },
  {
    src: "https://cyber.dabamos.de/88x31/cs3.gif",
    alt: "CS3",
  },
  {
    src: "https://cyber.dabamos.de/88x31/ddg.gif",
    alt: "DuckDuckGo",
    href: "https://duckduckgo.com/",
  },
  {
    src: "https://cyber.dabamos.de/88x31/hasmile.gif",
    alt: "Smile",
  },
  {
    src: "https://cyber.dabamos.de/88x31/mslive.gif",
    alt: "Windows Live",
  },
];
