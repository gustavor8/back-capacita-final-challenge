import CardAuthor from "../../components/cardAuthor/cardAuthor";
import photo from "../../assets/img/gustaDev.png";
import gabriel from "../../assets/img/gabriel.jpg";
import pedro from "../../assets/img/pedro.jpg";

export default function Contacts() {
  const autores = [
    {
      name: "Gustavo Rodrigues",
      photo: photo,
      social: [
        { name: "Linkedin", url: "https://www.linkedin.com/in/gustavo-r8/" },
        { name: "GitHub", url: "https://github.com/gustavor8/" },
        {
          name: "Portifolio",
          url: "https://portifolio-gamma-sage.vercel.app/",
        },
      ],
    },
    {
      name: "Murad",
      photo:
        "https://i.imgur.com/mwAcO4B.jpeg",
      social: [
        { name: "Linkedin", url: "https://www.linkedin.com/in/muradpontes" },
        { name: "GitHub", url: "https://github.com/muradpontes" },
      ],
    },
    {
      name: "Pedro José",
      photo:
        pedro,
      social: [
        { name: "Linkedin", url: "https://www.linkedin.com/in/pedro-jos%C3%A9-438a45201/" },
        { name: "GitHub", url: "https://github.com/pedrojose1999" },
      ],
    },

    {
      name: "Gabriel Aguiar",
      photo:
        gabriel,
      social: [
        { name: "Linkedin", url: "/contacts" },
        { name: "GitHub", url: "https://github.com/GabrielAgui373" },
      ],
    },
  ];

  return (
    <div className="flex mt-3 justify-center gap-4 flex-wrap">
      {autores.map((autor, index) => (
        <CardAuthor
          key={index}
          name={autor.name}
          social={autor.social}
          photo={autor.photo}
        />
      ))}
    </div>
  );
}
