import React from "react";
import { pokemonTypes, typeColorMap } from "../../utils/pokemonTypes";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SearchBar({
  searchTerm,
  onSearchTermChange,
  selectedType,
  onSelectedTypeChange,
}) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
      />
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onSelectedTypeChange("all")}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ${
            selectedType === "all"
              ? "bg-red-500 text-white shadow-lg scale-110"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {pokemonTypes.map((type) => (
          <button
            key={type}
            onClick={() => onSelectedTypeChange(type)}
            className={`px-3 py-1 text-sm font-semibold text-white rounded-full transition-all duration-200 ${
              selectedType === type
                ? `${typeColorMap[type].bg} shadow-lg scale-110`
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {capitalize(type)}
          </button>
        ))}
      </div>
    </div>
  );
}
