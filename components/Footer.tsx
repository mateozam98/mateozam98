"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { getSocialMedia } from "@/data";
import MagicButton from "./MagicButton";
import type { Lang } from "@/lib/i18n";
import ScrollReveal from "@/components/ui/ScrollReveal";

const copy = {
  es: {
    heading: "¿Listo para llevar",
    highlight: "tú presencia digital",
    suffix: "al siguiente nivel?",
    body: "Póngase en contacto conmigo y hablemos sobre cómo puedo ayudarte a lograr tus objetivos.",
    cta: "Contactar",
    rights: "Todos los derechos reservados",
  },
  en: {
    heading: "Ready to take",
    highlight: "your digital presence",
    suffix: "to the next level?",
    body: "Get in touch and let’s talk about how I can help you achieve your goals.",
    cta: "Contact",
    rights: "All rights reserved",
  },
} as const;

const Footer = ({ lang }: { lang: Lang }) => {
  const content = copy[lang];
  const year = new Date().getFullYear();
  const socialMedia = getSocialMedia(lang);
  return (
    <footer className="w-full pt-20 pb-10" id="contacto">
      <ScrollReveal variant="fade-up">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          fill
          className="w-full h-full opacity-50 object-cover"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {content.heading} <span className="text-purple">{content.highlight}</span> {content.suffix}
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {content.body}
        </p>
        <a href="mailto:mzambranoandrade@hotmail.com">
          <MagicButton
            title={content.cta}
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {content.rights} © {year} Mateo Zambrano
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.url} // Aquí se utiliza el enlace correspondiente a cada red social
              target="_blank" // Abre el enlace en una nueva pestaña
              rel="noopener noreferrer" // Buenas prácticas de seguridad
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image src={info.img} alt={info.img} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
