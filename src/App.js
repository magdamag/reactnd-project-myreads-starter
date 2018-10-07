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

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  moveBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks()
    })
  }

  render() {
    const { books } = this.state

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
