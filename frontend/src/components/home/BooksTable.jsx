import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table className="min-w-full border-collapse">
        <thead className="bg-sky-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
              S.No
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">
              Title
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left max-md:hidden">
              Author
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center max-md:hidden">
              Price
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center max-md:hidden">
              Year
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="border-t hover:bg-gray-50 transition duration-200"
            >
              <td className="px-4 py-3 text-center text-sm text-gray-600">
                {index + 1}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-gray-800">
                {book.title}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600 max-md:hidden">
                {book.author}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600 text-center max-md:hidden">
                ₹{book.price}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600 text-center max-md:hidden">
                {book.publishYear}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <ActionIcon
                    to={`/books/details/${book._id}`}
                    icon={<BsInfoCircle />}
                    color="text-green-600"
                    label="View"
                  />

                  <ActionIcon
                    to={`/books/edit/${book._id}`}
                    icon={<AiOutlineEdit />}
                    color="text-yellow-500"
                    label="Edit"
                  />

                  <ActionIcon
                    to={`/books/delete/${book._id}`}
                    icon={<MdOutlineDelete />}
                    color="text-red-500"
                    label="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActionIcon = ({ to, icon, color, label }) => (
  <Link
    to={to}
    className={`text-xl ${color} hover:scale-110 transition transform`}
    title={label}
  >
    {icon}
  </Link>
);

export default BooksTable;
