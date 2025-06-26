'use client';

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useReducer, useEffect } from "react";

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
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

        // Opcional: validar expiración token aquí

        const user: User = {
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            email: payload.email,
            role: payload.role,
            token: token
        };

        dispatch({ type: 'auth', payload: { user } });
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
                logout,
                auth,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
