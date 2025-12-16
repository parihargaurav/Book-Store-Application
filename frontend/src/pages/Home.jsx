import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Spinner from '../components/Spinner';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  const navigate = useNavigate();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('loggedInUser');

    if (!token) {
      handleError('Please login first');
      navigate('/api/auth/login');
      return;
    }

    setLoggedInUser(user);
    fetchBooks(token);
  }, []);

  // 📚 FETCH BOOKS
  const fetchBooks = async (token) => {
    try {
      setLoading(true);

      const response = await axios.get(
        'http://localhost:5000/api/books',
        {
          headers: {
            Authorization: token, // or `Bearer ${token}` if backend expects it
          },
        }
      );

      setBooks(response.data.data);
    } catch (error) {
      handleError(
        error.response?.data?.message || 'Failed to fetch books'
      );
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged out successfully');

    setTimeout(() => navigate('/api/auth/login'), 1000);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold'>
          Welcome, {loggedInUser}
        </h1>
        <button
          onClick={handleLogout}
          className='bg-red-400 px-9 py-6 rounded text-white'
        >
           Logout
        </button>
      </div>

      <div className='flex justify-center gap-x-4 mb-6'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <h2 className='text-3xl my-6'>Books List</h2>
        <Link to='/books/create' className='text-sky-800 text-4xl'>
          +
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
