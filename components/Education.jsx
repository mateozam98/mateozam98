import React from "react";
import { GlareCard } from "./ui/glare-card"; // Asegúrate de que esta ruta sea correcta

const Education = () => {
  const universities = [
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
  ];

  return (
    <section className="w-full py-5 relative flex items-center justify-center" id="educacion">
      {/* Background Image or Grid */}
      <div className="w-full absolute left-0 -top-72 min-h-96">
        {/* Aquí puedes agregar una imagen de fondo si es necesario */}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="heading lg:text-4xl text-3xl font-bold mb-8">
           Mi experiencia <span className="text-purple">Académica</span>
        </h1>

        <p className="text-justify text-gray-300 md:mt-10 my-5 max-w-2xl mx-auto px-6 text-lg leading-relaxed">
          Profesional de Ecuador con experiencia en administración de bases de datos y desarrollo de software. 
          Especializado en sistemas eficientes y seguros. 
          Amplias habilidades en instalación, configuración y optimización de bases de datos, seguridad y copias de seguridad. 
          Experiencia en programación, desarrollo de aplicaciones y participación en proyectos de software. 
          Enfoque en optimización de rendimiento, soporte técnico y resolución de problemas. 
          Constantemente actualizado en tendencias tecnológicas y listo para enfrentar nuevos desafíos en tecnología.
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
    </section>
  );
};

export default Education;
