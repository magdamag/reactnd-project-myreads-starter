import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'


const ListBooksAll = ({ books, moveBookShelf }) => {
  const shelves = {
    currentlyReading: ['Currently Reading', books.filter((book) => book.shelf === 'currentlyReading')],
    wantToRead: ['Want to Read', books.filter((book) => book.shelf === 'wantToRead')],
    read: ['Read', books.filter((book) => book.shelf === 'read')]
  };

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        { Object.keys(shelves).map((shelf) =>
          <ListBooks key={shelf}
            books={shelves[shelf][1]}
            booksType={shelves[shelf][0]}
            moveBookShelf={moveBookShelf}
          />
        )}
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooksAll.propTypes = {
    books: PropTypes.array.isRequired,
    moveBookShelf: PropTypes.func.isRequired
};

export default ListBooksAll
