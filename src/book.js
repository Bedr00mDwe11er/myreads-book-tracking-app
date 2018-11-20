import React from 'react'
import BookShelfChanger from './bookShelfChanger.js'

export default class Book extends React.Component {
  constructor(props) {
        super(props);
        //binding is necessary for the callback
        this.changeShelf = this.changeShelf.bind(this);
    	console.log(this.props);
        }
  
  //this method checks which shelf was selected.
  changeShelf(e) {
    //calls the methods on the bookShelves component
    console.log('2');
    console.log(e);
    //console.log(props);
    console.log(this.props);
    this.props.moveBookToShelf(e, this);
  }
  
  render(){
    return(
      <li id={this.props.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`${this.props.bookCover}`}}></div>
              <BookShelfChanger moveBookToShelf={(e)=>this.changeShelf(e)} shelf={this.props.shelf} />
            </div>
          <h3 className="book-title">{this.props.title}</h3>
         <p className="book-authors">{this.props.author}</p>
      </div>
        </li>
          );
      }
  }