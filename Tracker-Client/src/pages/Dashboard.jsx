import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { expensesApi, reportsApi } from '../utils/api';
import '../styles/theme.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch expenses, summary, and category summary in parallel
        const [expensesResult, summaryResult, categorySummaryResult] = await Promise.all([
          expensesApi.getAll(),
          reportsApi.getSummary(),
          reportsApi.getCategorySummary(),
        ]);

        if (expensesResult.error) {
          setError(expensesResult.error);
        } else {
          setExpenses(expensesResult.data || []);
        }

        if (summaryResult.error) {
          setError(summaryResult.error);
        } else {
          setSummary(summaryResult.data);
        }

        if (categorySummaryResult.error) {
          setError(categorySummaryResult.error);
        } else {
          setCategorySummary(categorySummaryResult.data || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { total: 0, monthly: {}, categoryWise: {} };
    }

    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
    // Monthly expenses
    const monthly = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthly[month] = (monthly[month] || 0) + parseFloat(exp.amount);
    });

    // Category expenses
    const categoryWise = {};
    expenses.forEach(exp => {
      categoryWise[exp.category] = (categoryWise[exp.category] || 0) + parseFloat(exp.amount);
    });

    return { total, monthly, categoryWise };
  }, [expenses]);

  const monthlyData = {
    labels: Object.keys(stats.monthly),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(stats.monthly),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const categoryData = {
    labels: Object.keys(stats.categoryWise),
    datasets: [
      {
        data: Object.values(stats.categoryWise),
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: '500',
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const pieChartOptions = {
    ...chartOptions,
    scales: undefined, // Pie chart doesn't use scales
  };

  const thisMonthTotal = summary?.monthlyExpenses || Object.values(stats.monthly).reduce((a, b) => a + b, 0);
  const totalExpenses = summary?.totalExpenses || stats.total;
  const categoryCount = summary?.categoryCount || Object.keys(stats.categoryWise).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const chartVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const pieChartVariants = {
    hidden: { 
      opacity: 0, 
      rotate: -10 
    },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your expenses and financial insights</p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your expenses and financial insights</p>
        </div>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Dashboard</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please ensure the backend API is running and try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your expenses and financial insights</p>
      </div>
      
      <motion.div 
        className="row mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', margin: 0 }}
      >
        <div className="col-md-4 mb-3" style={{ padding: '0 12px', width: '100%', maxWidth: '100%' }}>
          <motion.div 
            className="stat-card" 
            style={{ borderTop: '4px solid #667eea', width: '100%' }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="stat-card-icon" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>
              💵
            </div>
            <p className="stat-card-title">Total Expenses</p>
            <h2 className="stat-card-value">${totalExpenses.toFixed(2)}</h2>
          </motion.div>
        </div>
        <div className="col-md-4 mb-3" style={{ padding: '0 12px', width: '100%', maxWidth: '100%' }}>
          <motion.div 
            className="stat-card" 
            style={{ borderTop: '4px solid #10b981', width: '100%' }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="stat-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              📅
            </div>
            <p className="stat-card-title">This Month</p>
            <h2 className="stat-card-value">${thisMonthTotal.toFixed(2)}</h2>
          </motion.div>
        </div>
        <div className="col-md-4 mb-3" style={{ padding: '0 12px', width: '100%', maxWidth: '100%' }}>
          <motion.div 
            className="stat-card" 
            style={{ borderTop: '4px solid #06b6d4', width: '100%' }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="stat-card-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
              📊
            </div>
            <p className="stat-card-title">Categories</p>
            <h2 className="stat-card-value">{categoryCount}</h2>
          </motion.div>
        </div>
      </motion.div>

      <div className="row" style={{ width: '100%', margin: 0 }}>
        <div className="col-md-6 mb-4" style={{ padding: '0 12px', width: '100%', maxWidth: '100%' }}>
          <motion.div 
            className="chart-container" 
            style={{ height: '400px', width: '100%', maxWidth: '100%' }}
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="professional-card-header">
              <h5 className="professional-card-title">Monthly Expenses</h5>
            </div>
            <div className="professional-card-body" style={{ height: 'calc(100% - 60px)', position: 'relative', width: '100%', overflow: 'hidden' }}>
              <Bar data={monthlyData} options={chartOptions} />
            </div>
          </motion.div>
        </div>
        <div className="col-md-6 mb-4" style={{ padding: '0 12px', width: '100%', maxWidth: '100%' }}>
          <motion.div 
            className="chart-container" 
            style={{ height: '400px', width: '100%', maxWidth: '100%' }}
            variants={pieChartVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="professional-card-header">
              <h5 className="professional-card-title">Category-wise Expenses</h5>
            </div>
            <div className="professional-card-body" style={{ height: 'calc(100% - 60px)', position: 'relative', width: '100%', overflow: 'hidden' }}>
              <Pie data={categoryData} options={pieChartOptions} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
