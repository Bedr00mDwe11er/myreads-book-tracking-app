import React from 'react'
import BookShelf from './bookShelf.js'

export default class BookShelves extends React.Component {
  render() {
    return(
      <div>
        <BookShelf
          bookShelfTitle={'Currently Reading'}
            books={this.props.currentlyReadingsBooks}
        />
        
        <BookShelf
          bookShelfTitle={'Want to Read'}
          books={this.props.wantToReadsBooks}
        />
        
        <BookShelf
          bookShelfTitle={'Read'}
          books={this.props.readsBooks}
        />
      </div>
    );
  }
}