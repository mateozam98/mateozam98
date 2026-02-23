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
    <div className="inline-flex w-auto items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-[10px] text-white sm:text-xs">
      {(Object.keys(labels) as Lang[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => updateLanguage(lang)}
          disabled={current === lang}
          className={`min-h-8 min-w-10 rounded-full px-2 py-1 text-[10px] transition sm:min-h-0 sm:min-w-0 sm:px-3 sm:text-xs ${
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
