import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <BackButton />

        <h1 className="text-3xl font-semibold text-gray-800 my-6">
          Book Details
        </h1>

        {book && (
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <DetailRow label="Book ID" value={book._id} />
            <DetailRow label="Title" value={book.title} />
            <DetailRow label="Author" value={book.author} />
            <DetailRow label="Publish Year" value={book.publishYear} />
            <DetailRow
              label="Created At"
              value={new Date(book.createdAt).toLocaleString()}
            />
            <DetailRow
              label="Last Updated"
              value={new Date(book.updatedAt).toLocaleString()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
    <span className="text-sm font-medium text-gray-500 w-40">
      {label}
    </span>
    <span className="text-gray-800 break-all">{value}</span>
  </div>
);

export default ShowBook;
