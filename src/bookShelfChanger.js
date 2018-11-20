import React from 'react'

export default class BookShelfChanger extends React.Component {
 constructor(props) {
   super(props);
   this.handleChange = this.handleChange.bind(this);
 }
  handleChange(e) {
    //calls the methods on the bookShelves component
    console.log(1);
    this.props.moveBookToShelf(e.target.value,this);
  }
  
  render() {
    return(
      <div className="book-shelf-changer">
        <select value={this.props.shelf} onChange={(e) => this.handleChange(e)}  name="book-shelf">
          <option value="move">Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}