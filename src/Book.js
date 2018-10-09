import React from 'react';
import PropTypes from 'prop-types';
import ReactJoin from 'react-join';

const ListBooks = ({ book, moveBookShelf }) => {
  return(
    <div className="book">
      <div className="book-top">
        {book.imageLinks && (
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
        )}
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(event) => moveBookShelf(book, event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors"><ReactJoin separator="; ">{book.authors}</ReactJoin></div>
    </div>
  )
}

ListBooks.propTypes = {
  book: PropTypes.object.isRequired,
  moveBookShelf: PropTypes.func.isRequired
};

export default ListBooks
