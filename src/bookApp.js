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
    
    //bind methods to this.
    this.handleSearch = this.handleSearch.bind(this);
    this.searchPageLoaded = this.searchPageLoaded.bind(this);
    this.mainPageLoaded = this.mainPageLoaded.bind(this);
    this.moveBook = this.moveBook.bind(this);
    this.handleClearingSearchPage = this.handleClearingSearchPage.bind(this);
    this.handleSeachPagseUpdate = this.handleSeachPagseUpdate.bind(this);
    this.handleMainPageUpdate = this.handleMainPageUpdate.bind(this);
    
    //state for the app, lots of components relies on it
    this.state = {
      //shelves on the main page.
      currentlyReadingsBooks: '',
      wantToReadsBooks : '',
      readsBooks: '',
      none: '',
      //state for the search page
      searchPageBooks: '',
      shelfName:'',
      //page bools
      isSearchPageLoaded:false,
      isMainPageLoaded:false
    };
  }
  
  //moves the book to a shelf
  moveBook(newShelf,bookToBeMoved) {
    /*
    PARAMETER OVERIVEW
    __________________
    newShelf:
    --------
    newShelf is the shelf the book it to be moved to.
    It is a string of the shelf name.
    all lower case letters and no spaces.
    
    bookToBeMoved:
    -------------
    bookToBeMoved is the book that the user wants to move.
    It is of type object, it has the props of the book.
    */
    
    //moveBooks method operates differently depending on which page has loaded.
    if(this.state.isSearchPageLoaded === true) {
      //exit method when user selects these values on the bookShelfChanger component
      if(newShelf === 'none' || newShelf === 'move') {
        //TODO: create an option for the user to take book off the shelf, need a method in booksAPI that can also update local storage and remove book
        return 0;
      }
      
      //basic object just needs at a minimum an id attribute for update method
      let bookComponentData = {
        id: bookToBeMoved.props.id
      };
      
      //BooksAPI update method for information to persist between page refreshes.
      BooksAPI.update(bookComponentData, newShelf).then((argument)=> {
        //call handleSeachPagseUpdate with the updated search results as an argument
        this.handleSeachPagseUpdate(argument);
      }).catch(error => console.log(error));
         
    } else if(this.state.isMainPageLoaded) {
      // exit method when user select none or move
      if(newShelf === 'none' || newShelf === 'move') {
        return 0;
      }
      
      BooksAPI.getAll().then((argument) => {
      //location of the book.
      let index;
      
      //find books to be updated in the object, loop through it and find a match based on it's title
      for(let i = 0; i < argument.length; i++) {
        //when the title of the book to be moved matches the title of the book at index i
        if(argument[i].title === bookToBeMoved.props.title){
          //i is the location of the book; it's index
          index = i;
        }
      }
      
      //BooksAPI update method for information to persist between page refreshes. 
      BooksAPI.update(argument[index], newShelf).then((argument)=> {
        //data has been updated and the UI needs to reflect the changes.  
        this.handleMainPageUpdate(argument);
      }).catch(error => console.log(error));

    }).catch(error => console.log(error));
    } else {
      //if no page has loaded?
      console.log("TODO: not sure yet?");
    }
  //end of moveBook method
  }
  
  //updates search ensuring the books shown are up to date.
  handleSeachPagseUpdate(shelves) {
    //use this components shelfName state as an argument for when calling BooksAPI search method
    BooksAPI.search(this.state.shelfName,20).then((searchResults)=>{      
      //varible for the book component that will hold data representing a book from the search results
      let book;
      
      //bookGridArray will be used to hold the newly created book components
      let bookGridArray = [];
      
      //varibles for the book components props
      let authors;
      let title;
      let shelf;
      let id;
      let moveBookToShelf;
      let bookCover;
      
      //looping over the books found from the search results
      for(let i = 0; i < searchResults.length; i++){
        /*
        Overview:
        ---------
        look through searchResults
        if any of the book there are on a "shelf"
        then assign that books shelf prop to the shelf it is now on
        so that that the select shows it
        else the book is not shown as being on a shelf then its shelf prop should be none.
        */
    
        /*
        isBookOnShelf will be set to true if the search book is found in any of the shelves from main page
        only after all the "shelves" have been checked 
        */
        let isBookOnShelf;

        //bools that will be set to true if a book from search results is found on a shelf from a shelf on main page
        let isBookOnCurrentlyReading;
        let isBookOnWantToRead;
        let isBookOnRead;

        //check if the current book from the search results is on a shelf
        for(let a = 0; a < shelves.currentlyReading.length; a++) {
            if(searchResults[i].id === shelves.currentlyReading[a]) {
              isBookOnCurrentlyReading = true;
          }
        }
        
        for(let b = 0; b < shelves.wantToRead.length; b++){
            if(searchResults[i].id === shelves.wantToRead[b]) {
              
              isBookOnWantToRead = true;
          } 
        }
        
        for(let c = 0; c < shelves.read.length; c++){
            if(searchResults[i].id === shelves.read[c]) {
              isBookOnRead = true;
          }  
        }
        
        //was the book on a shelf?
        if(isBookOnCurrentlyReading === true || isBookOnWantToRead === true || isBookOnRead === true) {
          //book was found to be on a shelf set is book on shelf bool to true;
          isBookOnShelf = true;
        } else {
          //book was not on a shelf
          isBookOnShelf = false; 
          }
        
        //if the book was on a shelf, set shelf prop var to the shelf it was found on. else book was not on a shelf so set shelf prop var to none
        if(isBookOnShelf === true) {
          //set shelf var prop depending on the shelf it was found on...
          if(isBookOnCurrentlyReading === true) {  
            shelf = "currentlyReading";
          } else if (isBookOnWantToRead === true) {
              shelf = "wantToRead";
          } else if (isBookOnRead === true) {
              shelf = "read";
          } //TODO: add more else if chains when or if I add more shelves in the future
          
          } else {
            // book is not on a shelf 
            shelf = 'none';
          }
        
        //assign values to the prop vars
        authors = searchResults[i].authors;
        title = searchResults[i].title;
        id = searchResults[i].id;
        moveBookToShelf = this.moveBook;
        
        //if there is no image for the book cover don't use that prop
        if(searchResults[i].imageLinks === undefined) {  
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
            bookCover = `url(${searchResults[i].imageLinks.smallThumbnail})`;
            
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
        <div key={book.props.id.toString() + Math.random()}>
          {book}
        </div>
      );
      
      //update the books displayed in the searchPage
      this.setState(()=>{
        return {
          searchPageBooks: bookGrid
        }
      });
   
    }).catch(error => console.log(error)); 
  }
  
  //methods called when user types into the search
  handleSearch(userInput) {
    //save UserInput into a varible
    let savedUserInput = userInput.target.value;
      
    //update the shelf name to match the userInput
    this.setState(()=>{
      return{shelfName: savedUserInput}
    });
          
    //Search results are not shown when all of the text is deleted out of the search input box.
    if(savedUserInput === 0 || savedUserInput ===''){
      //empty out the books, 
      /*
        Using a delay or setTimeout to clear the books from the search page because,
        I noticed that back when I wasn't using the setTimeout there was an issue that would leave the books on the search page...
        Un altered if I had three or more letters in the search input and pressed backspace really fast or held it down.
        X-solution works as a patch, and there is better solution to be found.
      */
      setTimeout(()=>{  
        this.setState(()=>{
          return {
            searchPageBooks: ''
          }
      }, ()=>{
        console.log("books have been cleared");
      });
      }, 400);
       
    } else {  
           //search based on what the user typed into the search box.
           BooksAPI.search(savedUserInput,20).then((searchResults)=>{      
           
            //makeing a book component with data representing a book from the search results
            let book;

            //bookGridArray will be used to hold the newly created book components
            let bookGridArray = [];

            //varibles for the book components props
            let authors;
            let title;
            let shelf;
            let id;
            let moveBookToShelf;
            let bookCover;

            //looping over the books found from the search results
            for(let i = 0; i < searchResults.length; i++){
              /*
              look through searchResults
              if any of the book there are in a shelf check state shelf to see if it is
              then assign its shelf props to the shelf it is on so that that the select shows it as already on a shelf
              if the book is not shown as being on a shelf then its shelf prop should be none.
              */

              /*
              this bool will be set to true if the search book is found in any of the shelves from main page
              only after all the shelves have been checked and shelf will be set to the shelf its found on via other bools
              if it has not been found in any of the shelves then set it to false and the shelf var will be set to none
              */
              let isBookOnShelf;

              //bools that will be set to true if a book from search results is found on a shelf from a shelf on main page
              let isBookOnCurrentlyReading;
              let isBookOnWantToRead;
              let isBookOnRead;

              //check if the book from the search results is in CurrentlyReadingsbooks
              for(let a = 0; a < this.state.currentlyReadingsBooks.length; a++) {
                if(typeof(this.state.currentlyReadingsBooks[a]) !== 'undefined') {
                  if(searchResults[i].id === this.state.currentlyReadingsBooks[a].props.children.props.id) {
                    //
                    isBookOnCurrentlyReading = true;
                  }
                }
              }

              //check if the book from search results is in WantToReadsBooks
              for(let b = 0; b < this.state.wantToReadsBooks.length; b++){
                //prevent error by checking if that index is empty or undefined.
                if(typeof(this.state.wantToReadsBooks[b]) !== 'undefined') {
                  if(searchResults[i].id === this.state.wantToReadsBooks[b].props.children.props.id) {
                    //book was found on this shelf set bool to true
                    isBookOnWantToRead = true;
                  } 
                } 
              }

              //check if the book from search results is in ReadsBooks
              for(let c = 0; c < this.state.readsBooks.length; c++){
                if(typeof(this.state.readsBooks[c]) !== 'undefined') {
                  if(searchResults[i].id === this.state.readsBooks[c].props.children.props.id) {
                    isBookOnRead = true;
                  }
                }  
              }

              //was the book on a shelf?
              if(isBookOnCurrentlyReading === true || isBookOnWantToRead === true || isBookOnRead === true) {
                //book was found to be on a shelf set is book on shelf bool to true;
                isBookOnShelf = true;
              } else {
                //book was not on a shelf
                isBookOnShelf = false; 
                }

              //if the book was on a shelf, set shelf prop var to the shelf it was found on. else book was not on a shelf so set shelf prop var to none
              if(isBookOnShelf === true) {
                //set shelf var prop depending on the shelf it was found on...
                if(isBookOnCurrentlyReading === true) {  
                  shelf = "currentlyReading";
                } else if (isBookOnWantToRead === true) {
                    shelf = "wantToRead";
                  } else if (isBookOnRead === true) {
                      shelf = "read";
                    } 
              } else {
                  // book is not on a shelf 
                  shelf = 'none';
                }

              //assign values to the prop vars
              authors = searchResults[i].authors;
              title = searchResults[i].title;
              id = searchResults[i].id;
              moveBookToShelf = this.moveBook;

              // if there is no image for the book cover don't use that prop
              if(searchResults[i].imageLinks === undefined) {  
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
                  bookCover = `url(${searchResults[i].imageLinks.smallThumbnail})`;

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
                <div key={book.props.id.toString() + Math.random()}>
                  {book}
                </div>
                );

            //update the books displayed in the searchPage
            this.setState(()=>{
              return {
                searchPageBooks: bookGrid
              }
            });

          }).catch(error => console.log(error));
        
        }
      
    //end of method
  }
   
  //searchPage has loaded method
  searchPageLoaded() {
    //setState to set the state of bool that indicate if the search page has been rendered
    this.setState(() => {
     return {
       isSearchPageLoaded: true,
       isMainPageLoaded: false
     }
   });
  }
  
  //main page has loaded method
  mainPageLoaded() {
    this.setState(() => {
      return {
        isSearchPageLoaded: false,
        isMainPageLoaded: true
      }
    });
  }
  
  //updates main page ensuring the books shown are up to date.
  handleMainPageUpdate() {
    /*compose the book components for the mainPage*/
    
    //Each of the following three arrays is a shelf.
    let currentlyReadingsBooksArray = [];
    let wantToReadsBooksArray = [];
    let readsBooksArray = [];
      
    //get the books from the BooksAPI, set up book components for main page, place book components onto the shelves 
    BooksAPI.getAll().then((argument) => {
      //varibles for book components the props. TODO: add more props to book component
      let author;
      let title;
      let bookCover;
      let shelf;
      let id;
      let moveBookToShelf;
           
      //create instances of the book component that correspond to the books from the BooksAPI
      for(let i = 0; i < argument.length; i++) {
        //prop varibles are given values that matches some of the books key/values from BooksAPI
        author = argument[i].authors;
        title = argument[i].title;
        bookCover = `url(${argument[i].imageLinks.smallThumbnail})`;
        shelf = argument[i].shelf;
        id = argument[i].id;
        moveBookToShelf = this.moveBook;
              
        //compose a book component
        let book =
            <Book
              author={author}
              title={title}
              bookCover={bookCover}
              shelf={shelf}
              id={id}
              moveBookToShelf={moveBookToShelf}
            />;
        
        //place the "book"/book Component onto/into the right "shelf"/ array
        if(book.props.shelf === "read") {
          readsBooksArray[i] = book;
        } else if(book.props.shelf === "wantToRead") {
            wantToReadsBooksArray[i] = book;
        } else if(book.props.shelf ==="currentlyReading") {
            currentlyReadingsBooksArray[i] = book;
        } else { currentlyReadingsBooksArray[i] = book;}
        //end of for loop
        }
        
      
      /*
      new arrays based on the old arrays,
      each book from old array gets nested into a div
      and each div gets a unique key,
      then pushed into new array
      */
      let readsBooks = readsBooksArray.map((book) =>
        <div key={book.props.id.toString() + Math.random()}>
          {book}
        </div>
      );
        
      let wantToReadsBooks = wantToReadsBooksArray.map((book) =>
        <div key={book.props.id.toString() + Math.random()}>
          {book}
        </div>
      );
        
      let currentlyReadingsBooks = currentlyReadingsBooksArray.map((book) =>
        <div key={book.props.id.toString() + Math.random()}>
          {book}
        </div>
      );
        
      //update the state with books on the shelves
      this.setState(()=>{
        return {
          currentlyReadingsBooks: currentlyReadingsBooks,
          wantToReadsBooks: wantToReadsBooks,
          readsBooks: readsBooks
        }
      });
    }).catch(error=>console.log(error));
  }
  
  //handles clean up for search page
  handleClearingSearchPage() {
   /*
    TODO: clear out the books on the search page and clear out the shelfName too
   */
   console.log('cleaning search page');
   this.setState(() => {
     return{
       searchPageBooks: '',
       shelfName: ''
     }
   });
 }
  
  render() {
    return (
      <Router>
        <div className="app">   
          <Route path='/search' render={() => (
             <SearchPage
               searchPageBooks={this.state.searchPageBooks}
               handleSearch={this.handleSearch}
               shelfName={this.state.shelfName}
               isSearchPageLoaded={this.searchPageLoaded}
               cleanUpSearchPage={this.handleClearingSearchPage}
             />
           )}/>

          <Route exact path='/' render={() => (
             <MainPage 
               readsBooks={this.state.readsBooks}
               currentlyReadingBooks={this.state.currentlyReadingsBooks}
               wantToReadsBooks={this.state.wantToReadsBooks}
               isMainPageLoaded={this.mainPageLoaded}
               updateMainPage={this.handleMainPageUpdate}
             />
           )}/>
             
        </div>
      </Router>
    );
  }
}

export default BooksApp