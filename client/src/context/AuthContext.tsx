"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    username: string;
    email: string;
    age?: number;
    gender?: string;
    weight?: number;
    height?: number;
    fitnessLevel?: string;
    goal?: string;
    weightHistory?: { weight: number; date: string }[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/users/me');
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('token', token);
        try {
            const res = await api.get('/users/me');
            setUser(res.data);
            router.push('/dashboard');
        } catch (err) {
            console.error("Error loading user after login", err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
