
  //method for moving books
  componentDidUpdate(newShelf,bookToBeMoved) {
    /*
      if the page has just loaded don't follow through with the move process
      
    */
    console.log(bookToBeMoved);
	if(bookToBeMoved.ReadsBooks === '' && bookToBeMoved.CurrentlyReadingsbooks === '' && bookToBeMoved.WantToReadsBooks === ''){
      console.log("a books has not been select to be moved by the user");
      //since no books has been selected to move exit this process
      return 0;
    }
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
    
    //for now just exit the method if the user selects none
    if(newShelf === 'none'){return 0;}
    
    /*
    moving the books to the shelf depends on which page is rendered using the bools in state that represent that
    */
    if(this.state.isSearchPageLoaded === true){
      //
      console.log(newShelf);
      console.log(bookToBeMoved);
      console.log(typeof bookToBeMoved);
      
      /*book from search page moves to main page
        but update isnt updating the backend?
        so, info doesnt persist...
        just watch some videos for now
        
      */
       
      //update for page persistance if thats a word
      BooksAPI.update(bookToBeMoved, newShelf).then((argument)=> {
        console.log(argument);
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
          moveBookToShelf = this.componentDidUpdate;
          
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
            
            //Re-assign values to the varible props
            author = bookToBeMoved.props.author;
            title = bookToBeMoved.props.title;
            bookCover = bookToBeMoved.props.bookCover;
            shelf = bookToBeMoved.props.shelf;
            id = bookToBeMoved.props.id;
            moveBookToShelf = this.componentDidUpdate;
            
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
       

            
            
  
  			//add search book into the shelf on main page
  			//TODO: set up condinal that handle which array/shelf to add search book to , use newShelf
            ReadsBooksArray.push(book)
            
        
        
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
      //if main page "loaded"
      console.log("Main page Loaded");
      BooksAPI.getAll().then((argument) => {
      //location of the book.
      let index;
      
      //find books to be updated in the object loop through it and find a match based on it's title
      for(let i = 0; i < argument.length; i++) {
        //when the title of the book to be moved matches the title of the book at index i
        if(argument[i].title === bookToBeMoved.props.title){
          //i is the location of the book it's index
          index = i;
        }
      }
      
      //update for page persistance if thats a word
      BooksAPI.update(argument[index], newShelf).then(()=> {
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
          moveBookToShelf = this.componentDidUpdate;
          
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
    } else {
      //if no page is loaded...
      console.log("no page, TODO: handle this case later if or when it happens");
    }
    
  }