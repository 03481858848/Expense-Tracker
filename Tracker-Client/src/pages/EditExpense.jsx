import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { expensesApi, categoriesApi } from '../utils/api';
import '../styles/theme.css';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      setError(null);
      
      try {
        // Fetch expense and categories in parallel
        const [expenseResult, categoriesResult] = await Promise.all([
          expensesApi.getById(id),
          categoriesApi.getAll(),
        ]);

        if (expenseResult.error) {
          setError(expenseResult.error);
          setTimeout(() => navigate('/expenses'), 2000);
        } else if (expenseResult.data) {
          const expense = expenseResult.data;
          setAmount(expense.amount.toString());
          // Format date for input (handle both ISO string and Date object)
          const dateValue = expense.date instanceof Date 
            ? expense.date.toISOString().split('T')[0]
            : expense.date.split('T')[0];
          setDate(dateValue);
          setCategory(expense.category);
          setNotes(expense.notes || '');
        }

        if (categoriesResult.error) {
          setError(categoriesResult.error);
        } else {
          const cats = categoriesResult.data || [];
          setCategories(cats);
          if (cats.length > 0 && !category) {
            setCategory(cats[0].name);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load expense data');
        setTimeout(() => navigate('/expenses'), 2000);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await expensesApi.update(id, {
        amount,
        date,
        category,
        notes,
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/expenses');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to update expense');
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Edit Expense</h1>
          <p className="page-subtitle">Update expense details</p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading expense data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Edit Expense</h1>
        <p className="page-subtitle">Update expense details</p>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="professional-card">
            <div className="professional-card-body">
              {success && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <svg width="20" height="20" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                  Expense updated successfully!
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg width="20" height="20" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                  </svg>
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label fw-semibold">
                    Amount *
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-professional"
                    id="amount"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="0.00"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="form-label fw-semibold">
                    Date *
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-professional"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category *
                  </label>
                  <select
                    className="form-select form-control-professional"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="notes" className="form-label fw-semibold">
                    Notes
                  </label>
                  <textarea
                    className="form-control form-control-professional"
                    id="notes"
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                  ></textarea>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-professional btn-professional-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      <span>Update Expense</span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/expenses')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;

