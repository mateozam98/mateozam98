import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full pt-20 pb-10" id="contacto">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          ¿Listo para llevar  <span className="text-purple">tú presencia digital</span>  al siguiente nivel?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
        Póngase en contacto conmigo y hablemos sobre cómo puedo ayudarte a lograr tus objetivos.
        </p>
        <a href="mailto:mzambranoandrade@hotmail.com">
          <MagicButton
            title="Contactar"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Todos los derechos reservados © {year} Mateo Zambrano
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
              <img src={info.img} alt={info.img} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
