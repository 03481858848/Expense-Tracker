// Simple authentication utility with localStorage
export const auth = {
  login: (email, password) => {
    // Dummy authentication
    if (email === 'admin@test.com' && password === '123456') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  },

  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getUserEmail: () => {
    return localStorage.getItem('userEmail');
  }
};


