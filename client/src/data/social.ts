/** Verified public contact links only — do not invent handles. */
export const SOCIAL = {
  email: "liaorongjian@outlook.com",
  github: "https://github.com/Alexaliao001",
  /** Add when verified; omit from UI until then. */
  twitter: null as string | null,
  linkedin: null as string | null,
} as const;

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString();
  return `mailto:${SOCIAL.email}${q ? `?${q}` : ""}`;
};
