"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function MealsPage() {
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                if (user) {
                    const res = await api.post('/meals/generate', {
                        age: user.age || 25,
                        gender: user.gender || 'Male',
                        weight: user.weight || 70,
                        height: user.height || 175,
                        goal: user.goal || 'General Fitness',
                        dietaryPreferences: 'None'
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

    if (loading) return <div className="p-8 text-center">Loading your personalized meal plan...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Meal Plan</h1>

                {!plan ? (
                    <Card className="p-6 text-center">
                        <p>No plan found.</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {plan.meals?.map((meal: any, index: number) => (
                            <Card key={index} title={meal.type}>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Placeholder for Image */}
                                    <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Meal Image</span>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{meal.name}</h3>
                                        <div className="flex space-x-4 text-sm text-gray-600">
                                            <span>🔥 {meal.calories} kcal</span>
                                            <span>🥩 {meal.macros.protein} P</span>
                                            <span>🍞 {meal.macros.carbs} C</span>
                                            <span>🥑 {meal.macros.fat} F</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mt-2">Ingredients:</h4>
                                            <p className="text-sm text-gray-600">{meal.ingredients.join(', ')}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mt-2">Instructions:</h4>
                                            <p className="text-sm text-gray-600">{meal.instructions}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
