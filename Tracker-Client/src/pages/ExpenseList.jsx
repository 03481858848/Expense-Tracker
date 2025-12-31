import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { expensesApi, categoriesApi } from '../utils/api';
import '../styles/theme.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [expensesResult, categoriesResult] = await Promise.all([
          expensesApi.getAll(),
          categoriesApi.getAll(),
        ]);

        if (expensesResult.error) {
          setError(expensesResult.error);
        } else {
          const exps = expensesResult.data || [];
          setExpenses(exps);
          setFilteredExpenses(exps);
        }

        if (categoriesResult.error) {
          setError(categoriesResult.error);
        } else {
          const cats = categoriesResult.data || [];
          setCategories(cats);
        }
      } catch (err) {
        setError(err.message || 'Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...expenses];

    if (filterCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category === filterCategory);
    }

    if (filterStartDate) {
      filtered = filtered.filter(exp => exp.date >= filterStartDate);
    }

    if (filterEndDate) {
      filtered = filtered.filter(exp => exp.date <= filterEndDate);
    }

    setFilteredExpenses(filtered);
  }, [filterCategory, filterStartDate, filterEndDate, expenses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const result = await expensesApi.delete(id);
        if (result.error) {
          alert(`Error: ${result.error}`);
        } else {
          // Remove from local state
          const updated = expenses.filter(exp => exp.id !== id);
          setExpenses(updated);
          setFilteredExpenses(updated);
        }
      } catch (err) {
        alert(`Error: ${err.message || 'Failed to delete expense'}`);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Expense List</h1>
          <p className="page-subtitle">View and manage all your expenses</p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading expenses...</p>
        </div>
      </div>
    );
  }

  if (error && expenses.length === 0) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Expense List</h1>
          <p className="page-subtitle">View and manage all your expenses</p>
        </div>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Expenses</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please ensure the backend API is running and try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Expense List</h1>
          <p className="page-subtitle">View and manage all your expenses</p>
        </div>
        <button className="btn btn-professional btn-professional-primary" onClick={() => navigate('/add')}>
          <span>+ Add New Expense</span>
        </button>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="professional-card mb-4">
        <div className="professional-card-header">
          <h5 className="professional-card-title">Filters</h5>
        </div>
        <div className="professional-card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="filterCategory" className="form-label fw-semibold">
                Category
              </label>
              <select
                className="form-select form-control-professional"
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="filterStartDate" className="form-label fw-semibold">
                Start Date
              </label>
              <input
                type="date"
                className="form-control form-control-professional"
                id="filterStartDate"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="filterEndDate" className="form-label fw-semibold">
                End Date
              </label>
              <input
                type="date"
                className="form-control form-control-professional"
                id="filterEndDate"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterStartDate('');
                  setFilterEndDate('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="mt-3 p-3 bg-light rounded">
            <strong className="text-primary">Total: ${totalAmount.toFixed(2)}</strong>
            <span className="text-muted ms-2">({filteredExpenses.length} expenses)</span>
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="professional-card">
        <div className="professional-card-body p-0">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No expenses found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-professional mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td><strong className="text-primary">${parseFloat(expense.amount).toFixed(2)}</strong></td>
                      <td>
                        <span className="badge-professional bg-primary text-white">{expense.category}</span>
                      </td>
                      <td>{expense.notes || '-'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(expense.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(expense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;

