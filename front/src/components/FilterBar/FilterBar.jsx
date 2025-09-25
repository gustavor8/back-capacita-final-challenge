const FilterButton = ({ label, isActive, ...props }) => {
  const activeClasses = "bg-red-600 text-white";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
        isActive ? activeClasses : inactiveClasses
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex justify-center items-center p-4 space-x-4">
      <FilterButton
        label="Mostrar Todos"
        isActive={activeFilter === "all"}
        onClick={() => onFilterChange("all")}
      />
      <FilterButton
        label="Meus Favoritos"
        isActive={activeFilter === "favorites"}
        onClick={() => onFilterChange("favorites")}
      />
    </div>
  );
};

export default FilterBar;
