"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { getProjectCategories, getProjects } from "@/data";
import type { Lang } from "@/lib/i18n";
import { PinContainer } from "./ui/Pin";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const copy = {
  es: {
    heading: "Una pequeña colección de varios",
    highlight: "proyectos",
    viewLive: "Mirar el sitio en vivo",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "de",
  },
  en: {
    heading: "A small collection of",
    highlight: "projects",
    viewLive: "View live site",
    prev: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
  },
} as const;

type RemoteProject = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  link: string;
  image: string;
  categoryKey: string;
  createdAt?: number;
  iconLists?: string[];
};

const RecentProjects = ({ lang }: { lang: Lang }) => {
  const router = useRouter();
  const categories = getProjectCategories(lang);
  const projects = getProjects(lang);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4; // Número de proyectos por página
  const [remoteProjects, setRemoteProjects] = useState<RemoteProject[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (data?.projects && Array.isArray(data.projects)) {
          setRemoteProjects(data.projects);
        }
      } catch {
        setRemoteProjects([]);
      }
    };
    load();
  }, []);

  const mergedProjects = useMemo(() => {
    const mappedRemote = remoteProjects
      .map((item, index) => ({
        id: `remote-${index}`,
        title: lang === "es" ? item.titleEs : item.titleEn,
        des: lang === "es" ? item.descEs : item.descEn,
        img: item.image,
        iconLists: item.iconLists ?? [],
        link: item.link,
        categoryKey: item.categoryKey,
        category: item.categoryKey,
        createdAt: item.createdAt ?? 0,
        isRemote: true,
      }))
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    return [...mappedRemote, ...projects.map((p) => ({ ...p, isRemote: false }))];
  }, [lang, projects, remoteProjects]);

  const newestRemoteId = useMemo(() => {
    const firstRemote = mergedProjects.find((project) => project.isRemote);
    return firstRemote?.id;
  }, [mergedProjects]);

  const handleClick = (link: string) => {
    router.push(link);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reinicia el paginador a la primera página
  };

  // Filtra los proyectos según la categoría seleccionada
  const filteredProjects = selectedCategory === "all"
    ? mergedProjects
    : mergedProjects.filter((project) => project.categoryKey === selectedCategory);

  // Calcula los índices de los proyectos a mostrar en la página actual
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <ScrollReveal variant="fade-up" className="py-20" >
    <div id="proyectos">
      <h1 className="heading pb-10">
        {copy[lang].heading}{" "}
        <span className="text-purple">{copy[lang].highlight}</span>
      </h1>

      {/* Categorías */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`p-[3px] relative text-sm sm:text-base ${selectedCategory === category.key ? "bg-opacity-0" : ""}`}
            onClick={() => handleCategoryChange(category.key)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              {category.label}
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
                  <Image src="/bg.png" alt="bgimg" fill className="object-cover" />
                </div>
                <Image
                  src={item.img}
                  alt="cover"
                  fill
                  className="z-10 absolute bottom-0 object-contain"
                />
              </div>

              <div className="flex items-center gap-2">
                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>
                {item.isRemote && item.id === newestRemoteId ? (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                    {lang === "es" ? "Nuevo" : "New"}
                  </span>
                ) : null}
              </div>

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
                      <Image src={icon} alt="icon5" width={32} height={32} className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    {copy[lang].viewLive}
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
          {copy[lang].prev}
        </button>
        <span className="my-auto text-slate-400">
          {copy[lang].page} {currentPage} {copy[lang].of} {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={currentPage === totalPages}
        >
          {copy[lang].next}
        </button>
      </div>
    </div>
    </ScrollReveal>
  );
};

export default RecentProjects;
