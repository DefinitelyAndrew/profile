"use client";
import { useRef } from "react";
import { LanyardData, STATUS_COLOR, STATUS_LABEL } from "./useLanyard";
import { aboutSectionOptions as o } from "./options";
import styles from "./SocialsCard.module.css";

interface Social {
  name: string;
  username: string;
  href: string;
  icon: React.ReactNode;
}

interface Props {
  lanyardData: LanyardData | null;
  inView: boolean;
}

export default function SocialsCard({ lanyardData, inView }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -my * o.socialsHoverMouseRange;
    const ry = o.socialsHoverTiltY + mx * o.socialsHoverMouseRange;
    card.style.transition = "transform 0.15s ease";
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)";
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  const status = lanyardData?.discord_status ?? "offline";
  const dotColor = STATUS_COLOR[status];
  const statusLabel = STATUS_LABEL[status];
  const discordUsername = lanyardData?.discord_user?.username ?? "...";

  const socials: Social[] = [
    {
      name: "github",
      username: "csynholic",
      href: "https://github.com/csynholic",
      icon: <GithubIcon />,
    },
    {
      name: "steam",
      username: "csynholic",
      href: "https://steamcommunity.com/id/csynholic",
      icon: <SteamIcon />,
    },
    {
      name: "discord",
      username: discordUsername,
      href: `https://discord.com/users/${process.env.NEXT_PUBLIC_DISCORD_ID ?? "1481359855045447802"}`,
      icon: <DiscordIcon />,
    },
    {
      name: "telegram",
      username: "perver7",
      href: "https://t.me/perver7",
      icon: <TelegramIcon />,
    },
    {
      name: "tiktok",
      username: "csynholic",
      href: "https://tiktok.com/@csynholic",
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src="/icons/tiktok.svg" alt="TikTok" width={16} height={16} style={{ display: "block" }} />,
    },
    {
      name: "email",
      username: "cosmin@cursi.ng",
      href: "mailto:cosmin@cursi.ng",
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src="/icons/email.svg" alt="email" width={16} height={16} style={{ display: "block" }} />,
    },
  ];

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${inView ? styles.inView : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.label} style={{ opacity: o.labelOpacity }}>
        <span className={styles.labelRule} style={{ width: o.labelRuleWidth }} />
        <span className={styles.labelText}>find me at</span>
      </div>

      <div className={styles.statusRow}>
        <span className={styles.statusDot} style={{ background: dotColor }} />
        <span className={styles.statusText}>{statusLabel}</span>
      </div>

      <div className={styles.list}>
        {socials.map((s, i) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.row}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className={styles.icon}>{s.icon}</span>
            <span className={styles.platform}>{s.name}</span>
            <span className={styles.sep}>/</span>
            <span className={styles.username}>{s.username}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.497 1.009 2.452-.397.957-1.497 1.41-2.454 1.015zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942.0209-.0407.0083-.0893-.0395-.1091-1.1641-.4415-2.2765-1.0052-3.354-1.6501-.0573-.033-.061-.1167-.0076-.1572.2257-.1692.4514-.3452.6671-.5231a.0752.0752 0 01.0785-.0105c4.0513 1.8495 8.4373 1.8495 12.4427 0a.0752.0752 0 01.0796.0095c.2157.1779.4414.3559.6671.5231.0533.0405.0496.1242-.0077.1572-1.0775.6449-2.1899 1.2086-3.354 1.6501-.0478.0198-.0604.0694-.0394.1091.3534.699.7642 1.3638 1.2255 1.9942a.076.076 0 00.0842.0276c1.961-.6066 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
