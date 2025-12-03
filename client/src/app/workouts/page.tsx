"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function WorkoutsPage() {
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                // In a real app, we would check if a plan exists for the user.
                // If not, we generate one.
                // For this MVP, let's try to generate one if we don't have it stored.
                // But the generate endpoint requires body params.
                // We should probably have a "Get Current Plan" endpoint or store the plan in the user profile.

                // For now, let's just trigger generation with user profile data if we can.
                if (user) {
                    const res = await api.post('/workouts/generate', {
                        age: user.age || 25,
                        gender: user.gender || 'Male',
                        weight: user.weight || 70,
                        height: user.height || 175,
                        fitnessLevel: user.fitnessLevel || 'Beginner',
                        goal: user.goal || 'General Fitness'
                    });
                    setPlan(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPlan();
        }
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading your personalized plan...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Workout Plan</h1>

                {!plan ? (
                    <Card className="p-6 text-center">
                        <p>No plan found. Please update your profile to generate one.</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {plan.weekly_schedule?.map((day: any, index: number) => (
                            <Card key={index} title={day.day}>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-blue-600">{day.focus}</h3>
                                    <ul className="space-y-2">
                                        {day.exercises.map((ex: string, i: number) => (
                                            <li key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                                <span>{ex}</span>
                                                <Button variant="outline" className="text-xs py-1 px-2">View Guide</Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
