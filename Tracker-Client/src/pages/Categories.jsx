import { useState, useEffect } from 'react';
import { categoriesApi } from '../utils/api';
import '../styles/theme.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await categoriesApi.getAll();
        if (result.error) {
          setError(result.error);
        } else {
          setCategories(result.data || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setSubmitting(true);
    setError(null);
    
    try {
      const result = await categoriesApi.create({ name: newCategory });
      if (result.error) {
        setError(result.error);
      } else {
        // Refresh categories list
        const refreshResult = await categoriesApi.getAll();
        if (refreshResult.data) {
          setCategories(refreshResult.data);
        }
        setNewCategory('');
      }
    } catch (err) {
      setError(err.message || 'Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setEditingId(index);
    setEditValue(categories[index].name);
  };

  const handleSaveEdit = async () => {
    if (!editValue.trim()) return;

    const category = categories[editingId];
    setSubmitting(true);
    setError(null);
    
    try {
      const result = await categoriesApi.update(category.id, { name: editValue });
      if (result.error) {
        setError(result.error);
      } else {
        // Refresh categories list
        const refreshResult = await categoriesApi.getAll();
        if (refreshResult.data) {
          setCategories(refreshResult.data);
        }
        setEditingId(null);
        setEditValue('');
      }
    } catch (err) {
      setError(err.message || 'Failed to update category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setSubmitting(true);
      setError(null);
      
      try {
        const result = await categoriesApi.delete(id);
        if (result.error) {
          setError(result.error);
        } else {
          // Refresh categories list
          const refreshResult = await categoriesApi.getAll();
          if (refreshResult.data) {
            setCategories(refreshResult.data);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to delete category');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="page-header">
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">Manage your expense categories</p>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        <p className="page-subtitle">Manage your expense categories</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Add Category Form */}
      <div className="professional-card mb-4">
        <div className="professional-card-header">
          <h5 className="professional-card-title">Add Category</h5>
        </div>
        <div className="professional-card-body">
          <form onSubmit={handleAdd}>
            <div className="row">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-professional"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-professional btn-professional-primary w-100"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Adding...
                    </>
                  ) : (
                    <span>Add Category</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Categories Table */}
      <div className="professional-card">
        <div className="professional-card-header">
          <h5 className="professional-card-title">All Categories</h5>
        </div>
        <div className="professional-card-body p-0">
          {categories.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No categories found. Add one above.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-professional mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>
                        {editingId === index ? (
                          <input
                            type="text"
                            className="form-control form-control-professional form-control-sm"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            disabled={submitting}
                          />
                        ) : (
                          <strong>{category.name}</strong>
                        )}
                      </td>
                      <td>
                        {editingId === index ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={handleSaveEdit}
                              disabled={submitting}
                            >
                              {submitting ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={handleCancelEdit}
                              disabled={submitting}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(index)}
                              disabled={submitting}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(category.id, category.name)}
                              disabled={submitting}
                            >
                              Delete
                            </button>
                          </>
                        )}
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

export default Categories;

