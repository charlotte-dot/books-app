{ 
    'use strict';
  
    const select = {
      books: {
        bookList: '.books-list',
        bookImage: '.book__image',
        bookImageAttrib: 'data-id',
      },
      templateOf: {
        bookTemplate: '#template-book',
        },
      referenceTo: {
        filterClass: '.filters',
        },
    };
    const templates = {
        bookCard: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
      };

    render() {
        const thisBook = this;
        for (const book of dataSource.books){
          const generatedHTML = templates.bookCard(book);
          const element = utils.createDOMFromHTML(generatedHTML);
          thisBook.listOfBooks.appendChild(element);
        }
    }

    initActions(){
    const thisBook = this;
    const favoriteBooks = [];
    thisBook.element = document.querySelector(select.books.bookList);

    thisBook.element.addEventListener('dblclick', function(event){
        event.preventDefault();
        const targetedElement = event.target.offsetParent;
        const bookId = targetedElement.getAttribute(select.books.bookImageAttrib);
        if(!targetedElement.classList.contains('favorite')) {
          targetedElement.classList.add('favorite');
          favoriteBooks.push(bookId);
          console.log(favoriteBooks);
        }
        else {
            targetedElement.classList.remove('favorite');
            const index = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(index, 1);
            console.log(favoriteBooks);
          }
        });
    }
    const filters = [];
    const filter = document.querySelector(select.referenceTo.filterClass);
    filter.addEventListener('click', function (event) {
    const filterValue = event.target.value;

    if (
        event.target.tagName == 'INPUT'
        &&
        event.target.type == 'checkbox'
        &&
        event.target.name == 'filter') {

        if (event.target.checked == true) {
          filters.push(filterValue);
          console.log(filters);

        } else {

          const indexOfFilter = filters.indexOf(filterValue);
          filters.splice(indexOfFilter, 1);
}