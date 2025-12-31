import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import ExpenseList from './pages/ExpenseList';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import { auth } from './utils/auth';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            auth.isAuthenticated() ? (
              <Navigate to="/" replace />
            ) : (
              <>
                <Login />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddExpense />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EditExpense />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ExpenseList />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Categories />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Reports />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
