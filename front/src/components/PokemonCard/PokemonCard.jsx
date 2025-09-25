import React, { memo } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const typeColorMap = {
  grass: "from-green-400 to-green-600",
  fire: "from-red-500 to-red-700",
  water: "from-blue-400 to-blue-600",
  bug: "from-lime-400 to-lime-600",
  normal: "from-gray-400 to-gray-500",
  poison: "from-purple-500 to-purple-700",
  electric: "from-yellow-400 to-yellow-500",
  ground: "from-amber-600 to-amber-800",
  fairy: "from-pink-300 to-pink-500",
  fighting: "from-orange-600 to-orange-800",
  psychic: "from-pink-500 to-pink-700",
  rock: "from-stone-500 to-stone-700",
  ghost: "from-indigo-600 to-indigo-800",
  ice: "from-cyan-300 to-cyan-500",
  dragon: "from-violet-600 to-violet-800",
  dark: "from-zinc-700 to-zinc-900",
  steel: "from-slate-400 to-slate-600",
  flying: "from-sky-400 to-sky-600",
};

const FavoriteIcon = ({ isFavorite, ...props }) => (
  <motion.div
    whileTap={{ scale: 1.4 }}
    className="absolute top-3 right-3 cursor-pointer z-10"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill={isFavorite ? "#FFD700" : "none"}
      stroke={isFavorite ? "#FFD700" : "white"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-lg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
  </motion.div>
);

const PokemonCard = ({
  pokemon,
  isFavorite,
  onFavoriteToggle,
  onCardClick,
}) => {
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const primaryType = pokemon.types[0];
  const bgColor = typeColorMap[primaryType] || "from-gray-400 to-gray-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onCardClick}
      className={`relative flex flex-col items-center p-4 rounded-xl shadow-lg text-white bg-gradient-to-br ${bgColor} cursor-pointer`}
    >
      <FavoriteIcon
        isFavorite={isFavorite}
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(pokemon.id, !isFavorite);
        }}
      />
      <motion.div
        whileHover={{ scale: 1.1, y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-32 h-32 flex items-center justify-center"
      >
        <LazyLoadImage
          alt={`Imagem de ${pokemon.name}`}
          src={pokemon.image}
          effect="blur"
          width="100%"
          height="100%"
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>
      <h3 className="mt-2 text-xl font-bold capitalize text-shadow">
        {pokemon.name}
      </h3>
      <p className="font-mono text-sm text-white/70">{formattedId}</p>
    </motion.div>
  );
};

export default memo(PokemonCard);
