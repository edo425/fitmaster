"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        height: '',
        fitnessLevel: 'Beginner',
        goal: 'Fat Loss'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                age: user.age?.toString() || '',
                gender: user.gender || 'Male',
                height: user.height?.toString() || '',
                fitnessLevel: user.fitnessLevel || 'Beginner',
                goal: user.goal || 'Fat Loss'
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Assuming we have a profile update endpoint or reuse the user update logic
            // We haven't explicitly created a PUT /users/profile, but we can add it or just use the same logic as onboarding
            // Let's assume we added it or will add it.
            await api.put('/users/profile', formData);
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <Card title="Settings">
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
                            Update Profile
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
