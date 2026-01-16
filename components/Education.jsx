"use client";

import React from "react";
import { GlareCard } from "./ui/glare-card"; // Asegúrate de que esta ruta sea correcta
import ScrollReveal from "@/components/ui/ScrollReveal";

const copy = {
  es: {
    heading: "Mi experiencia",
    highlight: "Académica",
    summary:
      "Profesional de Ecuador con experiencia en administración de bases de datos y desarrollo de software. Especializado en sistemas eficientes y seguros. Amplias habilidades en instalación, configuración y optimización de bases de datos, seguridad y copias de seguridad. Experiencia en programación, desarrollo de aplicaciones y participación en proyectos de software. Enfoque en optimización de rendimiento, soporte técnico y resolución de problemas. Constantemente actualizado en tendencias tecnológicas y listo para enfrentar nuevos desafíos en tecnología.",
    universities: [
      {
        id: 1,
        name: "Universidad Politécnica de Valencia",
        degree: "Master en Ciberseguridad y Ciberinteligencia",
        duration: "2023 - 2024",
        description:
          "Estudié un máster en Ciberseguridad en la UPV, donde me especialicé en técnicas avanzadas de protección de datos, gestión de riesgos y estrategias para prevenir y responder a ciberamenazas.",
        imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      },
      {
        id: 2,
        name: "Pontificia Universidad Católica del Ecuador",
        degree: "Ingeniería en Sistemas y Computación",
        duration: "2016 - 2021",
        description:
          "Estudié un grado en la PUCE, donde adquirí habilidades en programación, desarrollo de software y tecnología avanzada.",
        imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      },
    ],
  },
  en: {
    heading: "My",
    highlight: "Academic",
    summary:
      "Professional from Ecuador with experience in database administration and software development. Specialized in secure, efficient systems with strong skills in installation, configuration, optimization, security, and backups. Experienced in programming, application development, and software projects, focused on performance optimization, support, and troubleshooting. Continuously updated on tech trends and ready for new challenges.",
    universities: [
      {
        id: 1,
        name: "Polytechnic University of Valencia",
        degree: "MSc in Cybersecurity & Cyber Intelligence",
        duration: "2023 - 2024",
        description:
          "Completed a master's in Cybersecurity at UPV, specializing in advanced data protection, risk management, and strategies to prevent and respond to cyber threats.",
        imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      },
      {
        id: 2,
        name: "Pontifical Catholic University of Ecuador",
        degree: "BSc in Systems & Computer Engineering",
        duration: "2016 - 2021",
        description:
          "Completed a bachelor's degree at PUCE, gaining skills in programming, software development, and advanced technology.",
        imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      },
    ],
  },
};

const Education = ({ lang = "es" }) => {
  const content = copy[lang] ?? copy.es;
  const universities = content.universities;

  return (
    <section className="w-full py-5 relative flex items-center justify-center" id="educacion">
      <ScrollReveal variant="fade-up">
      {/* Background Image or Grid */}
      <div className="w-full absolute left-0 -top-72 min-h-96">
        {/* Aquí puedes agregar una imagen de fondo si es necesario */}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="heading lg:text-4xl text-3xl font-bold mb-8">
          {content.heading} <span className="text-purple">{content.highlight}</span>
        </h1>

        <p className="text-justify text-gray-300 md:mt-10 my-5 max-w-2xl mx-auto px-6 text-lg leading-relaxed">
          {content.summary}
        </p>

        <div className="flex flex-wrap justify-center mt-16 gap-6">
          {universities.map((university) => (
            <GlareCard
              key={university.id}
              className="flex flex-col items-center justify-center w-full md:w-[30vw] p-6 transition-transform transform hover:scale-105"
            >
              {/* <img
                src={university.imageUrl}
                alt={university.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              /> */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {university.name}
                </h3>
                <p className="text-lg text-purple mb-2">{university.degree}</p>
                <p className="text-sm text-gray-400 mb-2">
                  {university.duration}
                </p>
                <p className="text-sm text-neutral-300">
                  {university.description}
                </p>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};

export default Education;
