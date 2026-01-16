export type Lang = "es" | "en";

const LANG_COOKIE = "mz_lang" as const;

const SPANISH_COUNTRIES = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "ES",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SV",
  "UY",
  "VE",
]);

function normalizeLang(value?: string | null): Lang | null {
  if (!value) return null;
  const lowered = value.toLowerCase();
  if (lowered.startsWith("es")) return "es";
  if (lowered.startsWith("en")) return "en";
  return null;
}

export function getLangCookieName(): string {
  return LANG_COOKIE;
}

export function normalizeLangValue(value?: string | null): Lang | null {
  return normalizeLang(value);
}

export function detectLang(cookieLang: string | undefined, headers: Headers): Lang {
  const normalizedCookie = normalizeLang(cookieLang);
  if (normalizedCookie) return normalizedCookie;
  return detectLangFromHeaders(headers);
}

export function detectLangFromHeaders(headers: Headers): Lang {
  const countryHeader =
    headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");

  if (countryHeader && SPANISH_COUNTRIES.has(countryHeader.toUpperCase())) {
    return "es";
  }

  const acceptLanguage = headers.get("accept-language");
  const langFromAccept = normalizeLang(acceptLanguage?.split(",")[0]);
  if (langFromAccept) return langFromAccept;

  return "en";
}
