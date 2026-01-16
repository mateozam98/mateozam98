import type { Lang } from "@/lib/i18n";

const navItemsByLang: Record<Lang, { name: string; link: string }[]> = {
  es: [
    { name: "Inicio", link: "#inicio" },
    { name: "Sobre mi", link: "#sobre" },
    { name: "Proyectos", link: "#proyectos" },
    { name: "Educación", link: "#educacion" },
    { name: "Contacto", link: "#contacto" },
  ],
  en: [
    { name: "Home", link: "#inicio" },
    { name: "About", link: "#sobre" },
    { name: "Projects", link: "#proyectos" },
    { name: "Education", link: "#educacion" },
    { name: "Contact", link: "#contacto" },
  ],
};

export const getNavItems = (lang: Lang) => navItemsByLang[lang];

type GridItem = {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img: string;
  spareImg: string;
};

const gridItemsByLang: Record<Lang, GridItem[]> = {
  es: [
    {
      id: 1,
      title: "Creo que el trabajo en equipo es clave para lograr los mejores resultados",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "Estoy acostumbrado a trabajar con equipos en diferentes zonas horarias ",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "Mis habilidades tecnologicas",
      description: "Intento aprender constantemente",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Apasionado por la tecnología con un fuerte deseo de innovar",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
    {
      id: 5,
      title: "Actualmente he desarrollado +150 proyectos   ",
      description: "La clave del éxito, constancia",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "¿Quieres contactarte conmigo?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ],
  en: [
    {
      id: 1,
      title: "I believe teamwork is key to achieving the best results",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm used to working with teams across different time zones",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My technical skills",
      description: "I keep learning continuously",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Passionate about technology with a strong drive to innovate",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
    {
      id: 5,
      title: "I've built 150+ projects",
      description: "Consistency is the key to success",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Want to get in touch with me?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ],
};

export const getGridItems = (lang: Lang) => gridItemsByLang[lang];

export type ProjectCategoryKey = "all" | "development" | "data" | "security";

const projectCategoryLabels: Record<Lang, Record<ProjectCategoryKey, string>> = {
  es: {
    all: "Todos",
    development: "Desarrollo",
    data: "Análisis de Datos",
    security: "Ciberseguridad",
  },
  en: {
    all: "All",
    development: "Development",
    data: "Data Analytics",
    security: "Cybersecurity",
  },
};

export const getProjectCategories = (lang: Lang) => {
  const labels = projectCategoryLabels[lang];
  return (Object.keys(labels) as ProjectCategoryKey[]).map((key) => ({
    key,
    label: labels[key],
  }));
};

type ProjectBase = {
  id: number;
  title: string;
  titleEn: string;
  des: string;
  desEn: string;
  img: string;
  iconLists: string[];
  link: string;
  categoryKey: ProjectCategoryKey;
};

const projectsBase: ProjectBase[] = [
  {
    id: 1,
    title: "ROCK & PUNK FESTIVAL ",
    titleEn: "ROCK & PUNK FESTIVAL",
    des: "Página web: HTML5, CSS3, JavaScript, SASS, Node JS para un festival de musica Rock & Punk en Quito - Ecuador 2022.",
    desEn: "Website built with HTML5, CSS3, JavaScript, SASS, and Node.js for a Rock & Punk festival in Quito, Ecuador (2022).",
    img: "/work1.svg",
    iconLists: ["/html.svg", "/css.svg","/js.svg", "/nodejs.svg", "/sass.svg", "/fm.svg"],
    link: "https://festivalmusical-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 2,
    title: "App Peluqueria",
    titleEn: "Hair Salon App",
    des: "Página web HTML5, CSS3, JavaScript, SASS ejemplo para una peluquería funcionalidad de paginado y calendario",
    desEn: "HTML5, CSS3, JavaScript, and SASS website for a hair salon with pagination and calendar features.",
    img: "/work2.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://appsalon-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 3,
    title: "Matemáticas para todos - Videjuego infantil 2D",
    titleEn: "Math for Everyone - 2D kids game",
    des: "Un videojuego para enseñar matemáticas a niños de 8 a 12 años, motor de videojuegos Godot.",
    desEn: "A game to teach math to children aged 8–12, built with the Godot game engine.",
    img: "/work3.svg",
    iconLists: ["/godot.svg", "/html.svg", "/css.svg"],
    link: "https://mateozam98.itch.io/matematicas-para-todos",
    categoryKey: "development",
  },
  {
    id: 4,
    title: "Bienes raices - Venta de casas",
    titleEn: "Real Estate - Home sales",
    des: "Página web para empresa de bienes raices bienes raices desarrollado con HTML5, CSS3, JavaScript, PHP, Node JS",
    desEn: "Website for a real estate company built with HTML5, CSS3, JavaScript, PHP, and Node.js.",
    img: "/work4.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/php.svg", "/sass.svg"],
    link: "https://bienesraices-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 5,
    title: "Proyecto envió de clima en el móvil por SMS y Whatsapp",
    titleEn: "Weather alerts by SMS & WhatsApp",
    des: "Proyecto de análisis de datos, consumiendo API de clima para enviar cada día el pronostico de lluvia al movil, creando una instancia en EC2 de AWS con Python, Twilio, API Weather, AWS EC2",
    desEn: "Data analysis project using a weather API to send daily rain forecasts via SMS/WhatsApp, deployed on AWS EC2 with Python and Twilio.",
    img: "/proj_3.svg",
    iconLists: ["/python.svg", "/twilio.svg", "/aws.svg", "/jupyter.svg", "/sass.svg", "/wha.svg"],
    link: "https://github.com/mateozam98/twilio-weatherapi_aws",
    categoryKey: "data",
  },
  {
    id: 6,
    title: "Airbnb-clone",
    titleEn: "Airbnb clone",
    des: "Un clón de la pagina de airbnb.. Desarrollado con: HTML, CSS, SASS, JS, Node JS",
    desEn: "An Airbnb clone built with HTML, CSS, SASS, JavaScript, and Node.js.",
    img: "/image1.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://air-bnb-clone-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 7,
    title: "Meeti clone",
    titleEn: "Meeti clone",
    des: "Un clón de la pagina de meeti.. Desarrollado con: HTML, CSS, SASS, JS, Node JS",
    desEn: "A Meeti clone built with HTML, CSS, SASS, JavaScript, and Node.js.",
    img: "/image2.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://meeti-clone-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 8,
    title: "App Comidas Delivery",
    titleEn: "Food delivery app",
    des: "Una app de un proyecto para entrega de comida a domicilio.. Desarrollado con: HTML, CSS, SASS, JS, Node JS",
    desEn: "A food delivery web app built with HTML, CSS, SASS, JavaScript, and Node.js.",
    img: "/image3.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://appcomida-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 9,
    title: "Techpro - proyecto audífonos",
    titleEn: "Techpro - Headphones project",
    des: "Un proyecto de un sitio web de audífonos.. Desarrollado con: HTML, CSS, SASS, JS, Node JS",
    desEn: "Headphones website project built with HTML, CSS, SASS, JavaScript, and Node.js.",
    img: "/imagen4.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://techpro-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 10,
    title: "Real State - Venta de casas exclusivas",
    titleEn: "Real Estate - Luxury homes",
    des: "Un sitio web para casas de lujo. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Luxury real estate website built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen5.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://realstate-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 11,
    title: "La cafeteria",
    titleEn: "Coffee shop website",
    des: "Un sitio para una cafeteria con menú. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Coffee shop website with menu built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen6.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://lacafeteria-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 12,
    title: "Carolina Spa",
    titleEn: "Carolina Spa",
    des: "Un sitio web para un Spa con slider en 3d. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Spa website with 3D slider built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen10.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://carolinaspa-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 13,
    title: "Arquitectura estilo - vintage",
    titleEn: "Vintage architecture",
    des: "Un sitio web para arquitectura y venta de cabañas. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Architecture and cabin sales website built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen7.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://arquitectura-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 14,
    title: "Tienda de guitarras y música",
    titleEn: "Guitar & music store",
    des: "Un sitio web para venta de guitarras y accesorios de música. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Guitar and music accessories store built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen8.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://guitarla-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 15,
    title: "Pasarela de Pago - Pay Nucleus",
    titleEn: "Payment gateway - Pay Nucleus",
    des: "Un sitio web para metodo de pasarela de pagos. Desarrollado con: HTML, CSS, SCSS, JS, Node JS",
    desEn: "Payment gateway website built with HTML, CSS, SCSS, JavaScript, and Node.js.",
    img: "/imagen9.svg",
    iconLists: ["/html.svg", "/css.svg", "/js.svg", "/nodejs.svg", "/sass.svg"],
    link: "https://nucleus-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 16,
    title: "Cotizador de Criptomoneadas - ReactJS",
    titleEn: "Crypto price tracker - React",
    des: "Un sitio web para cotizar criptomoneadas del varios paises. Desarrollado con: ReactJS, Typescript, API'S de cripto monedas, REST API, Node JS y TailwindCSS",
    desEn: "Crypto price tracker for multiple countries built with React, TypeScript, crypto APIs, REST API, Node.js, and TailwindCSS.",
    img: "/imagen11.svg",
    iconLists: ["/re.svg", "/ts.svg", "/nodejs.svg", "/tail.svg"],
    link: "https://cotizador-cripto-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 17,
    title: "Seguimiento de pacientes- Veterinaria APP",
    titleEn: "Patient tracking - Vet App",
    des: "Un sitio web para seguimiento de pacientes de un centro de veterinaria. Desarrollado con: ReactJS, Typescript, Localstorage, Node JS, TailwindCSS",
    desEn: "Patient tracking web app for a veterinary center built with React, TypeScript, LocalStorage, Node.js, and TailwindCSS.",
    img: "/imagen12.svg",
    iconLists: ["/re.svg", "/ts.svg", "/nodejs.svg", "/tail.svg"],
    link: "https://admin-veterinaria-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 18,
    title: "Buscador de clima app",
    titleEn: "Weather search app",
    des: "Un sitio web para buscar el clima en varios países con recomendacion de ciudades consumiendo una API de clima. Desarrollado con: ReactJS, Typescript, API'S de clima, REST API, Node JS y TailwindCSS",
    desEn: "Weather search app for multiple countries with city recommendations, built with React, TypeScript, weather APIs, REST API, Node.js, and TailwindCSS.",
    img: "/imagen13.svg",
    iconLists: ["/re.svg", "/ts.svg", "/nodejs.svg", "/tail.svg"],
    link: "https://clima-app-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 19,
    title: "Cócteles - Cocktail APP",
    titleEn: "Cocktails app",
    des: "Un sitio web para consultar una base de datos de cócteles y otro tipo de bebidas consumiendo una API.  Desarrollado con: ReactJS, Typescript, Node JS, TailwindCSS",
    desEn: "Cocktails and drinks database app built with React, TypeScript, Node.js, and TailwindCSS.",
    img: "/imagen14.svg",
    iconLists: ["/re.svg", "/ts.svg", "/nodejs.svg", "/tail.svg"],
    link: "https://cocktail-app-mz.netlify.app/",
    categoryKey: "development",
  },
  {
    id: 20,
    title: "Uptask - Tareas",
    titleEn: "Uptask - Team tasks",
    des: "Organizador de tareas para equipos de trabajo, un proyecto separado por Backend en Nodejs con Express y Frontend en React JS junto con Vite js, la base de datos MongoDB esta en un repositorio gratuito.  Desarrollado con: ReactJS, Typescript, Node JS, TailwindCSS, MongoDB, Mongoose, Express, Nodejs",
    desEn: "Task organizer for teams with Node.js/Express backend and React/Vite frontend using MongoDB. Built with React, TypeScript, Node.js, TailwindCSS, MongoDB, Mongoose, and Express.",
    img: "/imagen15.svg",
    iconLists: ["/re.svg", "/ts.svg", "/vite.svg", "/nodejs.svg","/tail.svg", "/mongo.svg"],
    link: "https://uptask-frontend-mz.vercel.app/",
    categoryKey: "development",
  },
  {
    id: 21,
    title: "Pipeline de YouTube con AWS Lambda, S3 y Athena",
    titleEn: "YouTube pipeline with AWS Lambda, S3 and Athena",
    des: "El proyecto es una solución automatizada para la ingesta y procesamiento diario de datos desde la API de YouTube hacia AWS. Utiliza AWS Lambda para ejecutar un script en Python que extrae datos de YouTube, los formatea y los almacena como archivos CSV en Amazon S3. Luego, AWS Glue realiza el procesamiento ETL (Extracción, Transformación y Carga) para preparar los datos, los cuales se pueden consultar mediante AWS Athena para análisis más profundos.",
    desEn: "Automated pipeline to ingest and process daily YouTube API data in AWS. Uses AWS Lambda (Python) to fetch and format data, stores CSVs in S3, and runs ETL with AWS Glue for analysis in Athena.",
    img: "/imagen16.svg",
    iconLists: ["/python.svg", "/youtube.svg", "/aws.svg", "/jupyter.svg"],
    link: "https://github.com/mateozam98/youtube-aws-etl-pipeline",
    categoryKey: "data",
  }
];

export const getProjects = (lang: Lang) => {
  const labels = projectCategoryLabels[lang];
  return projectsBase.map((project) => ({
    ...project,
    title: lang === "es" ? project.title : project.titleEn,
    des: lang === "es" ? project.des : project.desEn,
    category: labels[project.categoryKey],
    categoryLabel: labels[project.categoryKey],
  }));
};

export const getProjectsSeedPayload = () =>
  projectsBase.map((project) => ({
    titleEs: project.title,
    titleEn: project.titleEn,
    descEs: project.des,
    descEn: project.desEn,
    link: project.link,
    image: project.img,
    categoryKey: project.categoryKey,
    iconLists: project.iconLists,
    createdAt: Date.now(),
  }));

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner",
    name: "Luis Cordova",
    title: "Gestor del área de desarrollo de Ecuadom",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Angelo Benavidez",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies = [
  {
    id: 1,
    name: "",
    img: "",
    nameImg: "/oracle.svg",
  },
  {
    id: 2,
    name: "",
    img: "",
    nameImg: "/sqlserver.svg",
  },
  {
    id: 3,
    name: "",
    img: "/",
    nameImg: "/reactjs.svg",
  },
  {
    id: 4,
    name: "",
    img: "",
    nameImg: "/laravel.svg",
  },
  {
    id: 5,
    name: "",
    img: "",
    nameImg: "/php.svg",
  },
  {
    id: 6,
    name: "",
    img: "",
    nameImg: "/nodejs.svg",
  }
];

const workExperienceBase = [
  {
    id: 1,
    title: "Becario en el área de software - Stadler Rail Valencia",
    titleEn: "Software intern - Stadler Rail Valencia",
    desc: "Experiencia en el desarrollo de sistemas de telemetría web y de escritorio utilizando Java, C# y Python, bases de datos Oracle. - Realización de TFM sobre montar un SIEM en la empresa para los sistemas de trenes.",
    descEn:
      "Experience building web and desktop telemetry systems using Java, C#, Python, and Oracle databases. Master's thesis on deploying a SIEM for train systems.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Administrador de Bases de datos - PUCE",
    titleEn: "Database Administrator - PUCE",
    desc: "Manejo de herramientas de administración de bases de datos. Monitoreo y ajuste de recursos del sistema. Optimización del rendimiento de las bases de datos. Resolución de problemas y solución de incidencias. Mantenimiento y actualización de la documentación relacionada con las bases de datos.",
    descEn:
      "Database administration, system resource monitoring and tuning, performance optimization, issue resolution, and documentation updates.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Desarrollador Fullstack en apps web y moviles- Ecuadom",
    titleEn: "Fullstack developer for web & mobile - Ecuadom",
    desc: "Dominio de lenguajes de programación: Experiencia en lenguajes web como HTML, CSS, JavaScript, y frameworks com Laravel, React, Node Js, para movil Flutter, manejo de bases de datos Mongo DB. Control de versiones con Git y pruebas con Cypress",
    descEn:
      "Proficient in HTML, CSS, JavaScript, Laravel, React, Node.js, Flutter, and MongoDB. Version control with Git and testing with Cypress.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Desarrollador Freelancer de aplicaciones web - Remotamente",
    titleEn: "Freelance web developer - Remote",
    desc: "Funciones desarrolladas y mantenidas para el usuario utilizando tecnologías frontend modernas, Wordpress, PHP, Mysql, Node Js, React Js, Python, Django.",
    descEn:
      "Delivered and maintained user-facing features using modern frontend, WordPress, PHP, MySQL, Node.js, React, Python, and Django.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const getWorkExperience = (lang: Lang) =>
  workExperienceBase.map((card) => ({
    ...card,
    title: lang === "es" ? card.title : card.titleEn,
    desc: lang === "es" ? card.desc : card.descEn,
  }));

const whatsappPhone = "+34670652894";

const whatsappMessages: Record<Lang, string> = {
  es: "Hola Mateo, me gustaría contactar contigo. Saludos.",
  en: "Hi Mateo, I'd like to get in touch with you. Best regards.",
};

const socialMediaBase = [
  {
    id: 1,
    img: "/wha.svg",
    url: "",
  },
  {
    id: 2,
    img: "/git.svg",
    url: "https://github.com/mateozam98",
  },
  {
    id: 3,
    img: "/twit.svg",
    url: "https://x.com/mzambrano98",
  },
  {
    id: 4,
    img: "/link.svg",
    url: "https://www.linkedin.com/in/mateo-zambrano-andrade/ ",
  },
];

export const getSocialMedia = (lang: Lang) => {
  const message = encodeURIComponent(whatsappMessages[lang]);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${message}`;
  return socialMediaBase.map((item) =>
    item.id === 1 ? { ...item, url: whatsappUrl } : item,
  );
};
