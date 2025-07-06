import React from "react";
import { User } from "@/interfaces/User";
import { Button } from "../ui/Button";

interface Props {
    user: User;
    onViewProfile: () => void;
}

const UserCard: React.FC<Props> = ({ user, onViewProfile }) => {
    return (
        <div className="border rounded p-4 shadow transition flex flex-col">
            <h2 className="font-semibold text-lg">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm">{user.phone}</p>
            <p className="text-sm">
                Estado: {user.status ? "Activo" : "Inactivo"}
            </p>
            <div className="mt-auto flex justify-end">
                <Button
                    className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded cursor-pointer"
                    onClick={onViewProfile}
                >
                    Ver Perfil
                </Button>
            </div>
        </div>
    );
};



export default UserCard;
