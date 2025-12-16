import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <div
          key={item._id}
          className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <BookSingleCard book={item} />
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
