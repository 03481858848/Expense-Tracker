// Dummy expense data for development
export const getInitialExpenses = () => {
  const stored = localStorage.getItem('expenses');
  if (stored) {
    return JSON.parse(stored);
  }

  // Default dummy data
  const defaultExpenses = [
    { id: 1, amount: 150.00, date: '2024-01-15', category: 'Food', notes: 'Lunch at restaurant' },
    { id: 2, amount: 45.50, date: '2024-01-16', category: 'Transport', notes: 'Uber ride' },
    { id: 3, amount: 200.00, date: '2024-01-17', category: 'Shopping', notes: 'Clothes' },
    { id: 4, amount: 75.00, date: '2024-01-18', category: 'Food', notes: 'Groceries' },
    { id: 5, amount: 120.00, date: '2024-01-19', category: 'Bills', notes: 'Electricity bill' },
    { id: 6, amount: 50.00, date: '2024-02-01', category: 'Food', notes: 'Coffee and snacks' },
    { id: 7, amount: 300.00, date: '2024-02-02', category: 'Shopping', notes: 'Electronics' },
    { id: 8, amount: 90.00, date: '2024-02-03', category: 'Transport', notes: 'Gas' },
  ];

  localStorage.setItem('expenses', JSON.stringify(defaultExpenses));
  return defaultExpenses;
};

export const saveExpenses = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const getInitialCategories = () => {
  const stored = localStorage.getItem('categories');
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare'];
  localStorage.setItem('categories', JSON.stringify(defaultCategories));
  return defaultCategories;
};

export const saveCategories = (categories) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};


