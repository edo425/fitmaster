"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import api from '../../utils/api';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const [stats, setStats] = useState({
        weight: 0,
        streak: 0,
        caloriesBurned: 0,
        workoutsCompleted: 0
    });

    useEffect(() => {
        if (user) {
            // Mock stats or fetch from API
            setStats({
                weight: user.weight || 0,
                streak: 5, // Mock
                caloriesBurned: 1200, // Mock
                workoutsCompleted: 12 // Mock
            });
        }
    }, [user]);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.username}!</h1>
                        <p className="text-gray-600">Here is your daily summary.</p>
                    </div>
                    <Link href="/settings">
                        <Button variant="outline">Settings</Button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="p-4 flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-sm">Current Weight</span>
                        <span className="text-2xl font-bold text-blue-600">{stats.weight} kg</span>
                    </Card>
                    <Card className="p-4 flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-sm">Streak</span>
                        <span className="text-2xl font-bold text-green-600">{stats.streak} Days</span>
                    </Card>
                    <Card className="p-4 flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-sm">Calories Burned</span>
                        <span className="text-2xl font-bold text-orange-600">{stats.caloriesBurned} kcal</span>
                    </Card>
                    <Card className="p-4 flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-sm">Workouts</span>
                        <span className="text-2xl font-bold text-purple-600">{stats.workoutsCompleted}</span>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Today's Workout */}
                    <Card title="Today's Workout" className="h-full">
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900">Chest & Triceps</h4>
                                <p className="text-sm text-blue-700">45 mins • Intermediate</p>
                            </div>
                            <Link href="/workouts">
                                <Button className="w-full">Start Workout</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Today's Meals */}
                    <Card title="Today's Meals" className="h-full">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-green-900">Breakfast</h4>
                                    <p className="text-sm text-green-700">Oatmeal & Berries</p>
                                </div>
                                <span className="text-sm font-bold text-green-800">350 kcal</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-green-900">Lunch</h4>
                                    <p className="text-sm text-green-700">Grilled Chicken Salad</p>
                                </div>
                                <span className="text-sm font-bold text-green-800">450 kcal</span>
                            </div>
                            <Link href="/meals">
                                <Button variant="secondary" className="w-full">View Meal Plan</Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Progress Chart Placeholder */}
                <Card title="Weight Progress">
                    <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                        <p className="text-gray-500">Chart will be implemented here using Recharts or Chart.js</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
