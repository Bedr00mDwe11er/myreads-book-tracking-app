import React from 'react'

export default class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/*
              Books live in the state of the bookApp component
            */}
            {this.props.books}
          </ol>
        </div>
      </div>
    );
  }
}