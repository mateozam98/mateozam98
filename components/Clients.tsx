"use client";

import React from "react";
import { motion } from "framer-motion";
import { companies } from "@/data";
import { LampDemo } from "./ui/Lamp"; // Importa el componente LampDemo

const Clients = () => {
  return (
    <section className="py-5">

      <div className="flex flex-col items-center max-lg:mt-10">
        {/* Reemplaza la sección de testimonios con LampDemo */}
        <LampDemo />

        {/* Mantén la sección de logotipos de empresas */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={company.img}
                  alt={company.name}
                  className="md:w-10 w-5"
                />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
