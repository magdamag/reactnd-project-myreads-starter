import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    moveBookShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  };

  state = {
    books: [],
    query: ''
  };

  // Search for specific book API
  searchBooks = (query) => {
    console.log(query)
    BooksAPI.search(query).then((books) => {
      this.setState({ books })
    })
  }

  // Update query
  updateQuery = (query) => {
    this.setState({query: query})
    this.searchBooks(query)
    this.mangleBooks(this.state.books)
  }

  // Clear query
  clearQuery = () => {
    this.updateQuery('');
  };

  // Fill in blanks for authors and shelf if not existing already
  mangleBooks = (books) => {
    let books_mangled = []
    books && books.length > 0 && (
      books.map((book) => {
        this.props.books.filter((bookstored) => {
          book.id === bookstored.id && (book.shelf = bookstored.shelf)
        })
        !book.authors && (book.authors = ['Unknown'])
        !book.shelf && (book.shelf = 'none')
        books_mangled.push(book)
      })
    )
    this.setState({ books: books_mangled.sort(sortBy('title')) })
  }

  render() {
    const { moveBookShelf } = this.props
    const { books, query } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {/* Show results if anything exists */}
        <div className="search-books-results">
        {books && books.length > 0 && (
          <ListBooks books={books} booksType='Found the following' moveBookShelf={moveBookShelf}/>
        ) || (
          <span>None books found!</span>
        )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
