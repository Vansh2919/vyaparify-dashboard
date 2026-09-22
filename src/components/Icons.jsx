// Lightweight inline icon set — no external icon library dependency.
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconGrid = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const IconBox = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
  </svg>
);
export const IconCart = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
    <path d="M2.5 3h2.5l2.6 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 7H6" />
  </svg>
);
export const IconUsers = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
    <circle cx="17.5" cy="8.8" r="2.6" /><path d="M15.8 14.2c2.7.4 4.7 2.6 4.7 5.8" />
  </svg>
);
export const IconMail = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="M3 6l9 7 9-7" />
  </svg>
);
export const IconSettings = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V2.5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z" />
  </svg>
);
export const IconBell = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-2.5 8-2.5 8h17s-2.5-1.5-2.5-8z" /><path d="M10.3 20.5a1.7 1.7 0 0 0 3.4 0" />
  </svg>
);
export const IconSearch = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.3-4.3" />
  </svg>
);
export const IconPlus = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconChevronRight = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>
);
export const IconArrowUp = (p) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const IconArrowDown = (p) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const IconStore = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 9l1.5-5h15L21 9" /><path d="M4 9v10h16V9" /><path d="M9 19v-6h6v6" /><path d="M3 9h18" />
  </svg>
);
export const IconUpload = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);
export const IconTrash = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
  </svg>
);
export const IconEye = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
export const IconEyeOff = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 3l18 18" /><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c7 0 10.5 7 10.5 7a13.3 13.3 0 0 1-3 3.9M6.2 6.2C3.3 8 1.5 12 1.5 12s3.5 7 10.5 7c1.4 0 2.6-.3 3.7-.7" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);
export const IconAlert = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 2.5L1.5 21h21L12 2.5z" /><path d="M12 9.5v5" /><circle cx="12" cy="17.2" r="0.4" fill="currentColor" />
  </svg>
);
export const IconMenu = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...base} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const IconClose = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
