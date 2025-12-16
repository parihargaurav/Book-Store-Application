import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[650px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-6 animate-scaleIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
            Published: {book.publishYear}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mt-2">
          <PiBookOpenTextLight className="text-3xl text-sky-500" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {book.title}
          </h2>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mt-2">
          <BiUserCircle className="text-3xl text-green-500" />
          <p className="text-lg text-gray-600">{book.author}</p>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-800">Book ID</span>
            <p className="truncate">{book._id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-800">Price</span>
            <p className="text-sky-600 font-semibold">₹ {book.price}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            This book provides detailed insights and valuable information
            related to its subject. It is carefully written to ensure clarity,
            usefulness, and readability for all audiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
