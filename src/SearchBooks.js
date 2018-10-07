import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';
import ListBooks from './ListBooks'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBookShelf: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  clearQuery = () => {
    this.updateQuery('');
  };

  render() {
    const { books, moveBookShelf } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))

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
        {showingBooks.length !== books.length && showingBooks.length > 0 && (
          <div className="search-books-results">
            <ListBooks books={showingBooks} booksType='Found the following' moveBookShelf={moveBookShelf}/>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks