import React, { useState } from "react";
import { UserFiltersAdmin } from "@/interfaces/UserFiltersAdmin";
import { Button } from "@/components/ui/Button";

interface Props {
    filters: UserFiltersAdmin;
    onFilterChange: (filters: UserFiltersAdmin) => void;
}

const UserFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
    const [name, setName] = useState(filters.name || "");
    const [status, setStatus] = useState<string>(filters.status === undefined ? "" : (filters.status ? "true" : "false"));
    const [startDate, setStartDate] = useState(filters.startDate || "");
    const [endDate, setEndDate] = useState(filters.endDate || "");

    const applyFilters = () => {
        onFilterChange({
            ...filters,
            name: name.trim() === "" ? undefined : name.trim(),
            status: status === "" ? undefined : status === "true",
            startDate: startDate === "" ? undefined : startDate,
            endDate: endDate === "" ? undefined : endDate,
        });
    };

    return (
        <div className="space-y-4 p-4 border rounded shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">Filtros</h3>

            <div>
                <label className="block mb-1 font-medium">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="Buscar por nombre"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Estado</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                >
                    <option value="">Todos</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">Fecha registro desde</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Fecha registro hasta</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                />
            </div>

            <Button
                className="w-full bg-black hover:bg-gray-800 text-white py-2 mt-2"
                onClick={applyFilters}
            >
                Aplicar Filtros
            </Button>

        </div>
    );
};

export default UserFilters;
