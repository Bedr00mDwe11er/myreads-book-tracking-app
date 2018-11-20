import React from 'react'
import BookShelves from './bookshelves.js'
import {
  Link
} from 'react-router-dom'

export default class MainPage extends React.Component {
  
  componentDidMount() {
    console.log("main page component has mounted");
    this.props.isMainPageLoaded();
  }
  
    
  render(){
    return(
      <div className="list-books">
      	<div className="list-books-title">
      		<h1>MyReads</h1>
      	</div>
      	<div className="list-books-content">
      		<BookShelves ReadsBooks={this.props.ReadsBooks} CurrentlyReadingsbooks={this.props.CurrentlyReadingbooks} WantToReadsBooks={this.props.WantToReadsBooks} />
      	</div>
      	<div className="open-search">
        	<Link to='/search'>Add a book</Link>
      	</div>
      </div>
    );
  }
}