import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MainPage from './mainPage.js'
import SearchPage from './searchPage.js'
import Book from './book.js'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    
    //bind search handler
    this.handleSearch = this.handleSearch.bind(this);
    
    //bind for search page loaded?
    this.searchPageLoaded = this.searchPageLoaded.bind(this);
    
    //bind for main page loaded?
    this.mainPageLoaded = this.mainPageLoaded.bind(this);
    
    //move book
    this.moveBook = this.moveBook.bind(this);
    
    //compose the book components for the mainPage
    //Each of the following three arrays is a shelf.
    let CurrentlyReadingsbooksArray = [];
    let WantToReadsBooksArray = [];
    let ReadsBooksArray = [];
      
   //get the books from the BooksAPI... mainpage book process
    BooksAPI.getAll().then((argument) => {
      //check the value of the argument.
      console.log(argument);
      
      //varibles for the props
      let author;
      let title;
      let bookCover;
      let shelf;
      let id;
      let moveBookToShelf;
           
      //create instances of the book component that correspond to books from the BooksAPI
      for(let i = 0; i < argument.length; i++) {
        //assign values to the varible props
        author = argument[i].authors;
        title = argument[i].title;
        bookCover = `url(${argument[i].imageLinks.smallThumbnail})`;
        shelf = argument[i].shelf;
        id = argument[i].id;
        moveBookToShelf = this.moveBook;
     
        
        //create a book
        let book =
            <Book
              author={author}
              title={title}
              bookCover={bookCover}
              shelf={shelf}
              id={id}
              moveBookToShelf={moveBookToShelf}
            />;
        
        //place the "book"/bookComponent onto/into the right "shelf"/ array
        if(book.props.shelf === "read") {
          ReadsBooksArray[i] = book;
        } else if(book.props.shelf === "wantToRead") {
            WantToReadsBooksArray[i] = book;
        } else if(book.props.shelf ==="currentlyReading") {
            CurrentlyReadingsbooksArray[i] = book;
        } else { CurrentlyReadingsbooksArray[i] = book;}
        //end of for loop
      }
      
      //Create new array based of the ReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
      let ReadsBooks = ReadsBooksArray.map((book) =>
        <div key={book.props.id.toString()}>
          {book}
        </div>
      );
      
      //Create new array based of the WantToReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
      let WantToReadsBooks = WantToReadsBooksArray.map((book) =>
        <div key={book.props.id.toString()}>
          {book}
        </div>
      );
      
      //Create new array based of the CurrentlyReadingBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
      let CurrentlyReadingsbooks = CurrentlyReadingsbooksArray.map((book) =>
        <div key={book.props.id.toString()}>
          {book}
        </div>
      );
      
      //update the state
      this.setState(()=>{
            return {
              CurrentlyReadingsbooks: CurrentlyReadingsbooks,
              WantToReadsBooks: WantToReadsBooks,
              ReadsBooks: ReadsBooks
              }
          });
      }).catch(error=>console.log(error));

    //generate books for the search page
    

    this.state = {
      //state for the shelfs on main page
      CurrentlyReadingsbooks: '',
      WantToReadsBooks : '',
      ReadsBooks: '',
      none: '',
      //state for the search page
      searchPageBooks: '',
      shelfName:'',
      //page bool
      isSearchPageLoaded:false,
      isMainPageLoaded:false
    };

  } 
  
  //method for moving books
  moveBook(newShelf,bookToBeMoved) {
    /*
      if the page has just loaded don't follow through with the move process
      
    */
    
    
    /*
    PARAMETER OVERIVEW
    __________________
    newShelf:
    --------
    newShelf is the shelf the
    book it to be moved to, selected by the user.
    It is a string, of the shelf name,
    in the form of all lower case letters and
    no spaces.
    
    bookToBeMoved:
    -------------
    bookToBeMoved is the book that the user wants to move.
    It is of type object, it has the props of the book.
    */
    
    /*
    moving the books to the shelf depends on which page is rendered using the bools in state that represent that
    */
    if(this.state.isSearchPageLoaded === true){
      /*book from search page moves to main page
        but update isnt updating the backend?
        so, info doesnt persist...
        just watch some videos for now
        
        
      */
      //
      if(newShelf === 'none' || newShelf === 'move'){return 0;}
      
      //unpackage the books component into a more basic object?
      console.log(bookToBeMoved);
	  
      //basic object varible just needs at a minimum an id attribute for update method
	  let bookComponentData = {
        id: bookToBeMoved.props.id
      };
	  console.log(bookComponentData);

      //update
      BooksAPI.update(bookComponentData, newShelf).then((argument)=> {
        BooksAPI.getAll().then((argument) => {
        console.log(argument);
        //Each of the following three arrays is a shelf.
        let CurrentlyReadingsbooksArray = [];
        let WantToReadsBooksArray = [];
        let ReadsBooksArray = [];
          
        //varibles for the props
        let author;
        let title;
        let bookCover;
        let shelf;
        let id;
        let moveBookToShelf;
        
        //create instances of the book component that correspond to books from the BooksAPI
        for(let i = 0; i < argument.length; i++) {
          //assign values to the varible props
          author = argument[i].authors;
          title = argument[i].title;
          bookCover = `url(${argument[i].imageLinks.smallThumbnail})`;
          shelf = argument[i].shelf;
          id = argument[i].id;
          moveBookToShelf = this.moveBook;
          
          //create a book
          let book =
          <Book
          author={author}
          title={title}
          bookCover={bookCover}
          shelf={shelf}
          id={id}
          moveBookToShelf={moveBookToShelf}
          />;
          
          //place the "book" into one of the "shelves"
          if(book.props.shelf === "read") {
            ReadsBooksArray[i] = book;
          } else if(book.props.shelf === "wantToRead") {
            WantToReadsBooksArray[i] = book;
          } else if(book.props.shelf ==="currentlyReading") {
            CurrentlyReadingsbooksArray[i] = book;
          } else {
            CurrentlyReadingsbooksArray[i] = book;
          }
          //end of for loop...
        }
        
        //TODO: add searchBooks
        //create book component based of the books to be moved
            console.log(bookToBeMoved)
            //Re-assign values to the varible props
            author = bookToBeMoved.props.author;
            title = bookToBeMoved.props.title;
            bookCover = bookToBeMoved.props.bookCover;
            shelf = newShelf;
            id = bookToBeMoved.props.id;
            moveBookToShelf = this.moveBook;
            
            //book component matching the book selected by the user
            let book =
            <Book
            author={author}
            title={title}
            bookCover={bookCover}
            shelf={shelf}
            id={id}
            moveBookToShelf={moveBookToShelf}
            />;
            
             //add search book into the shelf on main page
  			//TODO: set up condinal that handle which array/shelf to add search book to , use newShelf
            if(newShelf === 'currentlyReading') {
              CurrentlyReadingsbooksArray.push(book);
            } else if(newShelf === 'wantToRead') {
              WantToReadsBooksArray.push(book);
            } else if(newShelf === 'read') {
              ReadsBooksArray.push(book);
            }
           
            
            
        
        
        //Create new array based of the ReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let ReadsBooks = ReadsBooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
          );
          
        //Create new array based of the WantToReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let WantToReadsBooks = WantToReadsBooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
        );
          
        //Create new array based of the CurrentlyReadingBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let CurrentlyReadingsbooks = CurrentlyReadingsbooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
        );
          
        //update state
        this.setState(()=>{
          return {
            CurrentlyReadingsbooks: CurrentlyReadingsbooks,
            WantToReadsBooks: WantToReadsBooks,
            ReadsBooks: ReadsBooks
          }
          
        });
      }).catch(error => console.log(error));
      }).catch(error => console.log(error));
       
     
      
         
    } else if(this.state.isMainPageLoaded) {
      
      if(newShelf === 'none' || newShelf === 'move'){return 0;}
      //if main page "loaded"
      console.log("Main page Loaded");
      BooksAPI.getAll().then((argument) => {
      //location of the book.
      let index;
      console.log(bookToBeMoved)
      //find books to be updated in the object loop through it and find a match based on it's title
      for(let i = 0; i < argument.length; i++) {
        //when the title of the book to be moved matches the title of the book at index i
        if(argument[i].title === bookToBeMoved.props.title){
          //i is the location of the book it's index
          index = i;
        }
      }
      console.log(argument[index]);
      //update for page persistance if thats a word
      BooksAPI.update(argument[index], newShelf).then((argument)=> {
        console.log(argument);
        /*
          TODO: remove book from main page shelf when the user selects none
          
          if the shelf select is none
          then remove it via pop and update...
        */
        
      BooksAPI.getAll().then((argument) => {
        //Each of the following three arrays is a shelf.
        let CurrentlyReadingsbooksArray = [];
        let WantToReadsBooksArray = [];
        let ReadsBooksArray = [];
        
        //varibles for the props
        let author;
        let title;
        let bookCover;
        let shelf;
        let id;
        let moveBookToShelf;
        
        //create instances of the book component that correspond to books from the BooksAPI
        for(let i = 0; i < argument.length; i++) {
          //assign values to the varible props
          author = argument[i].authors;
          title = argument[i].title;
          bookCover = `url(${argument[i].imageLinks.smallThumbnail})`;
          shelf = argument[i].shelf;
          id = argument[i].id;
          moveBookToShelf = this.moveBook;
          
          //create a book
          let book =
          <Book
          author={author}
          title={title}
          bookCover={bookCover}
          shelf={shelf}
          id={id}
          moveBookToShelf={moveBookToShelf}
          />;
          
          //place the "book" into one of the "shelves"
          if(book.props.shelf === "read") {
            ReadsBooksArray[i] = book;
          } else if(book.props.shelf === "wantToRead") {
            WantToReadsBooksArray[i] = book;
          } else if(book.props.shelf ==="currentlyReading") {
            CurrentlyReadingsbooksArray[i] = book;
          } else {
            CurrentlyReadingsbooksArray[i] = book;
          }
          //end of for loop...
        }
        
        //Create new array based of the ReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let ReadsBooks = ReadsBooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
          );
          
        //Create new array based of the WantToReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let WantToReadsBooks = WantToReadsBooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
        );
          
        //Create new array based of the CurrentlyReadingBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let CurrentlyReadingsbooks = CurrentlyReadingsbooksArray.map((book) =>
          <div key={book.props.id.toString()}>
            {book}
          </div>
        );
          
        //update state
        this.setState(()=>{
          return {
            CurrentlyReadingsbooks: CurrentlyReadingsbooks,
            WantToReadsBooks: WantToReadsBooks,
            ReadsBooks: ReadsBooks
          }
        });
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
      
    }).catch(error => console.log(error));
	  //books have been moved exit process
	  return 0;
    } else {
      //if no page is loaded...
      console.log("no page, TODO: handle this case later if or when it happens");
    }
    
  }


  
  //methods called when user types into the search
  handleSearch(userInput) {

    
    
    //save UserInput into a varible
    let savedUserInput = userInput.target.value;
          
    //this is what the user typed into the search box
    console.log("This is what the user typed into the input field: " + savedUserInput);
      
    //update the shelf name
    this.setState(()=>{
      return{shelfName: savedUserInput}
    });
          
    //Search results are not shown when all of the text is deleted out of the search input box.
    if(savedUserInput === 0 || savedUserInput ===''){
      //empty out the books
      setTimeout(()=>{  
        this.setState(()=>{
          return {searchPageBooks: ''}
      }, ()=>{console.log("a");});}, 500);  
      }else{  
        //search for the based on what the user typed into the search box
        BooksAPI.search(savedUserInput,20).then((e)=>{
        //TODO: for code readability change the name of the argument used from "e" to "searchResults"
              
        //book will be a book compoent with data representing a book from the search results
        let book;
          
        //bookGridArray will be used to hold the newly created book components
        let bookGridArray = [];
        
        //varibles for the props
        let authors;
        let title;
        let shelf;
        let id;
        let moveBookToShelf;
        let bookCover;
        
        //looping over the books found from the search results
        for(let i = 0; i < e.length; i++){
          /*
         TODO:
         look through search page books 'e'
         if any of the book there are in a shelf ... check state to see if it is
         then assign its shelf props to the shelf it is on so that that the select shows it as already on a shelf
         
         if the book is not shown as being on a shelf then its shelf prop should be none.
        */
        console.log(this.state);
         
        //is the book already in CurrentlyReadingsbooks
          //loop through the book in state for currently reading
          //compare e[i].id to  CurrentlyReadingsbooks[a].key,  
          //if there is match then set shelf to "currentlyReading"
          //if there is no match set shelf to "none"
         for(let a = 0; a < this.state.CurrentlyReadingsbooks.length; a++){
           
           if(typeof(this.state.CurrentlyReadingsbooks[a]) !== 'undefined') {
             if(e[i].id === this.state.CurrentlyReadingsbooks[a].key) {
             shelf = "currentlyReading";
              } else {
                shelf = "none"
              }
           }
         }
          
          
        //is the book already in WantToReadsBooks
        //loop through the book in state for WantToRead
          //compare e[i].id to  WantToReadsBooks[a].key,  
          //if there is match then set shelf to "wantToRead"
          //if there is no match set shelf to "none" 
        
          for(let b = 0; b < this.state.WantToReadsBooks.length; b++){
            console.log(this.state.WantToReadsBooks[b]);
           if(typeof(this.state.WantToReadsBooks[b]) !== 'undefined') {
            if(e[i].id === this.state.WantToReadsBooks[b].key) {
             shelf = "wantToRead";
              } else {
                shelf = "none"
              }
           } 
             
           
           
         }
          
          
        //is the book in ReadsBooks
        //loop through the book in state for ReadsBooks
          //compare e[i].id to  ReadsBooks[a].key,  
          //if there is match then set shelf to "read"
          //if there is no match set shelf to "none"
          for(let c = 0; c < this.state.ReadsBooks.length; c++){
           if(typeof(this.state.ReadsBooks[c]) !== 'undefined') {
             if(e[i].id === this.state.ReadsBooks[c].key) {
             shelf = "read";
              } else {
                shelf = "none"
              }
           }
            
             
           
           
         }
          
          
          //assign values to the prop vars
          authors = e[i].authors
          title = e[i].title
          id = e[i].id;
          moveBookToShelf = this.moveBook
            
          // if there is no image for the book cover don't use that prop
          if(e[i].imageLinks === undefined) {  
            //create a book compoent based of the book found at index i in the books from the search result or "e".
            book = <Book
            author={authors}
            title={title}
            shelf={shelf}
            id={id}
            moveBookToShelf={moveBookToShelf}
            />;
          } else {
            //else go ahead and use the prop for the bookcover
            
            //var for book cover
            bookCover = `url(${e[i].imageLinks.smallThumbnail})`
               
            //create a book compoent based of the book found at index i in the books from the search result or "e".
            book = <Book
              author={authors}
              title={title}
              bookCover={bookCover}
              shelf={shelf}
              id={id}
              moveBookToShelf={moveBookToShelf}
            />;
          }
          
          //add the new book component bookGridArray
          bookGridArray[i] = book; 
          }
         
          //Create new array based of the ReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
          let bookGrid = bookGridArray.map((book) =>
            <div key={book.props.id.toString()}>
              {book}
            </div>
          );
          
          //update the books displayed in the searchPage
          this.setState(()=>{
            return {searchPageBooks: bookGrid}
          })
          }).catch(error => console.log(error));
        }
      }

 //searchPage has loaded method
 searchPageLoaded() {
   console.log("Search page loaded");
   //setState to set the state of bool that indicate if the search page has been rendered
   this.setState(() => {
     return{
       isSearchPageLoaded: true,
       isMainPageLoaded: false
           }
   });
   
 }
  
  //main page has loaded method
  mainPageLoaded() {
    console.log("App now knows that main page is the page that is showing.");

	this.setState(() => {
      return {
        isSearchPageLoaded: false,
        isMainPageLoaded: true
      }
    });
  }

  render() {
    return (
      <Router>
       <div className="app">
         <Route path='/search' render={() => (
           <SearchPage searchPageBooks={this.state.searchPageBooks} handleSearch={this.handleSearch} shelfName={this.state.shelfName} isSearchPageLoaded={this.searchPageLoaded} />
         )}/>
         
         <Route exact path='/' render={() => (
           <MainPage 
             ReadsBooks={this.state.ReadsBooks}
             CurrentlyReadingbooks={this.state.CurrentlyReadingsbooks}
             WantToReadsBooks={this.state.WantToReadsBooks}
             isMainPageLoaded={this.mainPageLoaded}
            />
          )}/>
             
       </div>
      </Router>
    )
  }
}

export default BooksApp