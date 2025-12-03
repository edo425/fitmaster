"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
    const { user } = useAuth();
    const [weight, setWeight] = useState('');
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.weightHistory) {
            // Format history for chart
            const formattedHistory = user.weightHistory.map((entry: any) => ({
                date: new Date(entry.date).toLocaleDateString(),
                weight: entry.weight
            })).reverse(); // Show oldest first
            setHistory(formattedHistory);
        }
    }, [user]);

    const handleLogWeight = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/users/weight', { weight: parseFloat(weight) });
            // Update local state or re-fetch user (AuthContext should handle user update if we call a refresh, but for now let's just update local history)
            // Ideally we update the global user context.
            // For this MVP, we'll just reload the page or rely on the response if we had a setUser in context exposed.
            // Since we don't have setUser exposed, we can just force a reload or update local history.
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Track Your Progress</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Log Weight Form */}
                    <Card title="Log Weight" className="md:col-span-1 h-fit">
                        <form onSubmit={handleLogWeight} className="space-y-4">
                            <Input
                                label="Current Weight (kg)"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" isLoading={loading}>
                                Log Weight
                            </Button>
                        </form>
                    </Card>

                    {/* Chart */}
                    <Card title="Weight History" className="md:col-span-2">
                        <div className="h-64 w-full">
                            {history.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={history}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={['auto', 'auto']} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No data yet. Log your weight to see progress!
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
