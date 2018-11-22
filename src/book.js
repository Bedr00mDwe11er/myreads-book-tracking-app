import React from 'react'
import BookShelfChanger from './bookShelfChanger.js'

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    
    //bind to this.
    this.changeShelf = this.changeShelf.bind(this);
  }
  
  /*
  changeShelf is a method that sends the book and user selected shelf
  as an agruments to moveBook method that moves the book instance to the shelf the user selected 
  moveBook is a method in the component that composes the book components, which is BookApp.
  */
  changeShelf(e) {
    this.props.moveBookToShelf(e, this);
  }
  
  render(){
    return(
      <li id={this.props.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:this.props.bookCover}}></div>
              <BookShelfChanger moveBookToShelf={(e)=>this.changeShelf(e)} shelf={this.props.shelf} />
          </div>
          <h3 className="book-title">{this.props.title}</h3>
          <p className="book-authors">{this.props.author}</p>
        </div>
      </li>
    );
  }
}