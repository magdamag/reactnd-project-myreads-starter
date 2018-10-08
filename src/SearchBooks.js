import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    moveBookShelf: PropTypes.func.isRequired
  };

  state = {
    books: [],
    query: ''
  };

  // Search for specific book API
  searchBooks = () => {
    BooksAPI.search(this.state.query).then((books) => {
      this.setState({ books })
    })
  }

  // Update query
  updateQuery = (query) => {
    this.setState({query: query})
  }

  // Clear query
  clearQuery = () => {
    this.updateQuery('');
  };

  // Fill in blanks for authors and shelf if not existing already
  mangleBooks = (books) => {
    let books_mangled = []
    books.map((book) => {
      !book.authors && (book.authors = ['Unknown'])
      !book.shelf && (book.shelf = 'none')
      books_mangled.push(book)
    })
    return books_mangled
  }

  render() {
    const { moveBookShelf } = this.props
    const { books, query } = this.state

    // Start looking via API when user types in content
    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      // Remember, the current query state is in state so no param req!
      this.searchBooks()
      // If search yields anything, propagate data
      if (books && books.length > 0) {
      showingBooks = books.filter((book) => match.test(book.title))
      showingBooks = this.mangleBooks(showingBooks)
      showingBooks.sort(sortBy('title'))
      }
    }

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
        // Show results if anything exists
        {showingBooks && (
          <div className="search-books-results">
            <ListBooks books={showingBooks} booksType='Found the following' moveBookShelf={moveBookShelf}/>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks
