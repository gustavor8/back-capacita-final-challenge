import React from "react";
import { motion } from "framer-motion";

const typeColorMap = {
  grass: {
    bg: "bg-green-500",
    gradient: "from-green-500/70 via-green-600/40 to-green-700/70",
  },
  fire: {
    bg: "bg-red-500",
    gradient: "from-red-500/70 via-red-600/40 to-red-700/70",
  },
  water: {
    bg: "bg-blue-500",
    gradient: "from-blue-400/70 via-blue-500/40 to-blue-600/70",
  },
  bug: {
    bg: "bg-lime-500",
    gradient: "from-lime-400/70 via-lime-500/40 to-lime-600/70",
  },
  normal: {
    bg: "bg-gray-400",
    gradient: "from-gray-400/70 via-gray-500/40 to-gray-600/70",
  },
  poison: {
    bg: "bg-purple-600",
    gradient: "from-purple-500/70 via-purple-600/40 to-purple-700/70",
  },
  electric: {
    bg: "bg-yellow-400",
    gradient: "from-yellow-300/70 via-yellow-400/40 to-yellow-500/70",
  },
  ground: {
    bg: "bg-amber-700",
    gradient: "from-amber-600/70 via-amber-700/40 to-amber-800/70",
  },
  fairy: {
    bg: "bg-pink-400",
    gradient: "from-pink-300/70 via-pink-400/40 to-pink-500/70",
  },
  fighting: {
    bg: "bg-orange-700",
    gradient: "from-orange-600/70 via-orange-700/40 to-orange-800/70",
  },
  psychic: {
    bg: "bg-pink-600",
    gradient: "from-pink-500/70 via-pink-600/40 to-pink-700/70",
  },
  rock: {
    bg: "bg-stone-500",
    gradient: "from-stone-500/70 via-stone-600/40 to-stone-700/70",
  },
  ghost: {
    bg: "bg-indigo-800",
    gradient: "from-indigo-600/70 via-indigo-700/40 to-indigo-800/70",
  },
  ice: {
    bg: "bg-cyan-300",
    gradient: "from-cyan-300/70 via-cyan-400/40 to-cyan-500/70",
  },
  dragon: {
    bg: "bg-violet-700",
    gradient: "from-violet-600/70 via-violet-700/40 to-violet-800/70",
  },
  dark: {
    bg: "bg-zinc-800",
    gradient: "from-zinc-700/70 via-zinc-800/40 to-zinc-900/70",
  },
  steel: {
    bg: "bg-slate-500",
    gradient: "from-slate-400/70 via-slate-500/40 to-slate-600/70",
  },
  flying: {
    bg: "bg-sky-400",
    gradient: "from-sky-400/70 via-sky-500/40 to-sky-600/70",
  },
};

const StatBar = ({ stat, colorClass }) => (
  <div className="w-full">
    <div className="flex justify-between text-sm font-semibold text-white/80">
      <span>{stat.name}</span>
      <span>{stat.value}</span>
    </div>
    <div className="w-full bg-black/20 rounded-full h-2.5">
      <motion.div
        className={`${colorClass} h-2.5 rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${(stat.value / 255) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const primaryType = pokemon.types[0];
  const colors = typeColorMap[primaryType] || typeColorMap.normal;

  const capitalize = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-2xl text-white border-4 border-white/20`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl font-bold text-white/80 hover:text-white transition-colors"
        >
          &times;
        </button>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={pokemon.animatedSprite || pokemon.image}
                alt={`Sprite de ${pokemon.name}`}
                className="w-40 h-40 drop-shadow-lg"
              />
              <h2 className="text-3xl font-bold text-center capitalize">
                {pokemon.name}
              </h2>
              <p className="font-mono text-center text-white/70">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
            </div>

            <div className="w-full space-y-4">
              <p className="text-center md:text-left text-sm italic text-white/90">
                {pokemon.flavorText}
              </p>
              <div className="flex justify-center md:justify-start gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 text-sm rounded-full font-semibold shadow-md ${
                      typeColorMap[type]?.bg || "bg-gray-500"
                    }`}
                  >
                    {capitalize(type)}
                  </span>
                ))}
              </div>
              <div className="flex justify-around text-center">
                <div>
                  <p className="font-bold text-xl">{pokemon.height} m</p>
                  <p className="text-xs text-white/70">Altura</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{pokemon.weight} kg</p>
                  <p className="text-xs text-white/70">Peso</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2 text-center">
              Estatísticas Base
            </h3>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <StatBar key={stat.name} stat={stat} colorClass={colors.bg} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonModal;
