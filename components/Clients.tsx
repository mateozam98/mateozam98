"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { companies } from "@/data";
import { LampDemo } from "./ui/Lamp"; // Importa el componente LampDemo
import type { Lang } from "@/lib/i18n";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Clients = ({ lang }: { lang: Lang }) => {
  return (
    <section className="py-5">
      <ScrollReveal variant="fade-right">

      <div className="flex flex-col items-center max-lg:mt-10">
        {/* Reemplaza la sección de testimonios con LampDemo */}
        <LampDemo lang={lang} />

        {/* Mantén la sección de logotipos de empresas */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2 items-center">
                {company.img && company.img !== "/" && (
                  <Image
                    src={company.img}
                    alt={company.name || "company"}
                    width={40}
                    height={40}
                    className="md:w-10 w-5"
                  />
                )}
                {company.nameImg && (
                  <Image
                    src={company.nameImg}
                    alt={company.name || "company name"}
                    width={company.id === 4 || company.id === 5 ? 100 : 150}
                    height={40}
                    className="md:w-24 w-20"
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};

export default Clients;
