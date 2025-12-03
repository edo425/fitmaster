"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';

export default function OnboardingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        weight: '',
        height: '',
        fitnessLevel: 'Beginner',
        goal: 'Fat Loss'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // We don't have a specific onboarding endpoint, but we can update the user profile
            // Or we can assume the user is already logged in and we are updating their details.
            // Let's assume we have a profile update endpoint or use a specific one.
            // Since I didn't create a specific profile update endpoint, I'll use a new one or modify the user.
            // Actually, I should probably create a PUT /api/users/profile endpoint.
            // For now, I'll assume I can just update the user.

            // Let's add the endpoint to the backend in the next step if it's missing.
            // For now, I'll just log it and redirect.

            // Wait, I need to save this data. 
            // I'll create a PUT /api/users/profile endpoint in the backend.
            await api.put('/users/profile', formData);
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to save profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-2xl" title="Setup Your Profile">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <Input
                            label="Weight (kg)"
                            name="weight"
                            type="number"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Height (cm)"
                            name="height"
                            type="number"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Level</label>
                            <select
                                name="fitnessLevel"
                                value={formData.fitnessLevel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Fat Loss</option>
                                <option>Muscle Gain</option>
                                <option>Maintenance</option>
                                <option>Toning</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" isLoading={loading}>
                        Save Profile & Continue
                    </Button>
                </form>
            </Card>
        </div>
    );
}
