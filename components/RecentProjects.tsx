"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RecentProjects = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4; // Número de proyectos por página

  const handleClick = (link: string) => {
    router.push(link);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reinicia el paginador a la primera página
  };

  // Filtra los proyectos según la categoría seleccionada
  const filteredProjects = selectedCategory === "Todos"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  // Calcula los índices de los proyectos a mostrar en la página actual
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="py-20" id="proyectos">
      <h1 className="heading pb-10">
        Una pequeña colección de varios{" "}
        <span className="text-purple">proyectos</span>
      </h1>

      {/* Categorías */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        {["Todos", "Desarrollo", "Análisis de Datos", "Ciberseguridad"].map(category => (
          <button
            key={category}
            className={`p-[3px] relative text-sm sm:text-base ${selectedCategory === category ? "bg-opacity-0" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              {category}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-12 gap-y-4 mt-10">
        {currentProjects.map((item) => (
          <div
            key={item.id}
            className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw] mb-4 sm:mb-6"
            onClick={() => handleClick(item.link)}
          >
            <PinContainer
              title={item.title}
              href={item.link}
            >
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <div
                className="lg:text-xl lg:font-normal font-light text-sm"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                  maxHeight: '6rem',  // Ajusta la altura máxima según sea necesario
                  overflowY: 'auto',  // Añade scroll vertical si el contenido excede la altura máxima
                }}
              >
                {item.des}
              </div>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Mirar el sitio en vivo
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Paginador */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="my-auto text-slate-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RecentProjects;
