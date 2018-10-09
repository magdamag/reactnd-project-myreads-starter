import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book';

const ListBooks = ({ books, booksType, moveBookShelf }) => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{booksType}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.sort(sortBy('title')).map((book) => (
          <li key={book.id}>
            <Book book={book} moveBookShelf={moveBookShelf}></Book>
          </li>
        ))}
        </ol>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    booksType: PropTypes.string.isRequired,
    moveBookShelf: PropTypes.func.isRequired
};

export default ListBooks
