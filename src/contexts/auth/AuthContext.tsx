'use client';

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useReducer, useEffect } from "react";
import { UserService } from "@/services/UserService";

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    // refreshToken eliminado
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null
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

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: 'non-authenticated' });
            return;
        }

        const payload = parseJwt(token);
        if (!payload) {
            localStorage.removeItem('token');
            dispatch({ type: 'non-authenticated' });
            return;
        }

        UserService.getProfile(token).then(response => {
            if (response.success) {
                const userData = response.data as User;
                userData.token = token;
                dispatch({ type: 'auth', payload: { user: userData } });
            } else {
                localStorage.removeItem('token');
                dispatch({ type: 'non-authenticated' });
            }
        }).catch(() => {
            localStorage.removeItem('token');
            dispatch({ type: 'non-authenticated' });
        });
    }, []);

    // refreshToken eliminado

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
                logout,
                auth,
                updateUser,
                // refreshToken ya no está disponible
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
