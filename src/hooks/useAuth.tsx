import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/utils";
import { UserService } from "@/services/UserService";
import { User } from "@/interfaces/User";

export const useAuth = () => {
    const { auth, logout } = useContext(AuthContext);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const res = await UserService.login(email, password);

            if (!res.success) {
                return { error: res.message || "Credenciales incorrectas" };
            }

            const token = res.data;
            const payload = parseJwt(token);

            if (!payload) return { error: "Token inválido recibido" };

            localStorage.setItem("token", token);

            const user: User = {
                email: payload.email,
                token: token,
                role: payload.role,
                firstName: payload.given_name,
                lastName: payload.family_name,
            };

            auth(user);

            router.push(payload.role === "Admin" ? "/admin" : "/");

            return { success: true };

        } catch (error: any) {
            const message = error?.message || "Error al iniciar sesión. Intente nuevamente";
            return { error: message };
        }
    };

    const register = async (data: any) => {
        try {
            const res = await UserService.register(data);

            if (res.success === false) {
                return { error: res.message || "Error al registrar el usuario." };
            }

            return { success: true, message: res.message || "Registro exitoso." };
        } catch (error: any) {
            return { error: error?.response?.data?.message || "Error en el registro. Intente nuevamente." };
        }
    };

    const logoutUser = () => {
        logout();
        router.push("/login");
    };

    return {
        login,
        register,  // <--- Incluido en el retorno
        logout: logoutUser,
    };
};
