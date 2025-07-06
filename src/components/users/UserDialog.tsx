import React from "react";
import { User } from "@/interfaces/User";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Props {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

const UserDialog: React.FC<Props> = ({ user, open, onClose }) => {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent>
                <DialogTitle>Perfil del Usuario</DialogTitle>
                <div className="space-y-2">
                    <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                    <p><strong>Dirección:</strong> {user.street} #{user.number}, {user.commune}, {user.region}, {user.postalCode}</p>
                    <p><strong>Fecha de Registro:</strong> {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Último Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Nunca"}</p>
                    <p><strong>Estado:</strong> {user.status ? "Activo" : "Inactivo"}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
