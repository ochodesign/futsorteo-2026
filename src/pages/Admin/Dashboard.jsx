import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Import sub-components
import DashboardHeader from '../../components/Admin/DashboardHeader';
import StatsGrid from '../../components/Admin/StatsGrid';
import TabsNavigation from '../../components/Admin/TabsNavigation';
import VisitsTab from '../../components/Admin/VisitsTab';
import MessagesTab from '../../components/Admin/MessagesTab';
import MobileNav from '../../components/Admin/MobileNav';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = ({ showAlert, showConfirm }) => {
    const [activeTab, setActiveTab] = useState('visitas');
    const [stats, setStats] = useState({ visits: 0, messages: 0 });
    const [chartData, setChartData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        try {
            // Fetch stats and chart data
            const dashboardRes = await fetch('/api/get_dashboard_data.php');
            const dashboardData = await dashboardRes.json();

            if (dashboardData.stats) {
                setStats({
                    visits: dashboardData.stats.total_visits || 0,
                    messages: dashboardData.stats.unread_messages || 0
                });
                setChartData(dashboardData.chart_data || []);
            }

            // Fetch messages
            const messagesRes = await fetch('/api/get_messages.php');
            const messagesData = await messagesRes.json();
            if (Array.isArray(messagesData)) {
                setMessages(messagesData);
            }

            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin';
    };

    const handleDeleteMessage = (id) => {
        showConfirm(
            '¿Eliminar mensaje?',
            'Esta acción no se puede deshacer. ¿Seguro que querés borrar este mensaje definitivamente?',
            async () => {
                try {
                    const res = await fetch('/api/delete_message.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.success) {
                        const msgToDelete = messages.find(m => m.id === id);
                        if (msgToDelete && parseInt(msgToDelete.leido) === 0) {
                            setStats(prev => ({ ...prev, messages: Math.max(0, prev.messages - 1) }));
                        }
                        setMessages(messages.filter(m => m.id !== id));
                        showAlert('Mensaje borrado', 'El mensaje ha sido eliminado correctamente.', 'success');
                    }
                } catch (error) {
                    showAlert('Error', 'No se pudo eliminar el mensaje. Intentá de nuevo.', 'error');
                }
            }
        );
    };

    const handleMarkAsRead = async (id) => {
        try {
            const res = await fetch('/api/mark_message_read.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.success) {
                // Solo bajar el contador si el mensaje estaba como no leído
                const msg = messages.find(m => m.id === id);
                if (msg && parseInt(msg.leido) === 0) {
                    setStats(prev => ({ ...prev, messages: Math.max(0, prev.messages - 1) }));
                }
                setMessages(messages.map(m => m.id === id ? { ...m, leido: 1 } : m));
            }
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    // Formatear fechas del gráfico (YYYY-MM-DD -> DD/MM)
    const formatChartLabel = (dateStr) => {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}`;
    };

    const chartConfig = {
        labels: chartData.length > 0 ? chartData.map(d => formatChartLabel(d.date)) : ['Sin datos'],
        datasets: [{
            label: 'Visitas',
            data: chartData.length > 0 ? chartData.map(d => d.count) : [0],
            borderColor: '#38bdf8',
            borderWidth: 4,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return null;
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
                gradient.addColorStop(1, 'rgba(56, 189, 248, 0.2)');
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#08111e',
            pointBorderColor: '#38bdf8',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#38bdf8',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#94a3b8',
                titleFont: { size: 12, weight: 'bold', family: 'Inter' },
                bodyColor: '#fff',
                bodyFont: { size: 16, weight: '900', family: 'Inter' },
                padding: 15,
                cornerRadius: 12,
                displayColors: false,
                borderColor: 'rgba(56, 189, 248, 0.2)',
                borderWidth: 1,
                callbacks: {
                    label: (context) => ` ${context.parsed.y} Visitas`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.03)',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: { size: 11, weight: '600' },
                    padding: 10,
                    stepSize: 5
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#64748b',
                    font: { size: 11, weight: '600' },
                    padding: 10
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-fut-dark">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <RefreshCw className="text-fut-primary w-10 h-10" />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-fut-dark text-white pb-20 md:pb-0 font-sans">
            <DashboardHeader handleLogout={handleLogout} />

            <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 space-y-10">
                <StatsGrid stats={stats} messagesCount={messages.length} />

                <TabsNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    unreadCount={stats.messages}
                />

                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'visitas' ? (
                            <VisitsTab
                                chartData={chartData}
                                chartConfig={chartConfig}
                                chartOptions={chartOptions}
                                refreshing={refreshing}
                                fetchData={fetchData}
                            />
                        ) : (
                            <MessagesTab
                                messages={messages}
                                handleDeleteMessage={handleDeleteMessage}
                                handleMarkAsRead={handleMarkAsRead}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <MobileNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={stats.messages}
            />
        </div>
    );
};

export default Dashboard;
