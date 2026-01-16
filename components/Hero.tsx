"use client";

import { FaLocationArrow } from "react-icons/fa";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./MagicButton";
import type { Lang } from "@/lib/i18n";
import ScrollReveal from "@/components/ui/ScrollReveal";

const copy: Record<Lang, {
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
}> = {
  es: {
    tag: "Experto en Ciberseguridad, Datos y Desarrollo Web y móvil",
    title:
      "Arquitecto de soluciones digitales con un fuerte enfoque en seguridad y manejo de datos",
    subtitle:
      "Soy Mateo Zambrano Msc. Ciberseguridad | Ingeniero de datos | Desarrollador Fullstack de Ecuador que reside en España",
    cta: "Conoce mis proyectos",
  },
  en: {
    tag: "Expert in Cybersecurity, Data & Web/Mobile Development",
    title:
      "Digital solutions architect with a strong focus on security and data management",
    subtitle:
      "I'm Mateo Zambrano Msc. Cybersecurity | Data Engineer | Fullstack Developer from Ecuador living in Spain",
    cta: "See my projects",
  },
};

const Hero = ({ lang }: { lang: Lang }) => {
  const content = copy[lang];
  return (
    <div id="inicio" className="pb-20 pt-36 relative min-h-screen" >
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-full w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.03]
       absolute inset-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <ScrollReveal variant="float">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            {content.tag}
            </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          { <TextGenerateEffect
            words={content.title}
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          /> }

            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              {content.subtitle}
            </p>

            <a href="#proyectos">
              { <MagicButton
                title={content.cta}
                icon={<FaLocationArrow />}
                position="right"
              /> }
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Hero;
