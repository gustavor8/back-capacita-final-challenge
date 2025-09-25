import { motion, AnimatePresence } from "framer-motion";

const typeColorMap = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  normal: "bg-gray-400",
  poison: "bg-purple-600",
  electric: "bg-yellow-400",
  ground: "bg-amber-700",
  fairy: "bg-pink-400",
  fighting: "bg-orange-700",
  psychic: "bg-pink-600",
  rock: "bg-stone-500",
  ghost: "bg-indigo-800",
  ice: "bg-cyan-300",
  dragon: "bg-violet-700",
  dark: "bg-zinc-800",
  steel: "bg-slate-500",
  flying: "bg-sky-400",
};

const StatBar = ({ stat }) => (
  <div className="w-full">
    <div className="flex justify-between text-sm font-semibold text-white/80">
      <span>{stat.name}</span>
      <span>{stat.value}</span>
    </div>
    <div className="w-full bg-gray-600 rounded-full h-2.5">
      <motion.div
        className="bg-green-500 h-2.5 rounded-full"
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
  const bgColor =
    typeColorMap[primaryType]?.replace("bg-", "from-") || "from-gray-500";
  const bgColorTo =
    typeColorMap[primaryType]?.replace("bg-", "to-") || "to-gray-700";

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
        className={`relative w-full max-w-lg rounded-2xl bg-gradient-to-br ${bgColor} ${bgColorTo} shadow-2xl text-white border-4 border-white/20`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl font-bold"
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
              <h2 className="text-3xl font-bold text-center">{pokemon.name}</h2>
              <p className="font-mono text-center text-white/70">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
            </div>

            <div className="w-full space-y-4">
              <p className="text-center md:text-left text-sm italic">
                {pokemon.flavorText}
              </p>
              <div className="flex justify-center md:justify-start gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${typeColorMap[type]}`}
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
                <StatBar key={stat.name} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonModal;

const capitalize = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
