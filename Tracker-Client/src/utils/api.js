import axios from 'axios';

// API base URL - adjust if your backend runs on a different port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Don't reject on HTTP error status codes - we'll handle them manually
  validateStatus: (status) => status < 500,
});

// Request interceptor for logging (optional, can be removed in production)
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Network errors or other errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('[API] Network error:', error);
      throw new Error('Unable to connect to the server. Please ensure the backend is running.');
    }
    console.error('[API] Response error:', error);
    throw error;
  }
);

// Expenses API
export const expensesApi = {
  // Get all expenses
  getAll: async () => {
    try {
      const response = await api.get('/expenses');
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to fetch expenses' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching expenses' };
    }
  },

  // Get single expense by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/expenses/${id}`);
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Expense not found' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching the expense' };
    }
  },

  // Create new expense
  create: async (expenseData) => {
    try {
      const response = await api.post('/expenses', {
        amount: parseFloat(expenseData.amount),
        date: expenseData.date,
        category: expenseData.category,
        notes: expenseData.notes || null,
      });
      if (response.status === 201) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to create expense' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while creating the expense' };
    }
  },

  // Update expense
  update: async (id, expenseData) => {
    try {
      const response = await api.put(`/expenses/${id}`, {
        amount: parseFloat(expenseData.amount),
        date: expenseData.date,
        category: expenseData.category,
        notes: expenseData.notes || null,
      });
      if (response.status === 204) {
        return { data: { id }, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to update expense' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while updating the expense' };
    }
  },

  // Delete expense
  delete: async (id) => {
    try {
      const response = await api.delete(`/expenses/${id}`);
      if (response.status === 204) {
        return { data: true, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to delete expense' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while deleting the expense' };
    }
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to fetch categories' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching categories' };
    }
  },

  // Get single category by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Category not found' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching the category' };
    }
  },

  // Create new category
  create: async (categoryData) => {
    try {
      const response = await api.post('/categories', {
        name: categoryData.name.trim(),
      });
      if (response.status === 201) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to create category' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while creating the category' };
    }
  },

  // Update category
  update: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, {
        name: categoryData.name.trim(),
      });
      if (response.status === 204) {
        return { data: { id }, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to update category' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while updating the category' };
    }
  },

  // Delete category
  delete: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      if (response.status === 204) {
        return { data: true, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to delete category' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while deleting the category' };
    }
  },
};

// Reports API
export const reportsApi = {
  // Get summary report
  getSummary: async () => {
    try {
      const response = await api.get('/reports/summary');
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to fetch summary' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching the summary' };
    }
  },

  // Get category summary
  getCategorySummary: async () => {
    try {
      const response = await api.get('/reports/category-summary');
      if (response.status === 200) {
        return { data: response.data, error: null };
      }
      return { data: null, error: response.data?.message || 'Failed to fetch category summary' };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred while fetching the category summary' };
    }
  },
};

export default api;

