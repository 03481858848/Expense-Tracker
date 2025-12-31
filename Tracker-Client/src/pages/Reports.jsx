import { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [expensesResult, categorySummaryResult] = await Promise.all([
          expensesApi.getAll(),
          reportsApi.getCategorySummary(),
        ]);

        if (expensesResult.error) {
          setError(expensesResult.error);
        } else {
          setExpenses(expensesResult.data || []);
        }

        if (categorySummaryResult.error) {
          setError(categorySummaryResult.error);
        } else {
          setCategorySummary(categorySummaryResult.data || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load reports data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reports = useMemo(() => {
    // Monthly totals
    const monthly = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      monthly[month] = (monthly[month] || 0) + parseFloat(exp.amount);
    });

    // Category totals - use API data if available, otherwise calculate from expenses
    const categoryTotals = {};
    if (categorySummary && categorySummary.length > 0) {
      categorySummary.forEach(item => {
        categoryTotals[item.category] = parseFloat(item.total);
      });
    } else {
      expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
      });
    }

    return { monthly, categoryTotals };
  }, [expenses, categorySummary]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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

  const monthlyChartData = {
    labels: Object.keys(reports.monthly),
    datasets: [
      {
        label: 'Monthly Expenses ($)',
        data: Object.values(reports.monthly),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(reports.categoryTotals),
    datasets: [
      {
        label: 'Category Expenses ($)',
        data: Object.values(reports.categoryTotals),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Detailed financial reports and analytics</p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Detailed financial reports and analytics</p>
        </div>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Reports</h4>
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
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Detailed financial reports and analytics</p>
      </div>

      {/* Monthly Totals */}
      <div className="chart-container mb-4">
        <div className="professional-card-header">
          <h5 className="professional-card-title">Monthly Totals</h5>
        </div>
        <div className="professional-card-body">
          <div className="row mb-4">
            {Object.entries(reports.monthly).map(([month, total]) => (
              <div key={month} className="col-md-3 mb-3">
                <div className="stat-card" style={{ borderTop: '4px solid #667eea' }}>
                  <p className="stat-card-title">{month}</p>
                  <h3 className="stat-card-value text-primary">${total.toFixed(2)}</h3>
                </div>
              </div>
            ))}
          </div>
          <Bar data={monthlyChartData} options={chartOptions} />
        </div>
      </div>

      {/* Category Totals */}
      <div className="chart-container mb-4">
        <div className="professional-card-header">
          <h5 className="professional-card-title">Category Totals</h5>
        </div>
        <div className="professional-card-body">
          <div className="row mb-4">
            {Object.entries(reports.categoryTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([category, total]) => (
                <div key={category} className="col-md-3 mb-3">
                  <div className="stat-card" style={{ borderTop: '4px solid #10b981' }}>
                    <p className="stat-card-title">{category}</p>
                    <h3 className="stat-card-value text-success">${total.toFixed(2)}</h3>
                  </div>
                </div>
              ))}
          </div>
          <Bar data={categoryChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Reports;

