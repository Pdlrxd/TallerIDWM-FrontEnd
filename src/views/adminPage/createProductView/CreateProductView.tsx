"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";  // <-- Importar useRouter
import { useAdmin, CreateProductForm } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<keyof CreateProductForm, string>>;

export function CreateProductView() {
    const router = useRouter();  // <-- Inicializar router
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        createProductForm,
        loadingCreate,
        conditions,
        handleCreateChange,
        handleCreateFileChange,
        clearImageFile,
        createProduct,
    } = useAdmin();

    const [errors, setErrors] = useState<Errors>({});

    const validateForm = (): Errors => {
        const newErrors: Errors = {};

        if (!createProductForm.title.trim()) newErrors.title = "El título es obligatorio";
        if (!createProductForm.condition) newErrors.condition = "La condición es obligatoria";
        if (!createProductForm.imageFile) newErrors.imageFile = "La imagen es obligatoria";

        // Validar que price sea número válido y no negativo
        if (createProductForm.price.trim() === "") {
            newErrors.price = "El precio es obligatorio";
        } else if (isNaN(Number(createProductForm.price))) {
            newErrors.price = "El precio debe ser un número válido";
        } else if (Number(createProductForm.price) < 0) {
            newErrors.price = "El precio no puede ser negativo";
        }

        // Validar que stock sea número válido y no negativo
        if (createProductForm.stock.trim() === "") {
            newErrors.stock = "El stock es obligatorio";
        } else if (!Number.isInteger(Number(createProductForm.stock))) {
            newErrors.stock = "El stock debe ser un número entero válido";
        } else if (Number(createProductForm.stock) < 0) {
            newErrors.stock = "El stock no puede ser negativo";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loadingCreate) return;

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const formData = new FormData();
        formData.append("Title", createProductForm.title);
        formData.append("Description", createProductForm.description);
        formData.append("Price", createProductForm.price);
        formData.append("Stock", createProductForm.stock);
        formData.append("Category", createProductForm.category);
        formData.append("Brand", createProductForm.brand);
        formData.append("Condition", createProductForm.condition);

        if (createProductForm.imageFile) {
            formData.append("ImageFile", createProductForm.imageFile);
        }

        console.log("Llamando a createProduct...");
        const success = await createProduct(formData);
        console.log("createProduct terminó con éxito:", success);
        if (success) {
            setErrors({});
            router.push("/admin");  
        }
    };

    const renderError = (field: keyof CreateProductForm) =>
        errors[field] ? <p className="text-red-600 text-sm mt-1">{errors[field]}</p> : null;

    const handleClearImageFile = () => {
        clearImageFile();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl"
                encType="multipart/form-data"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Nuevo Producto</h1>

                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex flex-col flex-1">
                        <label className="block mb-2 font-semibold" htmlFor="title">
                            Título *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className={`w-full p-2 border rounded mb-1 ${errors.title ? "border-red-600" : ""}`}
                            value={createProductForm.title}
                            onChange={handleCreateChange}
                        />
                        {renderError("title")}

                        <label className="block mb-2 font-semibold" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-2 border rounded mb-4"
                            value={createProductForm.description}
                            onChange={handleCreateChange}
                            rows={4}
                        />

                        <label className="block mb-2 font-semibold" htmlFor="category">
                            Categoría
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            className="w-full p-2 border rounded mb-4"
                            value={createProductForm.category}
                            onChange={handleCreateChange}
                        />

                        <label className="block mb-2 font-semibold" htmlFor="brand">
                            Marca
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            className="w-full p-2 border rounded mb-4"
                            value={createProductForm.brand}
                            onChange={handleCreateChange}
                        />
                    </div>

                    <div className="flex flex-col flex-1 mt-6 md:mt-0">
                        <label className="block mb-2 font-semibold" htmlFor="price">
                            Precio
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            className={`w-full p-2 border rounded mb-1 ${errors.price ? "border-red-600" : ""}`}
                            value={createProductForm.price}
                            onChange={handleCreateChange}
                            inputMode="decimal"
                        />
                        {renderError("price")}

                        <label className="block mb-2 font-semibold" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="text"
                            className={`w-full p-2 border rounded mb-1 ${errors.stock ? "border-red-600" : ""}`}
                            value={createProductForm.stock}
                            onChange={handleCreateChange}
                            inputMode="numeric"
                        />
                        {renderError("stock")}

                        <label className="block mb-2 font-semibold" htmlFor="condition">
                            Condición *
                        </label>
                        <select
                            id="condition"
                            name="condition"
                            className={`w-full p-2 border rounded mb-1 ${errors.condition ? "border-red-600" : ""}`}
                            value={createProductForm.condition}
                            onChange={handleCreateChange}
                        >
                            <option value="">Seleccione condición</option>
                            {conditions.map((cond) => (
                                <option key={cond} value={cond}>
                                    {cond}
                                </option>
                            ))}
                        </select>
                        {renderError("condition")}

                        <label className="block mb-2 font-semibold" htmlFor="imageFile">
                            Imagen *
                        </label>

                        <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleCreateFileChange}
                            className="hidden"
                        />

                        <div className="flex items-center space-x-4">
                            <label
                                htmlFor="imageFile"
                                className={`w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition ${errors.imageFile ? "ring-2 ring-red-600" : ""
                                    }`}
                            >
                                <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </label>

                            {createProductForm.imageFile && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700 truncate max-w-[200px]">
                                        {createProductForm.imageFile.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleClearImageFile}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                        {renderError("imageFile")}
                    </div>
                </div>

                <Button type="submit" disabled={loadingCreate} className="w-full mt-6">
                    {loadingCreate ? "Creando..." : "Crear Producto"}
                </Button>
            </form>
        </main>
    );
}
