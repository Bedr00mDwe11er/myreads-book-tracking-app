import React from 'react'
import BookShelf from './bookShelf.js'
import {
  Link
} from 'react-router-dom'

export default class SearchPage extends React.Component {
  /*
   component did mount
   to call a props on the search page that contains a methods from app as a value
   that method will get called and in that method i'll use setState to set the state of bool that indicate if the search page has been rendered
   
   TODO: do the same for mainPage maybe?
  */
  componentDidMount() {
    console.log("Search page is up");
    this.props.isSearchPageLoaded();
  }
  
  componentWillUnmount() {
   // clean up
        /*
    	if the user does not empty out the input field and goes back to main page clear out the search so when they return nothing is showing
    */
   //if() {}
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