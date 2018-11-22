import React from 'react'
import BookShelf from './bookShelf.js'
import {
  Link
} from 'react-router-dom'

export default class SearchPage extends React.Component {
  componentDidMount() {
    /*
    component did mount
    to call a props on the search page that contains a methods from app as a value
    that method will get called and in that method i'll use setState to set the state of bool that indicate if the search page has been rendered
    */
    this.props.isSearchPageLoaded();
  }
  
  componentWillUnmount() {
    //clear search page when user leaves the page
    this.props.cleanUpSearchPage();
  }
  
  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.props.handleSearch(e)}/>  
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf
              bookShelfTitle={this.props.shelfName}
              books={this.props.searchPageBooks}
            />
          </ol>
        </div>
      </div>
    );
  }
}