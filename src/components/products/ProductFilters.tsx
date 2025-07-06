import { useState } from "react";
import { ProductFiltersAdmin } from "@/interfaces/ProductFiltersAdmin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

interface Props {
    filters: ProductFiltersAdmin;
    onFilterChange: (filters: ProductFiltersAdmin) => void;
}

const ProductFiltersComponent = ({ filters, onFilterChange }: Props) => {
    const [localFilters, setLocalFilters] = useState<ProductFiltersAdmin>(filters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setLocalFilters((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value === ""
                        ? undefined
                        : value,
        }));
    };

    const handleApply = () => {
        onFilterChange(localFilters);
    };

    return (
        <div className="space-y-4 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Filtros</h2>

            <Input
                placeholder="Buscar por Título"
                name="Title"
                value={localFilters.Title || ""}
                onChange={handleChange}
            />

            <Input
                placeholder="Categoría"
                name="Category"
                value={localFilters.Category || ""}
                onChange={handleChange}
            />

            <Input
                placeholder="Marca"
                name="Brand"
                value={localFilters.Brand || ""}
                onChange={handleChange}
            />

            <select
                name="Condition"
                value={localFilters.Condition || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
                <option value="Reacondicionado">Reacondicionado</option>
            </select>

            <div className="flex gap-2">
                <Input
                    type="number"
                    placeholder="Precio Mín"
                    name="MinPrice"
                    value={localFilters.MinPrice ?? ""}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    placeholder="Precio Máx"
                    name="MaxPrice"
                    value={localFilters.MaxPrice ?? ""}
                    onChange={handleChange}
                />
            </div>

            <Button className="w-full" onClick={handleApply}>
                Aplicar Filtros
            </Button>
        </div>
    );
};

export default ProductFiltersComponent;
