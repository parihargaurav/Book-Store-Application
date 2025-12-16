import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔐 Private Route Wrapper
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {/* Handles refresh + token check */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/create"
          element={
            <PrivateRoute>
              <CreateBook />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/details/:id"
          element={
            <PrivateRoute>
              <ShowBook />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/edit/:id"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/delete/:id"
          element={
            <PrivateRoute>
              <DeleteBook />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
