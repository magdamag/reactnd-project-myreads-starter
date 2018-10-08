# reactnd-project-myreads-starter

> Simple React web application for searching and organising books on the shelf.

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Usage

Customer is presented with three types of shelfs:

* Currently reading
* Want to Read
* Read

If a book doesn't belong to any, it's shelf is setup to _none_.
Throughout the app the shelf of the book is remembered regardless of currently displayed screen (list and search).
The search starts immediately upon user typing in concent into search bar.

## Acknowledgments

reactnd-project-myreads-starter was forked and inspired by original Udacity React course!
