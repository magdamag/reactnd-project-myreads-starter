import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import ReactJoin from 'react-join';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    booksType: PropTypes.string.isRequired,
    moveBookShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, booksType, moveBookShelf } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{booksType}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.sort(sortBy('title')).map((book) => (
            <li key={book.id}>
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
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooks
