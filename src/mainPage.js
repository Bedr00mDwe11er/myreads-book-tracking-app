import React from 'react'
import BookShelves from './bookShelves.js'
import {
  Link
} from 'react-router-dom'

export default class MainPage extends React.Component {
  componentDidMount() {
    //when this component mounts let app know
    this.props.isMainPageLoaded();
    
    /*
    when mainPage component mounts call one of its props, which will call
    a methods from bookApp component that load up the new books
    */
    this.props.updateMainPage();
  }
   
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelves
            readsBooks={this.props.readsBooks}
            currentlyReadingsBooks={this.props.currentlyReadingBooks}
            wantToReadsBooks={this.props.wantToReadsBooks}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}