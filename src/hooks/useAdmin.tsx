// useAdmin.ts
import { useState } from "react";
import toast from "react-hot-toast";
import { AdminService } from "@/services/AdminService";
import { useAuth } from "@/hooks/userAuth";

export type CreateProductForm = {
    title: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    brand: string;
    condition: string;
    imageFile: File | null;
};

const conditions = ["Nuevo", "Usado", "Reacondicionado"];

export function useAdmin() {
    const { user } = useAuth();

    const [createProductForm, setCreateProductForm] = useState<CreateProductForm>({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        condition: "",
        imageFile: null,
    });
    const [loadingCreate, setLoadingCreate] = useState(false);

    const handleCreateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // Asignamos el valor tal cual (string), sin convertir a número
        setCreateProductForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setCreateProductForm((prev) => ({ ...prev, imageFile: files[0] }));
        }
    };

    const createProduct = async (formData: FormData) => {
        setLoadingCreate(true);
        try {
            await AdminService.createProduct(formData, user?.token || "");
            console.log("Toast success called");
            toast.success("Producto creado con éxito.", {
                style: { background: "#15803d", color: "white" },
            });
            setCreateProductForm({
                title: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                brand: "",
                condition: "",
                imageFile: null,
            });
            return true;
        } catch (err: any) {
            console.log("Toast error called");
            toast.error(err.message || "Error inesperado", {
                style: { background: "#b91c1c", color: "white" },
            });
            return false;
        } finally {
            setLoadingCreate(false);
        }
    };

    const clearImageFile = () => {
        setCreateProductForm((prev) => ({ ...prev, imageFile: null }));
    };

    return {
        createProductForm,
        loadingCreate,
        conditions,
        handleCreateChange,
        handleCreateFileChange,
        createProduct,
        clearImageFile,
    };
}
