import React from 'react'
import BookShelf from './bookShelf.js'

export default class BookShelves extends React.Component {
        render() {
            return(
            <div>
                <BookShelf
                bookShelfTitle={'Currently Reading'}
                books={this.props.CurrentlyReadingsbooks}
                 />

                 <BookShelf
                bookShelfTitle={'Want to Read'}
                books={this.props.WantToReadsBooks}
                 />

                 <BookShelf
                bookShelfTitle={'Read'}
                books={this.props.ReadsBooks}
                 />
            </div>
                );
        }
}