import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

 const handleDeleteBook = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    enqueueSnackbar('Please login to continue', { variant: 'warning' });
    navigate('/login');
    return;
  }

  setLoading(true);

  axios
    .delete(`http://localhost:5000/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // 🔐 Auth related errors
      if (status === 401) {
        enqueueSnackbar('Session expired. Please login again.', {
          variant: 'warning',
        });
        localStorage.clear();
        navigate('/login');
      } 
      // 🚫 Permission error
      else if (status === 403) {
        enqueueSnackbar('You are not allowed to delete this book', {
          variant: 'error',
        });
      } 
      // ❌ Other errors
      else {
        enqueueSnackbar(message || 'Something went wrong. Try again.', {
          variant: 'error',
        });
      }
    })
    .finally(() => {
      setLoading(false);
    });
};

  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook;