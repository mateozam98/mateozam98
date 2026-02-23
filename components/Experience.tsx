"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getWorkExperience } from "@/data";
import type { Lang } from "@/lib/i18n";
import { Button } from "./ui/MovingBorders";
import ScrollReveal from "@/components/ui/ScrollReveal";

const copy = {
  es: {
    heading: "Mi",
    highlight: "experiencia",
    suffix: "profesional",
    currentBadge: "Actual",
  },
  en: {
    heading: "My",
    highlight: "professional",
    suffix: "experience",
    currentBadge: "Current",
  },
} as const;

type RemoteExperience = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  thumbnail: string;
  isCurrent?: boolean;
  createdAt?: number;
};

const Experience = ({ lang }: { lang: Lang }) => {
  const workExperience = getWorkExperience(lang);
  const [remoteExperience, setRemoteExperience] = useState<RemoteExperience[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/experience", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (data?.experience && Array.isArray(data.experience)) {
          setRemoteExperience(data.experience);
        }
      } catch {
        setRemoteExperience([]);
      }
    };
    load();
  }, []);

  const mergedExperience = useMemo(() => {
    const mappedRemote = remoteExperience
      .map((item, index) => ({
        id: `remote-${index}`,
        title: lang === "es" ? item.titleEs : item.titleEn,
        desc: lang === "es" ? item.descEs : item.descEn,
        thumbnail: item.thumbnail,
        className: "md:col-span-2",
        isCurrent: item.isCurrent ?? false,
        createdAt: item.createdAt ?? 0,
      }))
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

    const mappedBase = workExperience.map((item) => ({
      ...item,
      className: "md:col-span-2",
      isCurrent: false,
      createdAt: 0,
    }));

    return [...mappedRemote, ...mappedBase];
  }, [lang, remoteExperience, workExperience]);

  return (
    <ScrollReveal variant="fade-left" className="py-20 w-full">
      <div id="experiencia">
      <h1 className="heading">
        {copy[lang].heading} <span className="text-purple">{copy[lang].highlight} </span>{copy[lang].suffix}
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {mergedExperience.map((card) => (
          <div key={card.id} className={card.className}>
          <Button
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.thumbnail}
                width={128}
                height={128}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.title}
                  </h1>
                  {card.isCurrent ? (
                    <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-200">
                      {copy[lang].currentBadge}
                    </span>
                  ) : null}
                </div>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
          </div>
        ))}
      </div>
      </div>
    </ScrollReveal>
  );
};

export default Experience;
