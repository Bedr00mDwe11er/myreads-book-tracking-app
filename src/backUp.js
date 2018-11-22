// place this at line 168 if solution doesnt work out ... right after update call on search page move book.
BooksAPI.getAll().then((argument) => {
        //Each of the following three arrays is a shelf.
        let currentlyReadingsBooksArray = [];
        let wantToReadsBooksArray = [];
        let readsBooksArray = [];
          
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
            readsBooksArray[i] = book;
          } else if(book.props.shelf === "wantToRead") {
            wantToReadsBooksArray[i] = book;
          } else if(book.props.shelf ==="currentlyReading") {
            currentlyReadingsBooksArray[i] = book;
          } else {
            currentlyReadingsBooksArray[i] = book;
          }
          //end of for loop...
        }
        
        //create book component based of the books to be moved
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
        //push book component to the array that match what the user select as shelf    
        if(newShelf === 'currentlyReading') {
          currentlyReadingsBooksArray.push(book);
        } else if(newShelf === 'wantToRead') {
          wantToReadsBooksArray.push(book);
        } else if(newShelf === 'read') {
          readsBooksArray.push(book);
        }
        
        //Create new array based of the ReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let readsBooks = readsBooksArray.map((book) =>
          <div key={book.props.id.toString() + Math.random()}>
            {book}
          </div>
        );
          
        //Create new array based of the WantToReadsBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let wantToReadsBooks = wantToReadsBooksArray.map((book) =>
          <div key={book.props.id.toString() + Math.random()}>
            {book}
          </div>
        );
          
        //Create new array based of the CurrentlyReadingBooksArray, each books gets nested into a div and each div gets a key based on the books id prop
        let currentlyReadingsBooks = currentlyReadingsBooksArray.map((book) =>
          <div key={book.props.id.toString() + Math.random()}>
            {book}
          </div>
        );
         
        //update state to update the books on the shelves
        this.setState(()=>{
          return {
            currentlyReadingsBooks: currentlyReadingsBooks,
            wantToReadsBooks: wantToReadsBooks,
            readsBooks: readsBooks
          }  
        });
        
        /*
          now that the state for main page is has been taken care of
          I need to update the state of search page to update the or re-render the books on the search page
          the api has already been updated... i just need to re render the book that has been "moved" 
          TODO: I would like to just re-render the bookShelfChanger but i can't think of way to do that right now.
          I could just re-rerender all of the books in the search page after the user moves it... not ideal but it works :(
          
          re-render the books on search page
        */
         //

      }).catch(error => console.log(error));