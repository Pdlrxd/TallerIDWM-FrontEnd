"use client";

import { useAuth } from "@/hooks/userAuth";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";

export const ViewAdminPage = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow justify-center items-center bg-white px-10 py-12">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-black">
                    <h1 className="text-4xl font-extrabold uppercase mb-8 text-center">
                        Panel Administrativo
                    </h1>

                    <div className="text-center flex flex-col items-center space-y-6">
                        <h2 className="text-2xl font-bold">
                            Bienvenido, {user?.firstName} {user?.lastName}
                        </h2>

                        <p className="mt-4 text-lg max-w-md mx-auto">
                            Desde aquí podrás gestionar los productos y usuarios.
                        </p>

                        <Button
                            className="w-64 py-3 text-white bg-black hover:bg-gray-800 rounded-md"
                            onClick={() => window.location.href = "/admin/products/create"}
                        >
                            Creación de Producto
                        </Button>

                        <Button
                            className="w-64 py-3 text-white bg-black hover:bg-gray-800 rounded-md"
                            onClick={() => window.location.href = "/admin/products"}
                        >
                            Listado de productos
                        </Button>

                        <Button
                            variant={"outline"}
                            className="w-64 py-3 text-white border-black bg-black hover:bg-gray-800 rounded-md"
                            onClick={() => window.location.href = "/admin/users"}
                        >
                            Gestión de Usuarios
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
