"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            login(res.data.token);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md" title="Create Account">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" className="w-full" isLoading={loading}>
                        Register
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
