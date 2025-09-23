import { FaGithub, FaLaptopCode } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

import "./cardAuthor.css";
export default function CardAuthor({ name, social, photo }) {
  return (
    <section className="cardSection  rounded-xl border-1 h-[300px] w-[250px] flex items-center justify-center gap-2 flex-col">
      <img
        src={photo}
        className="w-[120px] h-[120px] rounded-[50%]"
        alt={`Foto do dev ${name}`}
      />
      <h1 className="text-2xl">{name}</h1>

      <div className="iconsContainer flex gap-3 rounded-2xl">
        {social.map((social, index) => {
          if (social.name === "Linkedin")
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <CiLinkedin size={35} />
                </span>
              </a>
            );
          if (social.name === "GitHub")
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FaGithub size={35} />
                </span>
              </a>
            );
          if (social.name === "Portifolio")
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FaLaptopCode size={35} />
                </span>
              </a>
            );
        })}
      </div>
    </section>
  );
}
