import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'


class ListBooksAll extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBookShelf: PropTypes.func.isRequired
  };

  state = {
  }

  render() {
    const { books, moveBookShelf } = this.props;

    let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
    let wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    let read = books.filter((book) => book.shelf === 'read');

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <ListBooks books={currentlyReading} booksType='Currently Reading' moveBookShelf={moveBookShelf}/>
            <ListBooks books={wantToRead} booksType='Want To Read' moveBookShelf={moveBookShelf}/>
            <ListBooks books={read} booksType='Read' moveBookShelf={moveBookShelf}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooksAll
