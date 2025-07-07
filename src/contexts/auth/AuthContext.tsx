'use client';

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useReducer, useEffect } from "react";
import { UserService } from "@/services/UserService";

type AuthContextProps = {
    user: User | null;
    token?: string | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}


const authInitialState: AuthState = {
    status: 'checking',
    user: null
}

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

const parseJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found in localStorage");
            dispatch({ type: 'non-authenticated' });
            return;
        }

        const payload = parseJwt(token);
        if (!payload) {
            console.log("Invalid token payload");
            localStorage.removeItem('token');
            dispatch({ type: 'non-authenticated' });
            return;
        }

        UserService.getProfile(token).then(response => {
            console.log("getProfile response:", response);
            if (response.success) {
                const userData = response.data as User;
                userData.token = token;
                userData.role = payload.role;
                dispatch({ type: 'auth', payload: { user: userData } });
            } else {
                console.log("getProfile failed, removing token");
                localStorage.removeItem('token');
                dispatch({ type: 'non-authenticated' });
            }
        }).catch((error) => {
            console.log("getProfile error:", error);
            localStorage.removeItem('token');
            dispatch({ type: 'non-authenticated' });
        });
    }, []);



    const auth = (user: User) => {
        localStorage.setItem('token', user.token);
        dispatch({ type: 'auth', payload: { user } });
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'logout' });
    }

    const updateUser = (user: User) => {
        dispatch({ type: 'updateUser', payload: { user } });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                token: state.user?.token ?? null,
                logout,
                auth,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}
