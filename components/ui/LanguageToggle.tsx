"use client";

import { useState } from "react";

import type { Lang } from "@/lib/i18n";

type LanguageToggleProps = {
  value: Lang;
};

const labels: Record<Lang, string> = {
  es: "ES",
  en: "EN",
};

export default function LanguageToggle({ value }: LanguageToggleProps) {
  const [current, setCurrent] = useState<Lang>(value);

  const updateLanguage = (lang: Lang) => {
    setCurrent(lang);
    const maxAge = 60 * 60 * 24 * 365;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `mz_lang=${lang}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
    window.location.reload();
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white">
      {(Object.keys(labels) as Lang[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => updateLanguage(lang)}
          disabled={current === lang}
          className={`rounded-full px-3 py-1 transition ${
            current === lang
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          {labels[lang]}
        </button>
      ))}
    </div>
  );
}
