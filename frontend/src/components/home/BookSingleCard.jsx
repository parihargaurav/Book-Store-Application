import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const BookSingleCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {book.title}
        </h2>
        <p className="text-gray-600 mt-1">✍️ {book.author}</p>
        <p className="text-gray-500 text-sm mt-1">
          📅 {book.publishYear}
        </p>
        <p className="text-sky-600 font-bold mt-2">
          ₹ {book.price}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-xl text-blue-500 hover:text-blue-700" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-xl text-green-500 hover:text-green-700" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-xl text-red-500 hover:text-red-700" />
        </Link>
      </div>
    </div>
  );
};

export default BookSingleCard;
