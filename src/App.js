import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import ListBooksAll from './ListBooksAll';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  // Fetch all books API
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Fetch all books
  componentDidMount() {
    this.getBooks()
  }

  // Move the book onto shelf
  moveBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks()
    })
  }

  render() {
    const { books } = this.state

    // Either display list or search screen
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooksAll
            books={books}
            moveBookShelf={this.moveBookShelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            moveBookShelf={this.moveBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
