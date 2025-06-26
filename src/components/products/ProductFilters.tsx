interface ProductFiltersProps {
  filters: {
    category: string;
    brand: string;
    condition: string;
    minPrice: string | number;
    maxPrice: string | number;
    sort: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
}

const conditions = ["", "Nuevo", "Usado", "Reacondicionado"]; // "" para opción vacía

const sortOptions = [
  { label: "Por defecto", value: "" },
  { label: "Precio Ascendente", value: "price_asc" },
  { label: "Precio Descendente", value: "price_desc" },
  { label: "Alfabético Ascendente", value: "name_asc" },
  { label: "Alfabético Descendente", value: "name_desc" },
];

export function ProductFilters({ filters, onFilterChange, onApplyFilters }: ProductFiltersProps) {
  return (
    <aside className="w-64 bg-white p-4 rounded shadow space-y-6 sticky top-20 h-fit">
      <h2 className="font-semibold text-lg mb-2">Filtros</h2>

      <div>
        <label className="block font-medium mb-1">Categoría</label>
        <input
          type="text"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          placeholder="Ej: Games, Shoes..."
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Marca</label>
        <input
          type="text"
          value={filters.brand}
          onChange={(e) => onFilterChange("brand", e.target.value)}
          placeholder="Ej: Nike, Samsung..."
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Estado</label>
        <select
          value={filters.condition}
          onChange={(e) => onFilterChange("condition", e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {conditions.map((c) => (
            <option key={c} value={c}>
              {c === "" ? "Todos" : c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Precio Mínimo (CLP)</label>
        <input
          type="number"
          min={0}
          value={filters.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Precio Máximo (CLP)</label>
        <input
          type="number"
          min={0}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Ordenar por</label>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onApplyFilters}
        className="mt-4 w-full bg-primary text-white font-semibold py-2 rounded hover:bg-primary/90 transition"
      >
        Aplicar filtros
      </button>
    </aside>
  );
}
