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

    const booksList = document.querySelector(select.books.bookList);

    function render() {
        for (const book of dataSource.books){
          const ratingBgc = determineRatingBgc(book.rating);
          const ratingWidth = book.ratingBgc * 10;
          const generatedHTML = templates.bookCard(book);
          const element = utils.createDOMFromHTML(generatedHTML);
          booksList.appendChild(element);
        }
    }

    function initActions(){

        const favoriteBooks = [];

        booksList.element.addEventListener('dblclick', function(event){
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

        const filters = [];
        const filtersContainer = document.querySelector(select.referenceTo.filterClass);

        filtersContainer.addEventListener('click', function (event) {

        if (
            event.target.tagName == 'INPUT'
            &&
            event.target.type == 'checkbox'
            &&
            event.target.name == 'filter'
        ) {
        
            const filterValue = event.target.value;

            if (event.target.checked == true) {
            filters.push(filterValue);
            console.log(filters);
            } else {
            const indexOfFilter = filters.indexOf(filterValue);
            filters.splice(indexOfFilter, 1);
            }
        }
        function filterBooks(){

          for(let book of dataSource.books){
      
            let shouldBeHidden = false;
      
            for(const filter of filters){
              if(!book.details[filter]){
                shouldBeHidden = true;
                break;
              }
            }
            const id = book.id;
            console.log(id);
             
            const item = document.querySelector('.book__image[data-id="'+id+'"]');
          
            if(shouldBeHidden == true){
              item.classList.add('hidden');
            } else if (shouldBeHidden == false){
              item.classList.remove('hidden');
            }
    });
    function determineRatingBgc (rating) {
      let background = '';
  
      if(rating <= 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  
    render();
    initActions();
}